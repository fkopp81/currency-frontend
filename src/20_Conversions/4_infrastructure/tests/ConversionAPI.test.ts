import { IConfig } from "100_config/5_objects";
import { ECurrency, IConversion } from "20_Conversions/5_objects";
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
})