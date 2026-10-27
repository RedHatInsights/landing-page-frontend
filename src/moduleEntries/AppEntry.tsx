import React from 'react';
import App from '../App';
import { IntlMessagesProvider, useChromeLocale } from '../i18n';

const AppRoot: React.FC<{ layoutType?: string }> = ({ layoutType }) => {
  const locale = useChromeLocale();
  return (
    <IntlMessagesProvider locale={locale}>
      <App layoutType={layoutType} />
    </IntlMessagesProvider>
  );
};

export default AppRoot;
