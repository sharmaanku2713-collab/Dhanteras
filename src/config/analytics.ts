/**
 * Google Analytics 4 (GA4) Configuration
 *
 * HOW TO CONFIGURE YOUR GA4 MEASUREMENT ID:
 * -------------------------------------------------------------
 * Option A (Recommended for local dev & environment files):
 *   Create a `.env` file in the project root and add:
 *   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *
 * Option B (Direct configuration):
 *   Replace the empty string below with your Measurement ID:
 *   e.g. export const GA_MEASUREMENT_ID = "G-1A2B3C4D5E";
 * -------------------------------------------------------------
 */

export const GA_MEASUREMENT_ID: string = (
  import.meta.env.VITE_GA_MEASUREMENT_ID || ""
).trim();
