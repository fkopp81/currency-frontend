import { ECurrency, IConversion } from "20_Conversions/5_objects";

export interface IConversionAPI
{
  getCurrentRates(base: ECurrency): Promise<IConversion>;
  getHistoricRates(base: ECurrency, to: ECurrency, date: string): Promise<IConversion>
}