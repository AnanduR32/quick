import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Search as SearchService } from '../../../core/services/search';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private searchService = inject(SearchService);
  private currentInputBuffer: string = '';

  protected get searchQueryValue(): string {
    return this.searchService.searchQueryValue();
  }

  protected onSearchInputChange(value: string) {
    this.currentInputBuffer = value;
  }

  protected onEnterPressed() {
    this.searchService.updateQuery(this.currentInputBuffer);
  }
}
