export interface IPersistance
{
  save<T extends Record<string, any>>(name: string, data: T): void
  load<T extends Record<string, any>>(name: string): T
}
