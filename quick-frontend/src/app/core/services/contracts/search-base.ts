import { Signal } from "@angular/core";
import { CardItem } from "../../models/card-item";

export interface BaseSearchApi {
  searchQuery: Signal<string>;
  isLoading: Signal<boolean>;
  cachedData: Signal<CardItem[]>;
  setSearchQuery(query: string): void;
}