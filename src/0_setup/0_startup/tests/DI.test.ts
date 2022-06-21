import "../DI"
import { container } from "tsyringe";
import { DConversions, IConversions } from "20_Conversions/3_domain";

describe("DI", () =>
{
  test("DI container", () =>
  {
    // Arrange
    // Act
    const conversions = container.resolve<IConversions>(DConversions);
    // Assert
    expect(conversions).toBeDefined();
  })
})