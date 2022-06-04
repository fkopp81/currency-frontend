import { IConversionHistory } from "../interfaces/IConversionHistory";

const mockConversionHistory: IConversionHistory = {
  "2022-05-15": {
    "USD": {
      base: "USD",
      timestamp: Date.now(),
      rates: {
        "EUR": 0.01,
        "USD": 1,
        "CHF": 0.001
      }
    }
  },
  "2022-05-31": {
    "EUR": {
      base: "EUR",
      timestamp: Date.now(),
      rates: {
        "EUR": 1,
        "USD": 1000,
        "CHF": 1.5
      }
    }
  }
};

export default mockConversionHistory;