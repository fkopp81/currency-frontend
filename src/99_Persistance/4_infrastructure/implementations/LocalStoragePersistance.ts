import { IPersistance } from "../interfaces/IPersistance";
//import IPersistance = Persistance.IPersistance

export default class LocalStoragePersistance implements IPersistance
{
  save<T>(name: string, data: T): void
  {
    global.localStorage.setItem(name, JSON.stringify(data));
  }
  load<T>(name: string): T
  {
    const data = global.localStorage.getItem(name);
    if (!data) throw new Error(`Data for "${name}" not found`);
    return JSON.parse(data);
  }
}