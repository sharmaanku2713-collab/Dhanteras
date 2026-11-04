/**
 * Google Analytics 4 (GA4) Configuration
 *
 * The Measurement ID is set directly below for production deployment.
 * For local development, you can override it via a `.env` file:
 *   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */

export const GA_MEASUREMENT_ID: string = (
  import.meta.env.VITE_GA_MEASUREMENT_ID || "G-5EKHY04Y3W"
).trim();
