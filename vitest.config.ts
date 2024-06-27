// import config from './vite.config';

import vueJsx from '@vitejs/plugin-vue2-jsx';
import vue from '@vitejs/plugin-vue2'
import { defineConfig } from 'vitest/config'
import babel from 'vite-plugin-babel';

export default defineConfig((mode) => {
const isTest = mode === 'test'

        return {
            plugins: [
                // Babel will try to pick up Babel config files (.babelrc or .babelrc.json)
                babel({
                    babelConfig: {
                        babelrc: false,
                        configFile: false,
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [   '@babel/plugin-syntax-decorators',
                                { decoratorsBeforeExport: true }
                            ]
                        ]
                    }
                }),
                vueJsx(),
                vue()
            ].filter(Boolean),
                test
        :
            {
                globals: true,
                    environment
            :
                "jsdom"
            }
        }
}

)