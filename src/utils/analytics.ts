import { GA_MEASUREMENT_ID } from '../config/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let isInitialized = false;
let lastTrackedUrl = '';

/**
 * Validates if a valid GA4 Measurement ID is provided
 */
export function isGAEnabled(): boolean {
  return (
    typeof GA_MEASUREMENT_ID === 'string' &&
    GA_MEASUREMENT_ID.startsWith('G-') &&
    !GA_MEASUREMENT_ID.includes('XXXXX') &&
    GA_MEASUREMENT_ID.length >= 7
  );
}

/**
 * Sanitizes input to ensure no Personal Identifiable Information (PII)
 * such as email addresses or phone numbers are ever transmitted to GA4.
 */
function sanitizeNonPII(val: string | undefined | null): string {
  if (!val) return '';
  let clean = val.trim();

  // Strip email patterns
  clean = clean.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[redacted_email]');

  // Strip phone number patterns (digits >= 7)
  clean = clean.replace(/\+?\d[\d -]{6,}\d/g, '[redacted_phone]');

  return clean.slice(0, 30);
}

/**
 * Initializes Google Analytics 4 (GA4) with dynamic script injection.
 * Disables automatic pageviews so our single-page application (SPA)
 * can accurately track query-based routes (/?page=dhanteras, /?page=diwali, /).
 */
export function initGA(): void {
  if (typeof window === 'undefined' || isInitialized) return;

  if (!isGAEnabled()) {
    return;
  }

  try {
    // 1. Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

    // 2. Inject Google gtag.js script if not already present
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
      script.onerror = () => {
        // Gracefully handle AdBlockers or connection limits without throwing errors
      };
      document.head.appendChild(script);
    }

    // 3. Configure GA4
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // Managed manually by trackPageView to handle SPA routes accurately
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    });

    isInitialized = true;
  } catch {
    // Never crash or block the application if GA initialization fails
  }
}

/**
 * Tracks SPA Page Views with duplicate prevention
 */
export function trackPageView(
  pageTitle: string,
  pagePath: string,
  greetingType: 'dhanteras' | 'diwali' | 'home'
): void {
  if (typeof window === 'undefined') return;

  const currentUrl = window.location.href;

  // Prevent duplicate page-view events for identical URL hits
  if (currentUrl === lastTrackedUrl) {
    return;
  }
  lastTrackedUrl = currentUrl;

  if (!isGAEnabled() || typeof window.gtag !== 'function') {
    return;
  }

  try {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: currentUrl,
      page_path: pagePath,
      greeting_type: greetingType,
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Tracks when a user creates a new personalized greeting
 */
export function trackGreetingCreated(
  greetingType: 'dhanteras' | 'diwali',
  senderName?: string
): void {
  if (!isGAEnabled() || typeof window.gtag !== 'function') return;

  try {
    const sanitizedName = sanitizeNonPII(senderName);
    window.gtag('event', 'greeting_created', {
      greeting_type: greetingType,
      has_custom_sender: Boolean(sanitizedName),
      sender_display: sanitizedName || 'anonymous',
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Tracks when a share button is clicked (e.g. from navbar or greeting card)
 */
export function trackShareButtonClicked(
  greetingType: string,
  source: 'navbar' | 'greeting_card' | 'footer' | 'action_bar'
): void {
  if (!isGAEnabled() || typeof window.gtag !== 'function') return;

  try {
    window.gtag('event', 'share_button_clicked', {
      greeting_type: greetingType,
      button_source: source,
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Tracks when the primary WhatsApp share button is clicked
 */
export function trackWhatsAppShareClicked(greetingType: 'dhanteras' | 'diwali'): void {
  if (!isGAEnabled() || typeof window.gtag !== 'function') return;

  try {
    window.gtag('event', 'whatsapp_share_clicked', {
      greeting_type: greetingType,
      method: 'whatsapp',
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Tracks when the "Copy Link" button is clicked
 */
export function trackCopyLinkClicked(greetingType: 'dhanteras' | 'diwali'): void {
  if (!isGAEnabled() || typeof window.gtag !== 'function') return;

  try {
    window.gtag('event', 'copy_link_clicked', {
      greeting_type: greetingType,
      method: 'clipboard',
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Tracks festive background music play/mute interactions
 */
export function trackMusicPlayClicked(isPlaying: boolean, greetingType?: string): void {
  if (!isGAEnabled() || typeof window.gtag !== 'function') return;

  try {
    window.gtag('event', 'music_play_clicked', {
      action: isPlaying ? 'play' : 'mute',
      greeting_type: greetingType || 'general',
    });
  } catch {
    // Graceful fallback
  }
}
