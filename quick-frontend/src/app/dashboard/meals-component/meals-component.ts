import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Search as SearchService } from '../../core/services/search';
import { Card } from '../../core/components/card/card';

@Component({
  selector: 'app-meals-component',
  imports: [Card],
  templateUrl: './meals-component.html',
  styleUrl: './meals-component.scss',
})
export class MealsComponent {
  private searchService = inject(SearchService);
  meals = toSignal(
    toObservable(this.searchService.searchQuery).pipe(
      switchMap(text => this.searchService.executeSearch(text))
    ),
    { initialValue: [] }
  );
}
