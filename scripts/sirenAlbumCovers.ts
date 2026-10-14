import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Album } from '../src/data/Album';
import { SIREN_MUSIC_URL, type SirenAlbum } from './sirenAlbums';

const imageExtension = (bytes: Uint8Array): string | undefined => {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'jpg';
  if (Buffer.from(bytes.subarray(0, 8)).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'png';
  const header = Buffer.from(bytes.subarray(0, 12)).toString('ascii');
  if (header.startsWith('RIFF') && header.slice(8) === 'WEBP') return 'webp';
  if (header.startsWith('GIF87a') || header.startsWith('GIF89a')) return 'gif';
};

/** Cache by source URL so a changed cover cannot overwrite the previous valid snapshot. */
export const downloadSirenAlbumCovers = async (
  albums: SirenAlbum[],
  directory = path.resolve('public/albums'),
): Promise<Album[]> => {
  await mkdir(directory, { recursive: true });
  const result: Album[] = new Array(albums.length);
  let next = 0;
  const download = async (album: SirenAlbum): Promise<Album> => {
    if (!/^[a-zA-Z0-9_-]+$/.test(album.id)) throw new Error(`专辑 ID 无效：${album.id}`);
    const hash = createHash('sha256').update(album.img).digest('hex').slice(0, 12);
    const stem = `${album.id}-${hash}`;
    for (const extension of ['jpg', 'png', 'webp', 'gif']) {
      const filename = `${stem}.${extension}`;
      try {
        const existing = await readFile(path.join(directory, filename));
        if (imageExtension(existing) === extension) {
          return { ...album, img: `/albums/${filename}`, sourceImg: album.img };
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
      }
    }

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(album.img, {
          headers: {
            Referer: SIREN_MUSIC_URL,
            'User-Agent': 'Mozilla/5.0',
          },
          signal: AbortSignal.timeout(30_000),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        if (!response.headers.get('content-type')?.startsWith('image/')) {
          throw new Error('响应不是图片');
        }
        const bytes = new Uint8Array(await response.arrayBuffer());
        const extension = imageExtension(bytes);
        if (!extension) throw new Error('图片格式无效');
        const filename = `${stem}.${extension}`;
        const destination = path.join(directory, filename);
        await writeFile(`${destination}.part`, bytes);
        await rename(`${destination}.part`, destination);
        return { ...album, img: `/albums/${filename}`, sourceImg: album.img };
      } catch (error) {
        if (attempt === 3) {
          throw new Error(`专辑封面下载失败：${album.name}（${album.id}）：${error instanceof Error ? error.message : String(error)}`);
        }
        await new Promise((resolve) => setTimeout(resolve, attempt * 500));
      }
    }
    throw new Error('专辑封面下载失败');
  };

  // Keep request volume bounded; preserve the website's order in the saved list.
  const workers = await Promise.allSettled(Array.from({ length: Math.min(4, albums.length) }, async () => {
    while (next < albums.length) {
      const index = next++;
      result[index] = await download(albums[index]);
      if ((index + 1) % 25 === 0 || index + 1 === albums.length) {
        console.log(`专辑封面 ${index + 1}/${albums.length}`);
      }
    }
  }));
  const failed = workers.find((worker) => worker.status === 'rejected');
  if (failed?.status === 'rejected') throw failed.reason;
  return result;
};
