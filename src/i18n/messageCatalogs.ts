export const messageCatalogs: Record<
  string,
  () => Promise<{ default: Record<string, string> }>
> = {
  fr: () =>
    import(/* webpackChunkName: "messages-fr" */ '../../messages/fr.json'),
  ko: () =>
    import(/* webpackChunkName: "messages-ko" */ '../../messages/ko.json'),
  'zh-CN': () =>
    import(
      /* webpackChunkName: "messages-zh-CN" */ '../../messages/zh-CN.json'
    ),
  ja: () =>
    import(/* webpackChunkName: "messages-ja" */ '../../messages/ja.json'),
};
