import { Injectable, signal } from '@angular/core';
import { ActiveContext } from '../Enums/active-context';

@Injectable({
  providedIn: 'root'
})
export class Navigation {
    public currentContext = signal<ActiveContext>(ActiveContext.welcome);

    public updateContext(context: ActiveContext) {
        this.currentContext.set(context);
    }
}
