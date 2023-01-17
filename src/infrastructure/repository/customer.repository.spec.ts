import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/customer/entity/customer";
import AddressValueObject from "../../domain/customer/value-object/address-vo";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer Repository Unit Tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");

    const address = new AddressValueObject("Rua 15", 105, "70277", "Brasilia");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "c1",
      name: "Customer 1",
      street: "Rua 15",
      number: 105,
      zip: "70277",
      city: "Brasilia",
      active: true,
      rewardsPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");

    const address = new AddressValueObject("Rua 15", 105, "70277", "Brasilia");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    let customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "c1",
      name: "Customer 1",
      street: "Rua 15",
      number: 105,
      zip: "70277",
      city: "Brasilia",
      active: true,
      rewardsPoints: 0,
    });

    const newAddress = new AddressValueObject(
      "Rua 16",
      15,
      "20987",
      "Sao Paulo"
    );
    customer.changeAddress(newAddress);

    await customerRepository.update(customer);

    customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "c1",
      name: "Customer 1",
      street: "Rua 16",
      number: 15,
      zip: "20987",
      city: "Sao Paulo",
      active: true,
      rewardsPoints: 0,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");

    const address = new AddressValueObject("Rua 15", 105, "70277", "Brasilia");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should throw error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("456abcd");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("c1", "Customer 1");
    const address = new AddressValueObject("Rua 15", 105, "70277", "Brasilia");
    customer.changeAddress(address);

    const customer2 = new Customer("c2", "Customer 2");
    const address2 = new AddressValueObject("Rua 16", 106, "70278", "Brasilia");
    customer2.changeAddress(address2);

    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();
    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer);
    expect(customers).toContainEqual(customer2);
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
