import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Search } from '../core/components/search/search';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Search],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
