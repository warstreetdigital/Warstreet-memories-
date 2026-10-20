import fs from 'fs';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'images-dir-handler',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url) {
              const urlParts = req.url.split('?');
              const cleanUrl = urlParts[0];
              const query = urlParts[1] ? `?${urlParts[1]}` : '';

              // Ensure canonical trailing-slash for directory paths so dev server serves correct index.html
              const directoryRoutes = [
                '/birthdays/stella-aaliyah-dinar',
                '/birthdays',
                '/weddings',
                '/roora',
                '/love-family'
              ];
              if (directoryRoutes.includes(cleanUrl)) {
                res.statusCode = 301;
                res.setHeader('Location', `${cleanUrl}/${query}`);
                res.end();
                return;
              }

              if (req.url.startsWith('/images/') || req.url.startsWith('/birthdays/stella-aaliyah-dinar/images/')) {
                const filename = path.basename(cleanUrl);
                const imgFile = path.resolve(import.meta.dirname, 'images', filename);
                if (fs.existsSync(imgFile) && fs.statSync(imgFile).isFile()) {
                  res.setHeader('Content-Type', 'image/webp');
                  fs.createReadStream(imgFile).pipe(res);
                  return;
                } else {
                  res.statusCode = 404;
                  res.end('Not Found');
                  return;
                }
              }
            }
            next();
          });
        },
        closeBundle() {
          const srcImages = path.resolve(import.meta.dirname, 'images');
          const distImages = path.resolve(import.meta.dirname, 'dist', 'images');
          if (fs.existsSync(srcImages)) {
            fs.cpSync(srcImages, distImages, { recursive: true });
          }
          const srcJs = path.resolve(import.meta.dirname, 'js');
          const distJs = path.resolve(import.meta.dirname, 'dist', 'js');
          if (fs.existsSync(srcJs)) {
            fs.cpSync(srcJs, distJs, { recursive: true });
          }
          const srcCss = path.resolve(import.meta.dirname, 'css');
          const distCss = path.resolve(import.meta.dirname, 'dist', 'css');
          if (fs.existsSync(srcCss)) {
            fs.cpSync(srcCss, distCss, { recursive: true });
          }
          const srcRedirects = path.resolve(import.meta.dirname, '_redirects');
          const distRedirects = path.resolve(import.meta.dirname, 'dist', '_redirects');
          if (fs.existsSync(srcRedirects)) {
            fs.copyFileSync(srcRedirects, distRedirects);
          }
        }
      },
      react(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
          birthdays: path.resolve(import.meta.dirname, 'birthdays/index.html'),
          weddings: path.resolve(import.meta.dirname, 'weddings/index.html'),
          roora: path.resolve(import.meta.dirname, 'roora/index.html'),
          loveFamily: path.resolve(import.meta.dirname, 'love-family/index.html'),
          stella: path.resolve(import.meta.dirname, 'birthdays/stella-aaliyah-dinar/index.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
