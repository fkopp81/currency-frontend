import { ECurrency, IConversion } from "20_Conversions/5_objects";

export const DConversionAPI = "IConversionAPI";
export interface IConversionAPI
{
  getCurrentRates(base: ECurrency): Promise<IConversion>;
  getHistoricRates(base: ECurrency, date: string): Promise<IConversion>
}