import { i18n } from "@lingui/core";
import { I18nProvider as LinguiI18nProvider } from "@lingui/react";
import { useEffect } from "react";

export const locales = {
  en: "English",
  "zh-CN": "简体中文",
};
export const defaultLocale = "en";

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
  const { messages } = await import(`./locales/${locale}/messages`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  
  useEffect(() => {
    // With this method we dynamically load the catalogs
    dynamicActivate(defaultLocale);
  }, []);

  return <LinguiI18nProvider i18n={i18n}>{children}</LinguiI18nProvider>;
};
