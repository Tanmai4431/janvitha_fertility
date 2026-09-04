/// <reference types="astro/client" />

interface Window {
  dataLayer: any[];
  MSStream?: any;
}

interface PerformanceEntry {
  hadRecentInput?: boolean;
  value?: number;
  processingStart?: number;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

interface Env {
  DB: import('@cloudflare/workers-types').D1Database;
}

declare namespace App {
  interface Locals extends Runtime {}
}
