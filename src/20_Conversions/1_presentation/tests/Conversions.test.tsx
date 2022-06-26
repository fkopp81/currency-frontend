import { render, screen } from "@testing-library/react";
import Conversions from "../implementations/Conversions";

describe("Conversions", () =>
{
  test("renders a Conversions component", () =>
  {
    // Arrange
    // Act
    render(<Conversions />)
    const ConversionsElement = screen.getByRole("form")
    // Assert
    expect(ConversionsElement).toBeTruthy();
    expect(ConversionsElement.getAttribute("aria-label")).toBe("Conversions");
  })
  test("renders comboBoxes for from-to conversions", () => {
    // Arrange
    render(<Conversions />);
    const comboBoxes = screen.getAllByRole("combobox");
    // Act
    // Assert
    expect(comboBoxes.length).toBe(2);
    expect(comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "from")).toBeTruthy();
    expect(comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "to")).toBeTruthy();
  });
  test("renders output field", () => {
    // Arrange
    render(<Conversions />);
    const output = screen.getByRole("status");
    // Act
    // Assert
    expect(output).toBeDefined();
  });
  
});