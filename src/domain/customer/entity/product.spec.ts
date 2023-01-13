import Product from "./product";

describe("Product Unit Tests", () => {
  it("should throw error when create a new product without id", () => {
    expect(() => {
      let product = new Product("", "", 10);
    }).toThrowError("id not be empty");
  });

  it("should throw error when create a new product without name", () => {
    expect(() => {
      let product = new Product("123", "", 10);
    }).toThrowError("name not be empty");
  });

  it("should throw error when create a new product and the price is less or equal to 0", () => {
    expect(() => {
      let product = new Product("123", "456", 0);
    }).toThrowError("price not be less or equal to 0");
  });

  it("should return the price", () => {
    let product = new Product("123", "name", 10);
    expect(product.price).toBe(10);
  });

  it("should update the name of the product", () => {
    let product = new Product("123", "Product 1", 10);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should update the price of the product", () => {
    let product = new Product("123", "Product 1", 10);
    product.changePrice(15);
    expect(product.price).toBe(15);
  });
});
