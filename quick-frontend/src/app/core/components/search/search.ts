import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  searchQuery: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  onSearchChange() {
    // Emits the text string upstream whenever a key is pressed
    this.searchEvent.emit(this.searchQuery);
  }
}
