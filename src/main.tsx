import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for 100% Offline Caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('[AgriTorque] Service Worker active:', reg.scope);
        // Automatically check for updates
        reg.update().catch(() => {});
      })
      .catch((err) => {
        console.warn('[AgriTorque] Service Worker registration failed:', err);
      });
  });
}

// Ensure Persistent Storage (Prevents browser from clearing offline memory)
if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then((persisted) => {
    if (persisted) {
      console.log('[AgriTorque] Persistent storage granted');
    }
  });
}

createRoot(document.getElementById('root')!).render(<App />);
