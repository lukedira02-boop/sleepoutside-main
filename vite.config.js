import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  server: {
    host: '0.0.0.0',
    allowedHosts: ['sleepoutside-main-pzz9.onrender.com'],
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
  },

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        countdown: resolve(__dirname, 'src/countdown.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
      },
    },
  },
});
