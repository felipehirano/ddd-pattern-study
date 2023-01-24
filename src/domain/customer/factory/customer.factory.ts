import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import AddressValueObject from "../value-object/address-vo";

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuid(), name);
  }

  public static createWithAddress(
    name: string,
    address: AddressValueObject
  ): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }
}
