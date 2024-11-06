import { createI18n } from 'vue-i18n';
import ZHL from './zh';
import ENL from './en';
import { en, zhCn } from 'element-plus/es/locales.mjs';
import { LANGUAGE, TLANGUAGE } from '@app/enums';
import { getConfig, getConfigLanguages } from '@app/utils/config';
import { deepObjectAssign } from '@app/utils/data';

const i18n = createI18n({
  locale: LANGUAGE.zhcn,
  messages: {
    [LANGUAGE.zhcn]: {
      ...zhCn,
      ...ZHL,
    },
    [LANGUAGE.enus]: {
      ...en,
      ...ENL,
    },
  },
});
export default i18n;

export const setI18nLocale = (language: TLANGUAGE) => {
  i18n.global.locale = language;
};
export const initI18n = () => {
  i18n.global.locale = getConfig().locel;
  const zhL = i18n.global.messages[LANGUAGE.zhcn],
    enL = i18n.global.messages[LANGUAGE.enus];
  (i18n.global.messages[LANGUAGE.zhcn] as any) = deepObjectAssign(zhL, getConfigLanguages()?.[LANGUAGE.zhcn] || {});
  (i18n.global.messages[LANGUAGE.enus] as any) = deepObjectAssign(enL, getConfigLanguages()?.[LANGUAGE.enus] || {});
};

export const $t: typeof i18n.global.t = i18n.global.t;
