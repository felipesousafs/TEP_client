import {Item} from './item';

export class Basket {
  id: number;
  items: Item[] = [];

  constructor(basket: any) {
    this.id = basket.id;
    basket.items.forEach(item => {
      this.items.push(new Item(item.name, item.cost, item.quantity, item.id, this.id));
    });
  }
}
