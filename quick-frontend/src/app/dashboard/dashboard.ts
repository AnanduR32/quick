import { Component, computed, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationComponent } from '../core/components/navigation/navigation';
import { ActiveContext } from '../core/Enums/active-context';
import { Navigation } from '../core/services/navigation';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private router = inject(Router);
  private navigation = inject(Navigation);

  private navigationEnd = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ) as any
  );

  constructor() {
    effect(() => { // subscriber
      if (this.navigationEnd()) { // "emitter"
        const event = this.navigationEnd() as NavigationEnd;
        const dynamicUrl = event.urlAfterRedirects || event.url;
        this.parseAndSetContext(dynamicUrl); // triggered by "emitter"
      }
    });

    this.parseAndSetContext(this.router.url);
  }

  private parseAndSetContext(url: string): void { // action when 'navigationEnd' router events emitted by effect in constructor
    if (url.includes('/meals')) {
      this.navigation.updateContext(ActiveContext.meals);
    } else if (url.includes('/cocktails')) {
      this.navigation.updateContext(ActiveContext.cocktails);
    }
    else if (url.includes('/menu')){
      this.navigation.updateContext(ActiveContext.menu);
    } else {
      this.navigation.updateContext(ActiveContext.welcome);
    }
  }

  private isAtDashboard: Signal<boolean> = computed(() => this.navigation.currentContext() == ActiveContext.welcome)
}
