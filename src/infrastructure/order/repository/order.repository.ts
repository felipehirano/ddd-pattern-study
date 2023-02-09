import Order from "../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "../sequelize/model/order-item.model";
import OrderModel from "../sequelize/model/order.model";

export default class OrderRepository
  implements OrderRepositoryInterface<Order>
{
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          total: item.orderTotal(),
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    try {
      let sequelize = OrderModel.sequelize;
      await sequelize.transaction(async (t) => {
        await OrderItemModel.destroy({
          where: { order_id: entity.id },
          transaction: t,
        });
        const items = entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
          total: entity.total(),
        }));
        await OrderItemModel.bulkCreate(items, { transaction: t });
        await OrderModel.update(
          { total: entity.total() },
          { where: { id: entity.id }, transaction: t }
        );
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update order");
    }
  }

  find(ind: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
