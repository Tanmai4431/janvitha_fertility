import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import client from './../../client.json';

// https://astro.build/config
export default defineConfig({
  site: client.domain.production,
  output: 'server',
  adapter: cloudflare(),
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [tailwind({ applyBaseStyles: false }), react()],
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      exclude: ['@portabletext/react', 'astro/compiler-runtime', '@astrojs/compiler', 'ogl'],
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'motion',
        'framer-motion',
        'lucide-react',
        'clsx',
        'tailwind-merge',
      ],
    },
    ssr: {
      external: ['astro/compiler-runtime', '@astrojs/compiler', 'ogl'],
    },
  },
});
