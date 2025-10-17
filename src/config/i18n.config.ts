import { CookieResolver, HeaderResolver, I18nJsonLoader, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { LANGUAGE } from 'src/constants/api.constants';

export const i18nConfig = I18nModule.forRoot({
  fallbackLanguage: LANGUAGE.EN,
  loaderOptions: {
    path: path.join(__dirname, '../i18n/'),
    watch: true,
  },
  loader: I18nJsonLoader,
  resolvers: [
    { use: HeaderResolver, options: ['accept-language'] },
    QueryResolver,
    CookieResolver,
  ],
});
