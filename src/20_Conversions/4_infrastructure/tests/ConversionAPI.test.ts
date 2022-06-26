import { IConfig } from "100_config/5_objects";
import { IConversion } from "20_Conversions/5_objects";
import { ECurrency } from "25_Currency/5_objects";
import ConversionAPI from "../implementations/ConversionAPI";
import { IConversionAPI } from "../interfaces/IConversionAPI"

describe("Conversion API", () =>
{
  test("getCurrentRates", async () =>
  {
    // Arrange
    const testBase = ECurrency.EUR
    const testTo = ECurrency.CHF;
    const currencyString = ECurrency[testTo];
    const expectedRate = 2;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          base: testBase,
          rates: { [currencyString]: expectedRate }
        })
      })
    ) as jest.Mock;

    const config = {
      api: {
        key: "testKey",
        baseUrl: "https://example.com",
        latestPath: "latest.json",
        historicalPath: "historical.json"
      }
    } as IConfig
    const conversionAPI: IConversionAPI = new ConversionAPI(config);

    // Act
    const conversion: IConversion = await conversionAPI.getCurrentRates(testBase);

    // Assert
    expect(conversion.base).toBe(testBase);
    expect(conversion.rates[testTo]).toBe(expectedRate);
  })

  test("getCurrentRates fetch fail", async () =>
  {
    // Arrange
    const testBase = ECurrency.EUR
    const testTo = ECurrency.CHF;
    const currencyString = ECurrency[testTo];
    const expectedRate = 2;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({
          base: testBase,
          rates: { [currencyString]: expectedRate }
        })
      })
    ) as jest.Mock;

    const config = {
      api: {
        key: "testKey",
        baseUrl: "https://example.com",
        latestPath: "latest.json",
        historicalPath: "historical.json"
      }
    } as IConfig
    const conversionAPI: IConversionAPI = new ConversionAPI(config);

    // Act
    // Assert
    await expect(conversionAPI.getCurrentRates(testBase)).rejects.toThrow();
  })

  test("getHistoricRates", async () =>
  {
    // Arrange
    const testBase = ECurrency.EUR
    const testTo = ECurrency.CHF;
    const currencyString = ECurrency[testTo];
    const testDate = "2013-05-31";
    const expectedRate = 2;

    const fetchMock = jest.fn((request: Request) =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          base: testBase,
          rates: { [currencyString]: expectedRate }
        })
      })
    )

    global.fetch = fetchMock as jest.Mock;

    const config = {
      api: {
        key: "testKey",
        baseUrl: "https://example.com",
        latestPath: "latest.json",
        historicalPath: "historical.json"
      }
    } as IConfig
    const conversionAPI: IConversionAPI = new ConversionAPI(config);

    // Act
    const conversion: IConversion = await conversionAPI
      .getHistoricRates(testBase, testDate);

    // Assert
    expect(fetchMock.mock.calls[0][0].url.includes(testDate)).toBeTruthy();
    expect(conversion.base).toBe(testBase);
    expect(conversion.rates[testTo]).toBe(expectedRate);
  })

  test("getHistoricRates fetch fail", async () =>
  {
    // Arrange
    const testBase = ECurrency.EUR
    const testTo = ECurrency.CHF;
    const testDate = "2013-05-31";
    const currencyString = ECurrency[testTo];
    const expectedRate = 2;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({
          base: testBase,
          rates: { [currencyString]: expectedRate }
        })
      })
    ) as jest.Mock;

    const config = {
      api: {
        key: "testKey",
        baseUrl: "https://example.com",
        latestPath: "latest.json",
        historicalPath: "historical.json"
      }
    } as IConfig
    const conversionAPI: IConversionAPI = new ConversionAPI(config);

    // Act
    // Assert
    await expect(conversionAPI.getHistoricRates(testBase, testDate)).rejects.toThrow();
  })
})