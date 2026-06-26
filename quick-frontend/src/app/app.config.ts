import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { MenuService } from './core/services/menu-service';
import { Navigation } from './core/services/navigation';
import { MealsApi } from './core/services/meals/meals-api';
import { CocktailsApi } from './core/services/cocktails/cocktails-api';
import { MealsService } from './core/services/meals/meals-service';
import { CocktailsService } from './core/services/cocktails/cocktails-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    MenuService,
    Navigation,
    MealsApi,
    CocktailsApi,
    MealsService,
    CocktailsService
  ]
};
