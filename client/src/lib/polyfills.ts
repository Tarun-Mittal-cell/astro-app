// Browser environment polyfills
declare global {
  interface Window {
    global: any;
  }
}

if (typeof window !== 'undefined') {
  window.global = window;
}

export {};
