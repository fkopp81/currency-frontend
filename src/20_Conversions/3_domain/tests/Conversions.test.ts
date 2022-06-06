import { IConfig } from "100_config/3_domain";
import { ECurrency, IConversion } from "20_Conversions/5_objects";
import Conversions from "../implementations/Conversions";
import { IConversions } from "../interfaces/IConversions";
import { IPersistance} from "99_Persistance/4_infrastructure";
import { mock } from 'jest-mock-extended';
import { IConversionAPI } from "20_Conversions/4_infrastructure/interfaces/IConversionAPI";

describe("Conversion", () =>
{
  test("getConversionRate", () =>
  {
    // Arrange
    const mockConversion: IConversion = {
      base: ECurrency.USD,
      rates: {
        [ECurrency.EUR]: 0.01,
        [ECurrency.USD]: 1,
        [ECurrency.CHF]: 0.001
      }
    };
    const config = {
      persistanceKeys: { conversions: "testKey" }
    } as IConfig;
    const persistance = mock<IPersistance>();
    const conversionAPI = mock<IConversionAPI>();
    conversionAPI.getCurrentRates.mockReturnValue(mockConversion);
    const conversions: IConversions = new Conversions(config, conversionAPI, persistance);
    
    // Act
    const rate = conversions.getCurrentRate(ECurrency.USD, ECurrency.CHF);
    // Assert
    expect(rate).toBe(mockConversion.rates[ECurrency.CHF]);
  })
})