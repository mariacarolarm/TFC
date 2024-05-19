export interface IMatchModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}
