import { ECurrency } from "25_Currency/5_objects";
import { IConversionHistory } from "../../5_objects";

const mockConversionHistory: IConversionHistory = {
  "2022-05-15": {
    [ECurrency.USD]: {
      base: ECurrency.USD,
      rates: {
        [ECurrency.EUR]: 0.01,
        [ECurrency.USD]: 1,
        [ECurrency.CHF]: 0.001
      }
    }
  },
    "2022-05-31": {
    [ECurrency.EUR]: {
      base: ECurrency.EUR,
      rates: {
        [ECurrency.EUR]: 1,
        [ECurrency.USD]: 1000,
        [ECurrency.CHF]: 1.5
      }
    }
  }
}

export default mockConversionHistory;