import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import EnContentOverview from './locales/en/content-overview.json'; 
import PtBrContentOverview from './locales/pt-BR/content-overview.json'; 
import EnContentOverviewHero from './locales/en/content-overview-hero.json'; 
import PtBrContentOverviewHero from './locales/pt-BR/content-overview-hero.json'; 
import PtLayoutsSidebarLayoutHeaderMenu from './locales/pt-BR/layouts-sidebarlayout-header-menu.json';
import EnLayoutsSidebarLayoutHeaderMenu from './locales/en/layouts-sidebarlayout-header-menu.json';
import PtLayoutsBaseLayoutHeaderMenu from './locales/pt-BR/layouts-baselayout-header-menu.json';
import EnLayoutsBaseLayoutHeaderMenu from './locales/en/layouts-baselayout-header-menu.json';

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    fallbackLng: ['en', 'pt-BR'],    
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    defaultNS: ''
  });

  i18n.addResourceBundle('en', 'layouts-sidebarlayout-header-menu', EnLayoutsSidebarLayoutHeaderMenu);
  i18n.addResourceBundle('pt-BR', 'layouts-sidebarlayout-header-menu', PtLayoutsSidebarLayoutHeaderMenu);
  i18n.addResourceBundle('en', 'layouts-baselayout-header-menu', EnLayoutsBaseLayoutHeaderMenu);
  i18n.addResourceBundle('pt-BR', 'layouts-baselayout-header-menu', PtLayoutsBaseLayoutHeaderMenu);

  i18n.addResourceBundle('en', 'content-overview', EnContentOverview);
  i18n.addResourceBundle('pt-BR', 'content-overview', PtBrContentOverview);
  i18n.addResourceBundle('en', 'content-overview-hero', EnContentOverviewHero);
  i18n.addResourceBundle('pt-BR', 'content-overview-hero', PtBrContentOverviewHero);
  

  i18n.loadLanguages(['en', 'pt-BR'], (err) => { /* resources have been loaded */ });

export default i18n;