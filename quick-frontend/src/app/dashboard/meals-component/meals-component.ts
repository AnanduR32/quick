import { Component, effect, inject, signal } from '@angular/core';
import { Search as SearchService } from '../../core/services/search';

@Component({
  selector: 'app-meals-component',
  imports: [],
  templateUrl: './meals-component.html',
  styleUrl: './meals-component.scss',
})
export class MealsComponent {
  meals = signal<any[]>([]);
  private searchService: SearchService = inject(SearchService);

  ngOnInit() {
    this.searchService.updateContext('meals');
    effect(() => {
      const text = this.searchService.searchQuery();
      this.searchService.executeSearch(text).subscribe(res => {
        this.meals.set(res.meals || []);
      });
    });
  }
}
