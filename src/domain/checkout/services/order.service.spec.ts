import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe("Order Service Unit Tests", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1 ");
    const item = new OrderItem("i1", "Item 1", 10, "p1", 1);

    const order = OrderService.placeOrder(customer, [item]);
    expect(customer.rewardsPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should return the total orders", () => {
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 20, "p2", 4);

    const order1 = new Order("o1", "c1", [item1]);
    const order2 = new Order("o2", "c2", [item2]);

    // Domain services são necessários para controlar o crescimento da aplicação, além de serem stateless, apresentam
    // apenas comportamentos e orquestram endidades
    const total = OrderService.total([order1, order2]);

    expect(total).toBe(100);
  });
});
