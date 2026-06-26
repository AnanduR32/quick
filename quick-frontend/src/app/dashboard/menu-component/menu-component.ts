import { Component, computed, inject } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { MenuService } from '../../core/services/menu-service'
import { ActiveContext } from '../../core/Enums/active-context';

@Component({
  selector: 'app-menu-component',
  imports: [Card],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.scss',
})
export class MenuComponent {
  private menuService = inject(MenuService);
  protected meals = this.menuService.getCachedDataFor(ActiveContext.meals);
  protected cocktails = this.menuService.getCachedDataFor(ActiveContext.cocktails);

  protected combinedMenu = computed(() => {
    const rawList = [...this.meals(), ...this.cocktails()];
    return rawList.sort((a, b) => a.title.localeCompare(b.title));
  });

  protected isLoading = this.menuService.isLoading;
  protected isUserManuallySearched = this.menuService.userManuallySearched;
  protected searchQueryValue = this.menuService.searchMenuQueryValue;
}
