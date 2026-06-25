import { Component, input, Input } from '@angular/core';
import { CardItem } from '../../models/card-item';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  item = input.required<CardItem>();
}
