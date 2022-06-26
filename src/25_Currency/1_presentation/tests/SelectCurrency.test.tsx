import { render, screen } from "@testing-library/react";

describe('SelectCurrency', () => {
  test("renders comboBox", () => {
    // Arrange
    render(<SelectCurrency />);
    const selectCurrency = screen.getByRole("combobox");
    // Act
    // Assert
    expect(selectCurrency).toBeDefined();
  });
  
});