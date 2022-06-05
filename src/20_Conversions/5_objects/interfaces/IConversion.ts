import { ECurrency } from "./ECurrency"
import { IRates } from "./IRates"

export interface IConversion
{
  base: ECurrency
  rates: IRates
}