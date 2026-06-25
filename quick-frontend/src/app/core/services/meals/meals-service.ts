import { inject, Injectable, Signal, signal } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CardItem } from '../../models/card-item';
import { BaseSearchApi } from '../contracts/search-base';
import { MealsApi } from './meals-api';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class MealsService implements BaseSearchApi {
    private mealsApi: MealsApi = inject(MealsApi);

    private _searchQuery = signal<string>('');
    public isLoading = signal<boolean>(false);

    get searchQuery(): Signal<string> {
        return this._searchQuery;
    }

    public setSearchQuery(query: string): void {
        this._searchQuery.set(query)
    }
    
    public cachedData = toSignal(
        toObservable(this.searchQuery).pipe(
            tap(() => this.isLoading.set(true)),
            switchMap(query => {
                const cleanQuery = query?.trim().toLowerCase() || 'a';
                return this.mealsApi.searchByKeyWord(cleanQuery).pipe(
                    catchError((err) => {
                        console.error('Meals API lookup failed:', err);
                        return of([]);
                    })
                );
            }),
            tap(() => this.isLoading.set(false))
        ),
        { initialValue: [] }
    );

    // public search(query: string): void {
    //     const cleanQuery = query.trim().toLowerCase() || 'a';

    //     if (cleanQuery === this.lastSearchQuery) {
    //         console.log(`Cache Hit for query: "${cleanQuery}". Skipping API lookup.`);
    //         return;
    //     }

    //     this.lastSearchQuery = cleanQuery;
    //     this.isLoading.set(true);
    //     this.mealsApi.searchByKeyWord(cleanQuery).subscribe({
    //         next: (data: CardItem[]) => {
    //             this.cachedData.set(data);
    //         },
    //         error: (error) => {
    //             console.error(`Error during search:`, error);
    //         },
    //         complete: () => {
    //             this.isLoading.set(false);
    //         }
    //     });
    // }

    // public init(): void {
    //     if (!this._searchQuery()) {
    //         this._searchQuery.set('a');
    //     }
    // }

}
