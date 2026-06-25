import { computed, effect, inject, Injectable } from '@angular/core';
import { CocktailsService } from './cocktails/cocktails-service';
import { BaseSearchApi } from './contracts/search-base';
import { MealsService } from './meals/meals-service';
import { Navigation } from './navigation';

@Injectable({
    providedIn: 'root'
})
export class Search {
    private navigation: Navigation = inject(Navigation);
    private mealsService: MealsService = inject(MealsService);
    private cocktailsService: CocktailsService = inject(CocktailsService);

    public searchQueryValue = computed(() => {
        const service = this.getService();
        return service ? service.searchQuery() : '';
    });

    public updateQuery(query: string): void {
        const service = this.getService();
        service?.setSearchQuery(query);
    }

    public isLoading = computed(() => {
        const service = this.getService();
        return service ? service.isLoading() : false;
    })

    public cachedData = computed(() => {
        const service = this.getService();
        return service ? service.cachedData() : [];
    })

    private getService(): BaseSearchApi | null {
        const context = this.navigation.currentContext();
        switch (context) {
            case 'meals':
                return this.mealsService;
            case 'cocktails':
                return this.cocktailsService;
            default:
                return null;
        }
    }
}
