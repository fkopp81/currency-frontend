import { IConfig } from "100_config/3_domain";
import { ECurrency, IConversion } from "20_Conversions/5_objects";
import { IRates } from "20_Conversions/5_objects/interfaces/IRates";
import { IConversionAPI } from "../interfaces/IConversionAPI";
export default class ConversionAPI implements IConversionAPI
{
  private api
  constructor(config: IConfig)
  {
    this.api = config.api;
  }

  async getCurrentRates(base: ECurrency): Promise<IConversion>
  {
    const url = new URL(this.api.latestPath, this.api.baseUrl)
    url.search = new URLSearchParams({
        app_id: this.api.key,
        base: ECurrency[base],
        prettyprint: "false"
      }).toString();
    const request = new Request(url.href);
    const response = await fetch(request);
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    return await this.convertResponseToConversion(response)
  }

  async getHistoricRates(base: ECurrency, to: ECurrency, date: string): Promise<IConversion>
  {
    throw new Error("Method not implemented.");
  }
 
  private async convertResponseToConversion(response: Response): Promise<IConversion>
  {
    const json = await response.json();
    return {
      base: json.base,
      rates: this.convertRates(json.rates)
    };
  }
  convertRates(rates: any): IRates
  {
    const retval: Partial<Record<number, number>> = {}
    for (const currency in ECurrency)
    {
      const currencyIndex = Number(currency);
      const currencyString = ECurrency[currencyIndex];
      if (isNaN(Number(currency))) {
        continue;
      }
      retval[currencyIndex] = rates[currencyString];
    }
    return retval as IRates;
  }
}