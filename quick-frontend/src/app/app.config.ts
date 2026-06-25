import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { Search } from './core/services/search';
import { Navigation } from './core/services/navigation';
import { MealsApi } from './core/services/meals-api';
import { CocktailsApi } from './core/services/cocktails-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    Search,
    Navigation,
    MealsApi,
    CocktailsApi
  ]
};
