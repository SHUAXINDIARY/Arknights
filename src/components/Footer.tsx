import { Divider, Link } from "@nextui-org/react";

const Footer = () => {
  return (
    <div className="max-w-md mt-7">
      <div className="space-y-1">
        <p className="text-small text-default-400">明日方舟生涯生成器</p>
      </div>
      <Divider className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-small">
        <div>
          <Link
            isBlock
            showAnchorIcon
            href="https://github.com/SHUAXINDIARY/Arknights"
            color="foreground"
            target="_blank"
          >
            GITHUB
          </Link>
        </div>
        <Divider orientation="vertical" />
        <div>
          <Link
            isBlock
            showAnchorIcon
            href="https://github.com/SHUAXINDIARY/Arknights/blob/main/README.md"
            color="foreground"
            target="_blank"
          >
            Doc
          </Link>
        </div>
        <Divider orientation="vertical" />
        <div>
          <Link
            isBlock
            showAnchorIcon
            href="https://www.xiaohongshu.com/user/profile/617ce3ac000000000201bc2c?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1652512227"
            color="foreground"
            target="_blank"
          >
            Author
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
