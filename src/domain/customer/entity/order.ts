import OrderItem from "./order-item";

export default class Order {
  private _id!: string;
  private _customerId!: string;
  private _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;

    this.validate();
  }

  private validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("id not be empty");
    }

    if (this._customerId.length === 0) {
      throw new Error("customerId not be empty");
    }

    if (this._items.length === 0) {
      throw new Error("items not be empty");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("quantity must be greater than 0");
    }

    return true;
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get items() {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, current) => acc + current.orderTotal(), 0);
  }
}
