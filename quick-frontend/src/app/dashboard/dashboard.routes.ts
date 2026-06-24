import { Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';

export const routes: Routes = [
    {
        path: '',
        component: Welcome
    },
    {
        path: 'meals',
        loadComponent: () => import('./meals-component/meals-component')
            .then(m => m.MealsComponent),
    },
    {  
        path: 'cocktails',
        loadComponent: () => import('./cocktails-component/cocktails-component')
            .then(m => m.CocktailsComponent),
    }
];
