import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Search as SearchService } from '../../core/services/search';
import { Card } from '../../core/components/card/card';

@Component({
  selector: 'app-cocktails-component',
  imports: [Card],
  templateUrl: './cocktails-component.html',
  styleUrl: './cocktails-component.scss',
})
export class CocktailsComponent {
  private searchService = inject(SearchService);
  cocktails = toSignal(
    toObservable(this.searchService.searchQuery).pipe(
      switchMap(text => this.searchService.executeSearch(text))
    ),
    { initialValue: [] }
  );
}
