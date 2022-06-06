import { ECurrency } from "../../5_objects/interfaces/ECurrency"

export interface IConversions
{
  getCurrentRate(base: ECurrency, to: ECurrency): number
}