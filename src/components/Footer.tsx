import { Divider, Link } from "@nextui-org/react";

const Footer = () => {
  return (
    <div className="max-w-md mb-7">
      <div className="flex h-5 items-center space-x-4">
        <div>
          <Link
            isBlock
            showAnchorIcon
            href="https://github.com/SHUAXINDIARY/Arknights"
            color="foreground"
            target="_blank"
          >
            Github
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
            className="text-sm"
          >
            站点作者
          </Link>
        </div>
        <Divider orientation="vertical" />
        <div>
          <Link
            isBlock
            showAnchorIcon
            href="https://www.xiaohongshu.com/user/profile/62d47a26000000000e00d3cd?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1732271959&share_id=16d16c386cd64b92a6a2b7a5d09231ae"
            color="foreground"
            target="_blank"
            className="text-sm"
          >
            表格作者
          </Link>
        </div>
      </div>
      <Divider className="my-4" />
    </div>
  );
};

export default Footer;
