import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product Unit Tests", () => {
  it("should increase the price of all products in 10%", () => {
    const product1 = new Product("p1", "produto 1", 10);
    const product2 = new Product("p2", "produto 2", 20);

    const products = [product1, product2];

    // Domain services são necessários para controlar o crescimento da aplicação, além de serem stateless, apresentam
    // apenas comportamentos e orquestram endidades
    ProductService.increasePrice(products, 10);

    expect(product1.price).toBe(11);
    expect(product2.price).toBe(22);
  });
});
