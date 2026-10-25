import { Locale } from "@/types";

export const LOCALES: readonly Locale[] = ["en", "bn"] as const;
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Validates if the string is a supported locale.
 */
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

/**
 * Explicit fallback translation resolver.
 * Ensures no text is silently blank. Falls back to English if target translation is missing or empty.
 */
export function resolveLocalizedText(
  target: { en?: string; bn?: string } | undefined,
  locale: Locale
): string {
  if (!target) return "";
  const primary = target[locale];
  if (primary && primary.trim().length > 0) {
    return primary;
  }
  // Explicit fallback to English
  const fallback = target.en;
  if (fallback && fallback.trim().length > 0) {
    return fallback;
  }
  return "";
}

/**
 * Resolves localized content object with fallback to 'en'.
 */
export function resolveLocalizedContent<T>(
  data: { en: T; bn: T },
  locale: Locale
): T {
  if (locale === "bn" && data.bn) {
    return data.bn;
  }
  return data.en;
}

/**
 * Formats a localized URL path.
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  // If path already starts with /en or /bn, replace it
  const match = cleanPath.match(/^\/(en|bn)(\/.*)?$/);
  if (match) {
    const rest = match[2] || "";
    return `/${locale}${rest}`;
  }
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}
