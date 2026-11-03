/**
 * URL and Sender Name Utilities
 * Handles sanitization, encoding, and sharing link generation
 */

export function sanitizeSenderName(rawName: string | null | undefined): string {
  if (!rawName) return "";
  
  // Trim and limit length to reasonable 40 chars
  const trimmed = rawName.trim().slice(0, 40);
  
  // Filter out any suspicious HTML/script injection attempts
  // Keep regular international characters, letters, numbers, spaces, and festive symbols
  return trimmed.replace(/[<>{}[\]\\]/g, "");
}

export function getSenderFromUrl(): string {
  if (typeof window === "undefined") return "";

  // Check URL query parameters (?from=...)
  const searchParams = new URLSearchParams(window.location.search);
  const fromQuery = searchParams.get("from");
  if (fromQuery) {
    return sanitizeSenderName(fromQuery);
  }

  // Also support hash parameters (e.g. #/diwali?from=Aniket) for static hosting
  if (window.location.hash.includes("?")) {
    const hashQuery = window.location.hash.split("?")[1];
    const hashParams = new URLSearchParams(hashQuery);
    const hashFrom = hashParams.get("from");
    if (hashFrom) {
      return sanitizeSenderName(hashFrom);
    }
  }

  return "";
}

export function generateGreetingUrl(route: string, senderName: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  const encodedName = encodeURIComponent(senderName.trim());
  return `${origin}${cleanRoute}?from=${encodedName}`;
}

export function generateWhatsAppShareUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?text=${encoded}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error("Failed to copy link: ", err);
    return false;
  }
}

export async function triggerWebShare(title: string, text: string, url: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      return true;
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.warn("Share failed or was dismissed", err);
      }
      return false;
    }
  }
  return false;
}
