import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, of, tap } from 'rxjs';
import { BaseSearchApi } from './contracts/search-base';
import { HttpClient } from '@angular/common/http';
import { CardItem } from '../models/card-item';

@Injectable({
    providedIn: 'root'
})
export class MealsApi implements BaseSearchApi {
    private http = inject(HttpClient);

    search(query: string): Observable<CardItem[]> {
        if (!query.trim()) return of([]);
        return this.http.get<any>(`https://themealdb.com/api/json/v1/1/search.php?s=${query}`).pipe(
            tap(response => { console.log(`MealsApi search response length:`, response.meals?.length); }),
            map(response => {
                const meals = response.meals || [];
                // Transform raw response to unified SearchItem array
                return meals.map((meal: any) => new CardItem(meal.idMeal, meal.strMeal, meal.strMealThumb, meal.strCategory));
            })
        );
    }
}
