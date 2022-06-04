import { IRates } from "./IRates"
import { TCurrency } from "./types"

export interface IConversion
{
  timestamp: number
  base: TCurrency
  rates: IRates
}