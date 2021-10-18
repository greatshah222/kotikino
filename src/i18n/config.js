import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en_US',
  lng: 'fi_FI',
  resources: {
    fi_FI: {
      translations: require('./locales/fi.json')
    },
    en_US: {
      translations: require('./locales/en.json')
    },
    sv_SE: {
      translations: require('./locales/sv.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['fi_FI', 'en_US', 'sv_SE'];

export default i18n;
