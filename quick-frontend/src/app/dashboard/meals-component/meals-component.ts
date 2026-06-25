import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { Search as SearchService } from '../../core/services/search';

@Component({
  selector: 'app-meals-component',
  imports: [Card],
  templateUrl: './meals-component.html',
  styleUrl: './meals-component.scss',
})
export class MealsComponent implements OnInit {
  private searchService = inject(SearchService);
  meals = this.searchService.cachedData;
  isLoading = this.searchService.isLoading;
  searchQueryValue = this.searchService.searchQueryValue;
  ngOnInit() {
    // this.searchService.init();
  }
}
