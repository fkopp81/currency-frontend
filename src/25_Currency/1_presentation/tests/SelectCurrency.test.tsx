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
  
});