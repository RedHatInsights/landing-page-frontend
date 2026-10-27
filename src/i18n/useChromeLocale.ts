import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

/**
 * The console language, resolved by Chrome's language detection flow
 * (RHCLOUD-52203). The end state is chrome-owned normalization:
 * useChromeLanguage will publish the final catalog key once, for every
 * consumer, and repos will never negotiate locale strings themselves.
 * Until that ships, chrome.language is undefined and this falls back to
 * English — deliberately the same dumb shape every wave repo carries,
 * so the eventual swap is mechanical: delete this hook, import
 * chrome's of the same name and signature.
 *
 * TODO: replace with chrome's useChromeLocale when it ships; drop the
 * cast when frontend-components types gain `language`.
 */
export function useChromeLocale(): string {
  const chrome = useChrome() as { language?: string } | undefined;
  return chrome?.language ?? 'en';
}
