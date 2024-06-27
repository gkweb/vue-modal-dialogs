import PluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'

export default [
  // add more generic rulesets here, such as:
    js.configs.recommended,
  ...PluginVue.configs['flat/recommended'],
  { ignores: ['node_modules/', 'dist/'] },
]
