import { ECurrency, IConversion } from "20_Conversions/5_objects";

const mockConversion: IConversion = {
  base: ECurrency.USD,
  rates: {
    [ECurrency.EUR]: 0.01,
    [ECurrency.USD]: 1,
    [ECurrency.CHF]: 0.001
  }
};
    
export default mockConversion;