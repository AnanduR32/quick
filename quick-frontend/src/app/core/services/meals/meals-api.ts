import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CardItem } from '../../models/card-item';

@Injectable({
    providedIn: 'root'
})
export class MealsApi {
    private http = inject(HttpClient);

    searchByKeyWord(query: string): Observable<CardItem[]> {
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
