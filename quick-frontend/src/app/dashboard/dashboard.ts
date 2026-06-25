import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Search as SearchService } from '../core/services/search';
import { filter, Subscription } from 'rxjs';
import { Navigation } from '../core/services/navigation';
import { NavigationComponent } from '../core/components/navigation/navigation';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  private searchService = inject(SearchService);
  private router = inject(Router);
  private navigation = inject(Navigation);
  private routerSubscription?: Subscription;

  ngOnInit() {
    const currentUrl = this.router.url;
    this.parseAndSetContext(currentUrl);

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const dynamicUrl = event.urlAfterRedirects || event.url;
      this.parseAndSetContext(dynamicUrl);
    });
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

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}
