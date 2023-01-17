import Order from "./order";
import OrderItem from "./order-item";

describe("Order Unit Tests", () => {
  it("should throw error when create a new order without id", () => {
    expect(() => {
      let order = new Order("", "", []);
    }).toThrowError("id not be empty");
  });

  it("should throw error when create a new order without customerId", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("customerId not be empty");
  });

  it("should throw error when create a new order with items empty", () => {
    expect(() => {
      let order = new Order("123", "456", []);
    }).toThrowError("items not be empty");
  });

  it("should throw error when quantity is less or equal than 0", () => {
    expect(() => {
      let order = new Order("123", "456", [
        new OrderItem("789", "name", 5, "p1", 0),
      ]);
    }).toThrowError("quantity must be greater than 0");
  });

  it("should construct a order", () => {
    let order = new Order("123", "456", [
      new OrderItem("789", "name", 5, "p1", 10),
    ]);
    expect(order).toMatchObject({
      _items: [{ _id: "789", _name: "name", _price: 5 }],
      _id: "123",
      _customerId: "456",
    });
  });

  it("should return the total of the order", () => {
    let order = new Order("123", "456", [
      new OrderItem("789", "name", 5, "p1", 2),
      new OrderItem("145", "name2", 10, "p1", 2),
    ]);

    expect(order.total()).toBe(30);
  });
});
