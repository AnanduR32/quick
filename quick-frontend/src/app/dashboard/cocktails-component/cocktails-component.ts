import { Component, effect, signal, inject } from '@angular/core';
import { Search as SearchService } from '../../core/services/search';

@Component({
  selector: 'app-cocktails-component',
  imports: [],
  templateUrl: './cocktails-component.html',
  styleUrl: './cocktails-component.scss',
})
export class CocktailsComponent {
  cocktails = signal<any[]>([]);
  private searchService: SearchService = inject(SearchService);

  ngOnInit() {
    this.searchService.updateContext('cocktails');
    effect(() => {
      const text = this.searchService.searchQuery();
      this.searchService.executeSearch(text).subscribe(res => {
        this.cocktails.set(res.cocktails || []);
      });
    });
  }
}
