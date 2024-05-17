// i18n.js

import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

i18n.fallbacks = true;
i18n.translations = {
  en: {
    welcome: 'Welcome to Daily Quote App!',
    discoverAuthors: 'Discover Authors',
    settings: 'Settings',
    quoteChangeInterval: 'Quote Change Interval (hours)',
    language: 'Language',
    saveSettings: 'Save Settings',
  },
  es: {
    welcome: '¡Bienvenido a la aplicación de citas diarias!',
    discoverAuthors: 'Descubrir Autores',
    settings: 'Configuraciones',
    quoteChangeInterval: 'Intervalo de cambio de cita (horas)',
    language: 'Idioma',
    saveSettings: 'Guardar configuraciones',
  },
};

i18n.locale = Localization.locale;

export default i18n;
