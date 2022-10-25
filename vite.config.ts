import svgr from '@honkhonk/vite-plugin-svgr';
import babel from '@rollup/plugin-babel';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig, UserConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    base: '/billing-widget/',
    resolve: {
      alias: {
        '@app': resolve(__dirname, 'src'),
        '#types': resolve(__dirname, 'src/shared/types'),
      },
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      coverage: {
        clean: true,
        all: true,
        include: ['src'],
        exclude: ['src/**/*.{test,spec}.{ts,js,tsx,jsx}', 'src/**/index.{ts,js}'],
      },
      include: ['src/**/*.{test,spec}.{ts,js,tsx,jsx}'],
    },
    plugins: [
      babel({
        include: ['./src/**'],
        extensions: ['.js', '.ts'],
        babelHelpers: 'bundled',
      }),
      react({
        babel: {
          plugins: [isDev ? ['effector-logger/babel-plugin'] : ['effector/babel-plugin']],
        },
      }),
      svgr(),
      eslint(),
    ],
    server: {
      port: 1337,
      cors: true,
      strictPort: true,
    },
    build: {
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
        output: {
          format: 'es',
        },
      },
    },
  } as UserConfig;
});
