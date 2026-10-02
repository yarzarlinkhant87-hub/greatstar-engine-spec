/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * AGRI TORQUE MASTER - 100% Offline Service Worker
 * Network-First for Navigation (online fresh, offline instant fallback)
 * Cache-First for Static Assets (icons, images, manifest)
 */

const CACHE_NAME = 'agri-torque-master-v8';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/logo.jpg',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon.ico',
];

// Install: Pre-cache core shell assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching core assets for version:', CACHE_NAME);
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache partial warning:', err);
      });
    })
  );
});

// Activate: Clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch: Smart Strategy
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1. Bypass Vite internal development routes and HMR WebSockets
  if (
    url.pathname.startsWith('/@') ||
    url.pathname.includes('/@vite/') ||
    url.pathname.includes('/@react-refresh') ||
    url.search.includes('t=')
  ) {
    return;
  }

  // 2. Navigation requests: Network-First with Offline Cache Fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put('/index.html', resClone);
              cache.put('/', resClone.clone());
            });
          }
          return networkRes;
        })
        .catch(async () => {
          // When offline: serve cached shell
          const cachedShell = (await caches.match('/index.html')) || (await caches.match('/'));
          if (cachedShell) return cachedShell;
          return new Response(
            '<html><head><meta charset="utf-8"/><title>AgriTorque Offline</title></head><body style="background:#022c22;color:#fff;font-family:sans-serif;padding:2rem;text-align:center;"><h2>AgriTorque Master (Offline)</h2><p>အင်တာနက်လိုင်းဖွင့်၍ တစ်ကြိမ်ပြန်လည်ဖွင့်ပါ</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // 3. Static Assets & App Scripts: Cache-First with Network fallback & revalidation
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background to keep cache updated
        fetch(req)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(req, networkResponse);
              });
            }
          })
          .catch(() => {
            // Ignore background fetch errors in offline mode
          });
        return cachedResponse;
      }

      // Not cached: Fetch from network and save to cache
      return fetch(req)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // Fallback image if an image fails to load while offline
          if (req.headers.get('accept')?.includes('image')) {
            return caches.match('/pwa-192x192.png') || caches.match('/logo.png');
          }
        });
    })
  );
});
