/// <reference types="astro/client" />

import Lenis from 'lenis';

declare global {
  interface Window {
    lenis: Lenis;
  }
}
