import { IConfig } from "100_config/3_domain";
import { IConversionAPI } from "20_Conversions/4_infrastructure/interfaces/IConversionAPI";
import { ECurrency, IConversion } from "20_Conversions/5_objects";
import { IPersistance } from "99_Persistance/4_infrastructure";
import { IConversions } from ".."

export default class conversions implements IConversions
{
  private persistanceKey: string
  constructor(config: IConfig,
    private conversionAPI: IConversionAPI,
    private persistence: IPersistance)
  { 
    this.persistanceKey = config.persistanceKeys.conversions;
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
