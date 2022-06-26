import { IConfig } from "100_config/5_objects";
import { IConversion } from "20_Conversions/5_objects";
import Conversions from "../implementations/Conversions";
import { IConversions } from "../interfaces/IConversions";
import { IPersistance } from "99_Persistance/4_infrastructure";
import { mock } from 'jest-mock-extended';
import { IConversionAPI } from "20_Conversions/4_infrastructure/interfaces/IConversionAPI";
import mockConversionHistory from "./mockIConversionHistory";
import { ECurrency } from "25_Currency/5_objects";

describe("Conversion", () =>
{
  test("getConversionRate", async () =>
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
    conversionAPI.getCurrentRates.mockReturnValue(Promise.resolve(mockConversion));
    const conversions: IConversions = new Conversions(config, conversionAPI, persistance);
    
    // Act
    const rate = await conversions.getCurrentRate(ECurrency.USD, ECurrency.CHF);
    // Assert
    expect(rate).toBe(mockConversion.rates[ECurrency.CHF]);
    // No persistance for current rates (yet)
    expect(persistance.load).toBeCalledTimes(0);
    expect(persistance.save).toBeCalledTimes(0);
  })

  test("getHistoricRate from API when date not persisted", async () =>
  {
        // Arrange
    const conversionFromAPI: IConversion = {
      base: ECurrency.USD,
      rates: {
        [ECurrency.EUR]: 0.01,
        [ECurrency.USD]: 1,
        [ECurrency.CHF]: 0.001
      }
    };
    const testDate = "2013-05-30";
    const conversionHistoryFromPersistance = mockConversionHistory;
    if (conversionHistoryFromPersistance[testDate])
    {
      throw new Error(`date ${testDate} must not exist in mockConversionHistory`);
    }

    const config = {
      persistanceKeys: { conversions: "testKey" }
    } as IConfig;
    const persistance = mock<IPersistance>();
    persistance.load.mockReturnValue(conversionHistoryFromPersistance);
    const conversionAPI = mock<IConversionAPI>();
    conversionAPI.getHistoricRates.mockReturnValue(Promise.resolve(conversionFromAPI));
    const conversions: IConversions = new Conversions(config, conversionAPI, persistance);
    
    // Act
    const rate = await conversions.getHistoricRate(ECurrency.USD, ECurrency.CHF, testDate);

    // Assert
    expect(rate).toBe(conversionFromAPI.rates[ECurrency.CHF]);
    expect(persistance.load).toBeCalled();
    expect(persistance.save).toBeCalled();
  })

  test("getHistoricRate from API when base currency not persisted", async () =>
  {
    // Arrange
    const testDate = "2022-05-31";
    const testBase = ECurrency.USD;
    const testTo = ECurrency.CHF;

    const conversionFromAPI: IConversion = {
      base: ECurrency.USD,
      rates: {
        [ECurrency.EUR]: 0.01,
        [ECurrency.USD]: 1,
        [ECurrency.CHF]: 0.001
      }
    };
    
    const conversionHistoryFromPersistance = mockConversionHistory;
    if (!conversionHistoryFromPersistance[testDate])
    {
      throw new Error(`date ${testDate} must exist in mockConversionHistory`);
    }
    if (conversionHistoryFromPersistance[testDate][testBase])
    {
      throw new Error(`base ${ECurrency[testBase]} must not exist in mockConversionHistory on date ${testDate}`);
    }

    const config = {
      persistanceKeys: { conversions: "testKey" }
    } as IConfig;
    const persistance = mock<IPersistance>();
    persistance.load.mockReturnValue(conversionHistoryFromPersistance);
    const conversionAPI = mock<IConversionAPI>();
    conversionAPI.getHistoricRates.mockReturnValue(Promise.resolve(conversionFromAPI));
    const conversions: IConversions = new Conversions(config, conversionAPI, persistance);
    
    // Act
    const rate = await conversions.getHistoricRate(testBase, testTo, testDate);

    // Assert
    expect(rate).toBe(conversionFromAPI.rates[testTo]);
    expect(persistance.load).toBeCalled();
    expect(persistance.save).toBeCalled();
  })

  test("getHistoricRate from persistance", async () =>
  {
    // Arrange
    const testDate = "2022-05-31";
    const testBase = ECurrency.EUR;
    const testTo = ECurrency.CHF;

    const conversionFromAPI: IConversion = {
      base: ECurrency.EUR,
      rates: {
        [ECurrency.EUR]: 1,
        [ECurrency.USD]: 0.0002,
        [ECurrency.CHF]: 2
      }
    };
    
    const conversionHistoryFromPersistance = mockConversionHistory;
    if (!conversionHistoryFromPersistance[testDate])
    {
      throw new Error(`date ${testDate} must exist in mockConversionHistory`);
    }
    if (!conversionHistoryFromPersistance[testDate][testBase])
    {
      throw new Error(`base ${ECurrency[testBase]} must exist in mockConversionHistory on date ${testDate}`);
    }
    if (!conversionHistoryFromPersistance[testDate][testBase]!.rates[testTo])
    {
      throw new Error(`rate for ${ECurrency[testTo]} with base ${ECurrency[testBase]} must exist in mockConversionHistory on date ${testDate}`);
    }
    if (conversionHistoryFromPersistance[testDate][testBase]!.rates[testTo] === conversionFromAPI.rates[testTo])
    {
      throw new Error(`rate for ${ECurrency[testTo]} needs to be different between persistance and API mocks`)
    }

    const config = {
      persistanceKeys: { conversions: "testKey" }
    } as IConfig;
    const persistance = mock<IPersistance>();
    persistance.load.mockReturnValue(conversionHistoryFromPersistance);
    const conversionAPI = mock<IConversionAPI>();
    conversionAPI.getHistoricRates.mockReturnValue(Promise.resolve(conversionFromAPI));
    const conversions: IConversions = new Conversions(config, conversionAPI, persistance);
    
    // Act
    const rate = await conversions.getHistoricRate(testBase, testTo, testDate);

    // Assert
    expect(rate).toBe(conversionHistoryFromPersistance[testDate][testBase]!.rates[testTo]);
    expect(persistance.load).toBeCalled();
    expect(conversionAPI.getHistoricRates).toBeCalledTimes(0);
    expect(persistance.save).toBeCalledTimes(0);
  })
})