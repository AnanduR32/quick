import { inject, Injectable, Signal, signal } from '@angular/core';
import { map } from 'rxjs';
import { CardItem } from '../../models/card-item';
import { BaseSearchApi } from '../contracts/search-base';
import { MealsApi } from './meals-api';

@Injectable({
    providedIn: 'root'
})
export class MealsService implements BaseSearchApi {
    private mealsApi: MealsApi = inject(MealsApi);

    private _searchQuery = signal<string>('');
    public cachedData = signal<CardItem[]>([]);
    public isLoading = signal<boolean>(false);

    get searchQuery(): Signal<string> {
        return this._searchQuery;
    }

    public setSearchQuery(query: string): void {
        this._searchQuery.set(query)
    }

    private lastSearchQuery = '';

    public search(query: string): void {
        const cleanQuery = query.trim().toLowerCase() || 'a';

        if (cleanQuery === this.lastSearchQuery) {
            console.log(`Cache Hit for query: "${cleanQuery}". Skipping API lookup.`);
            return;
        }

        this.lastSearchQuery = cleanQuery;
        this.isLoading.set(true);
        this.mealsApi.searchByKeyWord(cleanQuery).subscribe({
            next: (data: CardItem[]) => {
                this.cachedData.set(data);
            },
            error: (error) => {
                console.error(`Error during search:`, error);
            },
            complete: () => {
                this.isLoading.set(false);
            }
        });
    }

    public init(): void {
        if (this.cachedData().length === 0) {
            this.search('a');
        }
    }

}
