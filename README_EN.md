[Chinese](./README.md) | [English](./README_EN.md)
# Inspiration

After seeing a post from [红白色RAW](https://weibo.com/u/2940601822) on Weibo ![](./src/assets/img_v3_02gq_7ed31f29-4562-44e3-b3e9-fc76fea30ecg.png), I thought it would be more fun to create an online tool that makes it easier for more people to input and generate their own results.

Additional note:
The original spreadsheet author is the ID shown at the bottom of the image, who also has an account on Xiaohongshu, as shown:
![](./src/assets/xhs.jpg)

# Development

By me

# Data Sources

From [prts](https://prts.wiki/w/%E9%A6%96%E9%A1%B5) and [Bilibili Arknights Wiki](https://wiki.biligame.com/arknights/%E9%A6%96%E9%A1%B5)

# Tech Stack

React + Rsbuild + [@nextui-org/react](https://nextui.org/docs/frameworks/vite) + Cloudflare (Note: nextui has been renamed, now it's this [repository](https://github.com/heroui-inc/heroui))

# User Guide

## Edit Page

- Click "Preview Example": View the result page with my data
- Click "Generate": After selecting/filling in at least one data field, you can generate your own result page

## Result Page

- Click "Edit": Return to the edit page with your previously entered data
- Click "Back": Clear entered data and return to the edit page
- Click "Export Result": Automatically capture a screenshot of the result and prompt for download (only works in browser, currently tested working in Feishu/WeChat apps, others not supported)

# TODO List

> Possible future features

- Japanese/English language switch - ✅
- Support for custom operator avatars and all in-game available avatars - ✅
- Support for selecting medal sets - ✅
- Support for command-line data updates - ✅
- ...

# Disclaimer

All company names, trademarks, and products mentioned on this website are the property of their respective owners and are used for identification purposes only.
Game images, animations, audio, and original text used on this website are only used to better present game materials, and their copyrights belong to Arknights/Shanghai Hypergryph Network Technology Co., Ltd.