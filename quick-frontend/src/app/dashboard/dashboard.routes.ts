import { Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';

export const routes: Routes = [
    {
        path: '',
        component: Welcome
    },
    {
        path: 'meals',
        // loadComponent: () => import('./meals-component/meals-component')
        //     .then(m => m.MealsComponent),
        redirectTo: 'menu',
        pathMatch: 'full'
    },
    {  
        path: 'cocktails',
        // loadComponent: () => import('./cocktails-component/cocktails-component')
        //     .then(m => m.CocktailsComponent),
        redirectTo: 'menu',
        pathMatch: 'full'
    },
    {
        path: 'menu',
        loadComponent: () => import('./menu-component/menu-component')
            .then(m => m.MenuComponent)
    }
];
