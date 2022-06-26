import { ECurrency } from "../../../25_Currency/5_objects/interfaces/ECurrency"
import { IRates } from "./IRates"

export interface IConversion
{
  base: ECurrency
  rates: IRates
}