import AddressValueObject from "../value-object/address-vo";
import Customer from "./customer";

describe("Customers Unit Tests", () => {
  it("should throw error when create a new customer without id and name", () => {
    expect(() => {
      let customer = new Customer("", "");
    }).toThrowError("Id not be empty");
  });

  it("should throw error when create a new customer without id", () => {
    expect(() => {
      let customer = new Customer("", "name");
    }).toThrowError("Id not be empty");
  });

  it("should throw error when create a new customer without name", () => {
    expect(() => {
      let customer = new Customer("id", "");
    }).toThrowError("Name not be empty");
  });

  it("should activate a customer", () => {
    let customer = new Customer("123", "customer");

    customer.activate();

    expect(customer.isActive).toBeTruthy();
  });

  it("should deactivate a customer", () => {
    let customer = new Customer("123", "customer");

    customer.deactivate();

    expect(customer.isActive).toBeFalsy();
  });

  it("should deactivate a customer", () => {
    let customer = new Customer("123", "customer");
    let address = new AddressValueObject(
      "Asa sul",
      105,
      "70277-20",
      "Brasilia"
    );

    customer.changeAddress(address);

    expect(customer.address).toMatchObject({
      _street: "Asa sul",
      _number: 105,
      _zip: "70277-20",
      _city: "Brasilia",
    });
  });

  it("should add rewards points", () => {
    let customer = new Customer("123", "customer");
    expect(customer.rewardsPoints).toBe(0);

    customer.addRewardsPoints(10);
    expect(customer.rewardsPoints).toBe(10);

    customer.addRewardsPoints(10);
    expect(customer.rewardsPoints).toBe(20);
  });
});
