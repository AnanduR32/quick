import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard')
            .then(m => m.Dashboard),
        loadChildren: () => import('./dashboard/dashboard.routes')
            .then(m => m.routes)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];
