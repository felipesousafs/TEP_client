export class Item {
  id: number;
  name: string;
  cost: number;
  quantity: number;
  basketId: number;

  constructor(name: string, cost: number, quantity: number, id?: number, basketId?: number) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.quantity = quantity;
    this.basketId = basketId;
  }
}
