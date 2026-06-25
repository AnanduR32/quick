import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Search as SearchService } from '../core/services/search';
import { filter } from 'rxjs/internal/operators/filter';
import { Navigation } from '../core/services/navigation';
import { NavigationComponent } from '../core/components/navigation/navigation';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private searchService = inject(SearchService);
  private router = inject(Router);
  private navigation = inject(Navigation);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;

      if (url.includes('/meals')) {
        this.navigation.updateContext('meals');
      } else if (url.includes('/cocktails')) {
        this.navigation.updateContext('cocktails');
      } else {
        this.navigation.updateContext('welcome');
      }
      this.searchService.clearQuery();
    });
  }
}
