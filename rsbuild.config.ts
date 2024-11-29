import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
    plugins: [pluginReact()],
    html: {
        template: './index.html',
    },
    source: {
        entry: {
            index: './src/main.tsx',
        },
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