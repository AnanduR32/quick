import { inject, Injectable, signal } from '@angular/core';
import { of, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ActiveContext } from '../Enums/active-context';
import { CardItem } from '../models/card-item';
import { CocktailsApi } from './cocktails-api';
import { BaseSearchApi } from './contracts/search-base';
import { MealsApi } from './meals-api';
import { Navigation } from './navigation';

@Injectable({
  providedIn: 'root' 
})
export class Search {
    private mealsApi: MealsApi = inject(MealsApi);
    private cocktailsApi: CocktailsApi = inject(CocktailsApi);
    private navigation: Navigation = inject(Navigation);

    searchQuery = signal<string>('');
    isLoading = signal<boolean>(false);

    updateQuery(query: string) {
        this.searchQuery.set(query);
    }

    clearQuery() {
        this.searchQuery.set('');
    }

    private getApiService(type: ActiveContext): BaseSearchApi | null {
        switch (type) {
            case 'meals':
                return this.mealsApi;
            case 'cocktails':
                return this.cocktailsApi;
            default:
                return null;
        }
    }

    executeSearch(query: string): Observable<CardItem[]> {
        if (!query.trim()) return of([]);
        const activeApi = this.getApiService(this.navigation.currentContext());
        if (!activeApi) {
            return of([]);
        }
        this.isLoading.set(true);
        return activeApi.search(query).pipe(
            tap(() => this.isLoading.set(false)),
            tap(error => this.isLoading.set(false))
        ) || [];
    }
}
