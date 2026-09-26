export type LocaleString = { en?: string | null; es?: string | null } | string | null | undefined;
export type LocaleText = { en?: string | null; es?: string | null } | string | null | undefined;

/**
 * Resolves a localized string or text object for the active language ('EN' or 'ES').
 * Automatically falls back to the alternate language or an empty string if undefined.
 */
export function resolveLocale(
  field: LocaleString | LocaleText,
  lang: string
): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  
  const targetKey = lang.toUpperCase() === "ES" ? "es" : "en";
  const fallbackKey = targetKey === "es" ? "en" : "es";

  return field[targetKey] || field[fallbackKey] || "";
}
