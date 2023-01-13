export default interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(ind: string): Promise<T>;
  findAll(): Promise<T[]>;
}
