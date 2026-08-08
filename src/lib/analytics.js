const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-DS0FFPMKQV';
let initialized = false;
export function initAnalytics() {
  if (initialized || typeof window === 'undefined' || !MEASUREMENT_ID) return;
  initialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}
export function trackPageView(path = window.location.pathname + window.location.search) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', { page_title: document.title, page_location: window.location.href, page_path: path });
}
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
