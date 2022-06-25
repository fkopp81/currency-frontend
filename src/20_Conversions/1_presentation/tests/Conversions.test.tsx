import { render, screen } from "@testing-library/react";

describe("Conversions", () =>
{
  test("renders a Conversions class component", () =>
  {
    // Arrange
    // Act
    const renderResult = render(<Conversions />)
    const ConversionsElement = screen.getByRole("form")
    // Assert
    expect(ConversionsElement).toBeTruthy();
    expect(ConversionsElement.classList).toContain("Conversions")
  })
});