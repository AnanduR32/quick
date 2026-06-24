import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Search } from '../search/search';
import { routes as dashboardRoutes } from '../../../dashboard/dashboard.routes'; 

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, Search],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class NavigationComponent {
  navItems = dashboardRoutes.map(route => {
    const isRoot = route.path === '';
    return {
      label: isRoot ? 'Welcome' : route.path!.charAt(0).toUpperCase() + route.path!.slice(1),
      path: isRoot ? '/dashboard' : `/dashboard/${route.path}`
    };
  });
}
