import AddressValueObject from "../value-object/address-vo";
import CustomerFactory from "./customer.factory";

describe("Customer Factory Unit Tests", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("Customer 1");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    let address = new AddressValueObject("Street", 105, "7077", "Sao Paulo");
    let customer = CustomerFactory.createWithAddress("Customer 1", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
  });
});
