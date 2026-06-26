import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { MenuService } from '../../core/services/menu-service';

@Component({
  selector: 'app-meals-component',
  imports: [Card],
  templateUrl: './meals-component.html',
  styleUrl: './meals-component.scss',
})
export class MealsComponent {
  private menuService = inject(MenuService);
  meals = this.menuService.cachedData;
  isLoading = this.menuService.isLoading;
  searchQueryValue = this.menuService.searchQueryValue;
}
