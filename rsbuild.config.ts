import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
    plugins: [pluginReact()],
    html: {
        title: `Arknights生涯生成器 - ${new Date().getFullYear()}`,
        template: './index.html',
    },
    source: {
        entry: {
            index: './src/main.tsx',
        },
    },
    tools: {
        rspack: {
            module: {
                rules: [
                    {
                        resourceQuery: /raw/, // 只有在使用 `?raw` 查询时，才会应用这个规则
                        test: /\.(glsl|svg)$/i,
                        type: 'asset/source',
                    },
                ]
            }
        }
    },
    output: {
        minify: {
            js: true,
            jsOptions: {
                minimizerOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            }
        }
    }
});