import AddressValueObject from "../value-object/address-vo";

export default class Customer {
  private _id!: string;
  private _name!: string;
  private _address!: AddressValueObject;
  private _isActive: boolean = true;
  private _rewardsPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id not be empty");
    }

    if (this._name.length === 0) {
      throw new Error("Name not be empty");
    }

    return true;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get isActive() {
    return this._isActive;
  }

  get address() {
    return this._address;
  }

  get rewardsPoints() {
    return this._rewardsPoints;
  }

  addRewardsPoints(points: number) {
    this._rewardsPoints += points;
  }

  activate(): void {
    this._isActive = true;
  }

  deactivate(): void {
    this._isActive = false;
  }

  changeAddress(address: AddressValueObject) {
    this._address = address;
  }
}
