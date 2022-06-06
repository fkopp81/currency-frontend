import { ECurrency } from "../../5_objects/interfaces/ECurrency"

export interface IConversions
{
  getCurrentRate(base: ECurrency, to: ECurrency): Promise<number>
  getHistoricRate(base: ECurrency, to: ECurrency, date: string): Promise<number>
}