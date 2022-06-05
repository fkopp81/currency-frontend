import { ECurrency } from "../../5_objects/interfaces/ECurrency"

export interface IConversions
{
  getConversionRate(base: ECurrency, to: ECurrency, date?: string): number
}