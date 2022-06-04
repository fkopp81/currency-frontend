export interface IPersistance
{
  save<T>(name: string, data: T): void
  load<T>(name: string): T
}