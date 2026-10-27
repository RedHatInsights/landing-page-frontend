import React, { type ReactNode, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { messageCatalogs } from './messageCatalogs';

interface IntlMessagesProviderProps {
  locale: string;
  children: ReactNode;
}

export function IntlMessagesProvider({
  locale,
  children,
}: IntlMessagesProviderProps) {
  const [messages, setMessages] = useState<Record<string, string> | null>(null);
  const [loadedLocale, setLoadedLocale] = useState(locale);

  useEffect(() => {
    const loader = messageCatalogs[locale];
    if (!loader) {
      setMessages(null);
      setLoadedLocale(locale);
      return;
    }

    let cancelled = false;
    loader()
      .then((mod) => {
        if (!cancelled) {
          setMessages(mod.default);
          setLoadedLocale(locale);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMessages(null);
          setLoadedLocale(locale);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <IntlProvider
      locale={loadedLocale}
      messages={messages ?? undefined}
      defaultLocale="en"
    >
      {children}
    </IntlProvider>
  );
}
