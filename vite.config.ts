import babel from '@rollup/plugin-babel';
import { presetTypography } from '@unocss/preset-typography';
import presetUno from '@unocss/preset-uno';
import transformerDirective from '@unocss/transformer-directives';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig(() => {
  return {
    resolve: {
      alias: [
        {
          find: '@app',
          replacement: resolve(__dirname, 'src'),
        },
        {
          find: '#types',
          replacement: resolve(__dirname, 'src/shared/types'),
        },
      ],
    },
    plugins: [
      babel({
        include: ['./src/**'],
        extensions: ['.js', '.ts'],
        babelHelpers: 'bundled',
      }),
      react(),
      unocss({
        presets: [presetUno(), presetTypography()],
        transformers: [transformerDirective()],
      }),
      eslint(),
    ],
    server: {
      port: 8081,
      cors: true,
      strictPort: true,
    },
    build: {
      rollupOptions: {
        input: resolve(__dirname, 'src/index.ts'),
        output: {
          format: 'es',
        },
      },
    },
  };
});
