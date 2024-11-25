import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'node:path';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

const { resolve } = path;

export default defineConfig({
  server: {
    port: 8096,
    host: true,
  },
  resolve: {
    alias: {
      '@app': resolve(__dirname, './packages'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './packages/index.ts'),
      name: pkg.name,
      fileName: format => `${pkg.name}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vue-i18n', 'element-plus', 'vue-router', 'element-plus/es/locales.mjs'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-i18n': 'VueI18N',
          'element-plus': 'ElementPlus',
          'vue-router': 'VueRouter',
          'element-plus/es/locales.mjs': 'element-plus/es/locales.mjs',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      include: 'packages',
      beforeWriteFile: (filePath: string) => {
        if (filePath.includes('__test__')) {
          return Promise.resolve(false);
        }
      },
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }),
  ],
});
