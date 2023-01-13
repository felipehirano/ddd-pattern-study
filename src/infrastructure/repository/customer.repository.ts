import Customer from "../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository.interface";
import AddressValueObject from "../../domain/customer/value-object/address-vo";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository
  implements CustomerRepositoryInterface<Customer>
{
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive,
      rewardsPoints: entity.rewardsPoints,
    });
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive,
        rewardsPoints: entity.rewardsPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
  async find(id: string): Promise<Customer> {
    let customerModel;

    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (e) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    customer.changeAddress(
      new AddressValueObject(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city
      )
    );

    return customer;
  }
  async findAll(): Promise<Customer[]> {
    const customersModel = await CustomerModel.findAll();
    const customers = customersModel.map((customerModel) => {
      let customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardsPoints(customer.rewardsPoints);
      customer.changeAddress(
        new AddressValueObject(
          customerModel.street,
          customerModel.number,
          customerModel.zip,
          customerModel.city
        )
      );
      if (customer.isActive) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}
