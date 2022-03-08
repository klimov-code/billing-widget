import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel'
import react from '@vitejs/plugin-react'
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
