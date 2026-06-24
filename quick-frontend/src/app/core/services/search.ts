import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { MealsApi } from './meals-api';
import { CocktailsApi } from './cocktails-api';
import { ActiveContext } from '../Enums/active-context';
import { BaseSearchApi } from './contracts/search-base';

@Service()
export class Search {
    private mealsApi: MealsApi = inject(MealsApi); 
    private cocktailsApi: CocktailsApi = inject(CocktailsApi);

    searchQuery = signal<string>('');
    currentContext = signal<ActiveContext>('welcome');

    updateQuery(query: string) {
        this.searchQuery.set(query);
    }

    updateContext(context: ActiveContext) {
        this.currentContext.set(context);
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

    executeSearch(query: string): Observable<any> {
        if (!query.trim()) return of({ items: [] });

        const activeApi = this.getApiService(this.currentContext());

        if (!activeApi) {
            return of({ items: [] });
        }
        var searchResult = activeApi.search(query);
        console.log(`Search executed for context: ${this.currentContext()} with query: "${query}"`);
        console.log(`Search result:`, searchResult);
        return searchResult;
    }
}
