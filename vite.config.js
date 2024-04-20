import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import postcssNesting from 'postcss-nesting'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: './auto-imports.d.js',
      // dirs: ['src/composables'],
      // eslintrc: {
      //   enabled: true, // <-- this
      // },
      vueTemplate: true,
    }),
    Components({ dirs: ['src/components/'], dts: true }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssNesting,
      ],
    },
  },
  server: {
    port: 5174,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
