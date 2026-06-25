import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CardItem } from '../models/card-item';
import { BaseSearchApi } from './contracts/search-base';

@Injectable({
    providedIn: 'root'
})
export class CocktailsApi implements BaseSearchApi {
    private http = inject(HttpClient);

    search(query: string): Observable<CardItem[]> {
        if (!query.trim()) return of([]);
        return this.http.get<any>(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${query}`).pipe(
            tap(response => { console.log(`CocktailsApi search response length:`, response.drinks?.length); }),
            map(response => {
                const drinks = response.drinks || [];
                // Transform raw response to unified SearchItem array
                return drinks.map((drink: any) => new CardItem(drink.idDrink, drink.strDrink, drink.strDrinkThumb, drink.strCategory));
            })
        );
    }
}
