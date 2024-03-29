import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
// import swc from 'unplugin-swc';
import { defineConfig, UserConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const DEV = mode === 'development';

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
      react(),
      // swc.vite({
      //   jsc: {
      //     target: 'es2022',
      //     experimental: {
      //       plugins: [
      //         [
      //           '@effector/swc-plugin',
      //           {
      //             addLoc: true,
      //           },
      //         ],
      //       ],
      //     },
      //   },
      // }),
      svgr(),
      DEV && eslint(),
    ].filter(Boolean),
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
