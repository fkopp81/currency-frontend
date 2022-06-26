import { ECurrency } from "../../../25_Currency/5_objects/interfaces/ECurrency"

export const DConversions = "IConversions"
export interface IConversions
{
  getCurrentRate(base: ECurrency, to: ECurrency): Promise<number>
  getHistoricRate(base: ECurrency, to: ECurrency, date: string): Promise<number>
}