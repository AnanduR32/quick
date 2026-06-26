import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private menuService = inject(MenuService);
  private currentInputBuffer: string = '';

  protected get searchQueryValue(): string {
    return this.menuService.searchQueryValue();
  }

  protected onSearchInputChange(value: string) {
    this.currentInputBuffer = value;
  }

  protected onEnterPressed() {
    this.menuService.updateQuery(this.currentInputBuffer);
  }
}
