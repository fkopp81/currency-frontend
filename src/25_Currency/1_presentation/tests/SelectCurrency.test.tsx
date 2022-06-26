import { ECurrency } from "25_Currency/5_objects";
import { render, screen } from "@testing-library/react";
import SelectCurrency from "../implementations/SelectCurrency";

describe('SelectCurrency', () => {
  test("renders comboBox", () => {
    // Arrange
    render(<SelectCurrency label="Test:" ariaLabel="test"/>);
    const selectCurrency = screen.getByRole("combobox");
    // Act
    // Assert
    expect(selectCurrency).toBeDefined();
  });
  test("contains options for all currencies and unselected", () => {
    // Arrange
    render(<SelectCurrency label="Test:" ariaLabel="test" />);
    const options = screen.getAllByRole("option");
    // Act
    // Assert
    expect(options.length).toBe(Object.keys(ECurrency).length / 2 + 1);
    expect(options[0]).toHaveAttribute("value", "");
    for (const currency in ECurrency)
    {
      if (isNaN(Number(currency))) return;
      expect(
        options.find((option) => option.getAttribute("value") === currency))
        .toBeDefined();
    }
  });
  
});