import Product from "../entity/product";
import RepositoryInterface from "./repository.interface";

export default interface ProductRepositoryInterface<Product>
  extends RepositoryInterface<Product> {}
