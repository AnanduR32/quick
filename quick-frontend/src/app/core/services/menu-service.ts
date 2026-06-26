import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CocktailsService } from './cocktails/cocktails-service';
import { BaseSearchApi } from './contracts/search-base';
import { MealsService } from './meals/meals-service';
import { Navigation } from './navigation';
import { ActiveContext } from '../Enums/active-context';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private navigation: Navigation = inject(Navigation);
    private mealsService: MealsService = inject(MealsService);
    private cocktailsService: CocktailsService = inject(CocktailsService);

    public searchMenuQueryValue = signal<string>('');
    public userManuallySearched = computed(() =>
    {
        return this.searchMenuQueryValue()
    })
    public searchQueryValue = computed(() => {
         if (this.navigation.currentContext() == ActiveContext.menu){
            return this.searchMenuQueryValue();
        }
        const service = this.getService();
        return service ? service.searchQuery() : '';
    });

    public updateQuery(query: string): void {
        if (this.navigation.currentContext() == ActiveContext.menu){
            this.cocktailsService.setSearchQuery(query)
            this.mealsService.setSearchQuery(query)
            this.searchMenuQueryValue.set(query)
            return;
        }
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

    public getCachedDataFor(context: ActiveContext) {
        return computed(() => {
            if (context === ActiveContext.meals) return this.mealsService.cachedData();
            if (context === ActiveContext.cocktails) return this.cocktailsService.cachedData();
            return [];
        });
    }

    private getService(): BaseSearchApi | null {
        const context = this.navigation.currentContext();
        switch (context) {
            case ActiveContext.meals:
                return this.mealsService;
            case ActiveContext.cocktails:
                return this.cocktailsService;
            default:
                return null;
        }
    }
}
