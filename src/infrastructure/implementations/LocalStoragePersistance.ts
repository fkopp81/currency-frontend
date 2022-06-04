import { IPersistance } from "../interfaces/IPersistance";

export default class LocalStoragePersistance implements IPersistance
{
  save<T>(name: string, data: T): void
  {
    throw new Error("Method not implemented.");
  }
  load<T>(name: string): T
  {
    throw new Error("Method not implemented.");
  }
}