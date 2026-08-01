import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ignore benign ResizeObserver notification warnings
window.addEventListener('error', (e) => {
  if (e.message && (e.message.includes('ResizeObserver') || e.message.includes('undelivered notifications'))) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (e) => {
  if (e.reason?.message && (e.reason.message.includes('ResizeObserver') || e.reason.message.includes('undelivered notifications'))) {
    e.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

