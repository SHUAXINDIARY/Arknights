import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { downloadSirenAlbumCovers } from './sirenAlbumCovers';
import { SIREN_MUSIC_URL } from './sirenAlbums';

// A complete one-pixel PNG, not an HTML error page masquerading as an image.
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aE7sAAAAASUVORK5CYII=', 'base64');
let imageRequests = 0;
let referer: string | undefined;
let origin: string;
const server = createServer((request, response) => {
  if (request.url === '/cover.png') {
    imageRequests++;
    referer = request.headers.referer;
    if (imageRequests === 1) {
      response.writeHead(503).end();
    } else {
      response.writeHead(200, { 'Content-Type': 'image/png' }).end(png);
    }
  } else {
    response.writeHead(200, { 'Content-Type': 'image/png' }).end('<html>denied</html>');
  }
});
before(async () => {
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  assert.ok(address && typeof address === 'object');
  origin = `http://127.0.0.1:${address.port}`;
});
after(async () => { await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); });

test('临时 HTTP 错误后重试，携带来源校验、保存本地封面并复用缓存', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'siren-cover-'));
  const albums = [{ id: '0227', name: '大地之盐', img: `${origin}/cover.png` }];
  const [saved] = await downloadSirenAlbumCovers(albums, directory);
  assert.equal(imageRequests, 2);
  assert.equal(referer, SIREN_MUSIC_URL);
  assert.match(saved.img, /^\/albums\/0227-[a-f0-9]+\.png$/);
  assert.equal(saved.sourceImg, albums[0].img);
  assert.deepEqual(await readFile(path.join(directory, path.basename(saved.img))), png);
  assert.deepEqual(await downloadSirenAlbumCovers(albums, directory), [saved]);
  assert.equal(imageRequests, 2, '有效缓存不应重复请求');
  assert.ok((await readdir(directory)).every((file) => !file.endsWith('.part')));
});

test('拒绝伪装成图片的鉴权错误页，不保存损坏封面', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'siren-cover-invalid-'));
  await assert.rejects(downloadSirenAlbumCovers([
    { id: '0001', name: '错误封面', img: `${origin}/denied.png` },
  ], directory), /封面下载失败.*图片格式无效/);
  assert.deepEqual(await readdir(directory), []);
});
