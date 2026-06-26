import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { MenuService } from '../../core/services/menu-service';

@Component({
  selector: 'app-cocktails-component',
  imports: [Card],
  templateUrl: './cocktails-component.html',
  styleUrl: './cocktails-component.scss',
})
export class CocktailsComponent {
  private menuService = inject(MenuService);
  cocktails = this.menuService.cachedData;
  isLoading = this.menuService.isLoading;
  searchQueryValue = this.menuService.searchQueryValue;
}
