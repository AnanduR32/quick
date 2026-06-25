export class CardItem {
  id: string;
  title: string;
  imageUrl: string;
  subtitle: string;

  constructor(id: string, title: string, imageUrl: string, subtitle: string) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.subtitle = subtitle;
  }
}