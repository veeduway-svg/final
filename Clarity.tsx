import { useEffect } from 'react';

declare global {
  interface Window {
    clarity?: (method: string, ...args: unknown[]) => void;
  }
}

const Clarity = () => {
  useEffect(() => {
    const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;
    const isProduction = import.meta.env.PROD;

    if (!isProduction || !clarityId || clarityId === 'YOUR_CLARITY_PROJECT_ID') {
      console.log('[Clarity] Skipped: Not in production or ID not configured');
      return;
    }

    if (window.clarity) {
      console.log('[Clarity] Already loaded');
      return;
    }

    try {
      (function(c, l, a, r, i, t, y) {
        c[a] = c[a] || function() {
          (c[a].q = c[a].q || []).push(arguments);
        };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", clarityId);

      console.log('[Clarity] Initialized with ID:', clarityId);
    } catch (error) {
      console.error('[Clarity] Failed to initialize:', error);
    }
  }, []);

  return null;
};

export default Clarity;
