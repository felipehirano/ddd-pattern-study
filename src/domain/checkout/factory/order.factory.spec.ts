import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order Factory Unit Tests", () => {
  it("should create an Order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "Product 1",
          productId: uuid(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBeDefined();
    expect(order.customerId).toBeDefined();
    expect(order.items.length).toBe(1);
  });
});
