import { IConfig } from "100_config/5_objects";
import { IConversionAPI } from "20_Conversions/4_infrastructure/interfaces/IConversionAPI";
import { ECurrency, IConversion, IConversionHistory } from "20_Conversions/5_objects";
import { IPersistance } from "99_Persistance/4_infrastructure";
import { IConversions } from ".."

export default class conversions implements IConversions
{
  private persistanceKey: string
  constructor(config: IConfig,
    private conversionAPI: IConversionAPI,
    private persistance: IPersistance)
  { 
    this.persistanceKey = config.persistanceKeys.conversions;
  }
  getHistoricRate(base: ECurrency, to: ECurrency, date: string): number
  {
    const conversionHistory = this.persistance.load(this.persistanceKey);
    if (!conversionHistory[date] || 
      !conversionHistory[date][base] || 
      !conversionHistory[date][base]!.rates[to])
    {
      return this.getHistoricRateFromApi(base, to, date, conversionHistory);
    }
    return conversionHistory[date][base]!.rates[to]
  }
  getHistoricRateFromApi(
    base: ECurrency,
    to: ECurrency,
    date: string,
    conversionHistory: IConversionHistory): number
  {
    const conversion = this.conversionAPI.getHistoricRates(base, to, date);
    if (!conversionHistory[date]) conversionHistory[date] = {};
    conversionHistory[date][base] = conversion;
    this.persistance.save(this.persistanceKey, conversionHistory);
    const rate = conversion.rates[to];
    if (rate === undefined)
    {
      throw new Error(`Conversion API has no conversion for ${base}->${to} at ${date}`);
    }
    return rate;
  }

  getCurrentRate(base: ECurrency, to: ECurrency): number
  {
    // Should current conversion rate be persisted? Probably not
    // Future feature: Persist current rate for set time
    // const conversionHistory = this.persistence.load(this.persistanceKey);
    const conversion: IConversion = this.conversionAPI.getCurrentRates(base);
    const rate = conversion.rates[to];
    if(rate === undefined) throw new Error(`Conversion rate ${ECurrency[to]} not available for base ${ECurrency[base]}.`)
    return rate;
  }
}

// TODO: Move to own column if it needs to be reused
function buildDateString(currentDate: Date)
{
  const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth() + 1;
  const day = currentDate.getUTCDay();
  return `${year}-${month}-${day}`;
}
