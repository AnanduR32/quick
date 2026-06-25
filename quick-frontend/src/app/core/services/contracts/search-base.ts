import { Signal } from "@angular/core";
import { CardItem } from "../../models/card-item";

export interface BaseSearchApi {
  searchQuery: Signal<string>;
  isLoading: Signal<boolean>;
  cachedData: Signal<CardItem[]>;
  
  search(query: string): void;
  setSearchQuery(query: string): void;
  init():void;
}