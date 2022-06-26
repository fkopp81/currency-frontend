import { ECurrency } from "25_Currency/5_objects";
import { fireEvent, render, screen } from "@testing-library/react";
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
      if (isNaN(Number(currency))) continue;
      expect(
        options.find((option) => option.getAttribute("value") === currency))
        .toBeDefined();
    }
  });
  test("handles value changes", () => {
    // Arrange
    const handleSelect = jest.fn();
    render(<SelectCurrency
      label="Test:"
      ariaLabel="test"
      onSelect={handleSelect}
    />);
    const selectCurrency = screen.getByRole("combobox");
    // Act
    fireEvent.change(selectCurrency, { target: { value: ECurrency.EUR } });
    // Assert
    expect(selectCurrency).toHaveValue(`${ECurrency.EUR}`);
    expect(handleSelect).toBeCalledWith<[ECurrency]>(ECurrency.EUR);
  });
  
});