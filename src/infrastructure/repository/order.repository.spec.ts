import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/customer/entity/customer";
import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order-item";
import Product from "../../domain/product/entity/product";
import AddressValueObject from "../../domain/customer/value-object/address-vo";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order Repository Unit Tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      ProductModel,
      CustomerModel,
    ]);
    await sequelize.sync();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "customer 1");

    const address = new AddressValueObject("Rua 15", 105, "70277", "Brasilia");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "product 1", 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("o1", "c1", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "o1",
      customer_id: "c1",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "o1",
          product_id: "p1",
          total: 20,
        },
      ],
    });
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
