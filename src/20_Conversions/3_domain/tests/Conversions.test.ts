import { ECurrency } from "20_Conversions/5_objects";
import { assert } from "console";
import { IConversions } from "../interfaces/IConversions";

describe("Conversion", () =>
{
  test("getConversionRate", () =>
  {
    // Arrange
    const conversions: IConversions = new Conversion();
    // Act
    const rate = conversions.getConversionRate(ECurrency.EUR, ECurrency.CHF);
    // Assert
    expect(rate).toBeTruthy();
  })
})