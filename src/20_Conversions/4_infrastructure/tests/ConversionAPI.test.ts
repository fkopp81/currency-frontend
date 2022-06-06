import { ECurrency, IConversion } from "20_Conversions/5_objects";
import { IConversionAPI } from "../interfaces/IConversionAPI"
import { oxr } from "open-exchange-rates";

describe("Conversion API", () =>
{
  test("getCurrentRates", () =>
  {
    // Arrange
    const testBase = ECurrency.EUR
    const testTo = ECurrency.CHF;
    const currencyString = ECurrency[testTo];
    const expectedRate = 2;

    const openExchangeRatesMock : Record<string, any> = jest.createMockFromModule("open-exchange-rates");
    openExchangeRatesMock.rates = {
      [currencyString]: expectedRate
    }
    jest.mock("open-exchange-rates");

    const conversionAPI: IConversionAPI = new ConversionAPI();

    // Act
    const conversion: IConversion = conversionAPI.getCurrentRates(testBase);

    // Assert
    expect(conversion.base).toBe(testBase);
    expect(conversion.rates[testTo]).toBe(expectedRate);
  })
})