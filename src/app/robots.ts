// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Sostituisci con eventuali cartelle private
    },
    sitemap: 'https://walterianieri.com/sitemap.xml',
  };
}
