import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";

import { v4 as uuid } from "uuid";

export default class OrderService {
  static total(order: Order[]): number {
    return order.reduce((acc, cur) => acc + cur.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Items must have at least one item");
    }

    const order = new Order(uuid(), customer.id, items);
    customer.addRewardsPoints(order.total() / 2);

    return order;
  }
}
