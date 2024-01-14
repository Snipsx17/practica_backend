const { I18n } = require('i18n');
const path = require('node:path');

const i18n = new I18n();

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', '/locales'),
  defaultLocale: 'en',
  autoReload: true,
  syncFiles: true,
  cookie: 'locale-lang',
});

i18n.setLocale('en');

module.exports = i18n;
