import { Component, effect, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Search as SearchService } from '../core/services/search';
import { filter } from 'rxjs';
import { Navigation } from '../core/services/navigation';
import { NavigationComponent } from '../core/components/navigation/navigation';
import { toSignal } from '@angular/core/rxjs-interop';

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

  private navigationEnd = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ) as any
  );

  constructor() {
    effect(() => {
      if (this.navigationEnd()) {
        const event = this.navigationEnd() as NavigationEnd;
        const dynamicUrl = event.urlAfterRedirects || event.url;
        this.parseAndSetContext(dynamicUrl);
      }
    });

    this.parseAndSetContext(this.router.url);
  }

  private parseAndSetContext(url: string): void {
    if (url.includes('/meals')) {
      this.navigation.updateContext('meals');
    } else if (url.includes('/cocktails')) {
      this.navigation.updateContext('cocktails');
    } else {
      this.navigation.updateContext('welcome');
    }
  }
}
