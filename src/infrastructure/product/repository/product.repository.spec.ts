import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../sequelize/model/product.model";
import ProductRepository from "./product.repository";

describe("Product Repository Unit Tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: 1 } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: "1" } });
    expect(productModel2.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: 1 } });

    const foundProject = await productRepository.find("1");
    expect(productModel.toJSON()).toStrictEqual({
      id: foundProject.id,
      name: foundProject.name,
      price: foundProject.price,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 150);
    await productRepository.create(product2);

    const product3 = new Product("3", "Product 3", 200);
    await productRepository.create(product3);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2, product3];

    expect(foundProducts).toEqual(products);
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
