
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'AI Diabetes Lifestyle Manager',
    short_name: 'Diabetes Manager',
    description:
      'Personalized lifestyle, nutrition, and wellness guidance.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0d9488',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
