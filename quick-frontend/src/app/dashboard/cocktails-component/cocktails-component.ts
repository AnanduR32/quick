import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { Search as SearchService } from '../../core/services/search';

@Component({
  selector: 'app-cocktails-component',
  imports: [Card],
  templateUrl: './cocktails-component.html',
  styleUrl: './cocktails-component.scss',
})
export class CocktailsComponent implements OnInit {
  private searchService = inject(SearchService);
  cocktails = this.searchService.cachedData;
  isLoading = this.searchService.isLoading;
  searchQueryValue = this.searchService.searchQueryValue;
  ngOnInit() {
    this.searchService.init();
  }
}
