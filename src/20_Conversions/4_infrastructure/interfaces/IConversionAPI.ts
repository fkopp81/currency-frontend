import { ECurrency, IConversion } from "20_Conversions/5_objects";

export interface IConversionAPI
{
  getCurrentRates(base: ECurrency): IConversion;
}