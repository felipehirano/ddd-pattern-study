import ProductInterface from "./product-interface";

export default class ProductB implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price * 2;
  }

  private validate() {
    if (this._id.length === 0) {
      throw new Error("id not be empty");
    }

    if (this._name.length === 0) {
      throw new Error("name not be empty");
    }

    if (this._price === 0) {
      throw new Error("price not be less or equal to 0");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}
