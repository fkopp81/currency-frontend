import { ECurrency } from "25_Currency/5_objects";
import { fireEvent, render, screen } from "@testing-library/react";
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

  test("renders submit button", () => {
    // Arrange
    render(<Conversions />);
    const output = screen.getByRole("button");
    // Act
    // Assert
    expect(output).toBeDefined();
    expect(output).toHaveAttribute("type", "submit");
  });

  test("submit button is initially disabled", () => {
    // Arrange
    render(<Conversions />);
    const comboBoxes = screen.getAllByRole("combobox");
    const fromComboBox = comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "from")
    const toComboBox = comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "to")
    const button = screen.getByRole("button");
    // Act
    
    // Assert
    expect(button).toBeDisabled();
  });

  test("submit button is enabled when both currencies have been selected", () => {
    render(<Conversions />);
    const comboBoxes = screen.getAllByRole("combobox");
    const fromComboBox = comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "from")
    const toComboBox = comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "to")
    const button = screen.getByRole("button");
    // Act
    fireEvent.change(fromComboBox!, { target: { value: ECurrency.CHF } });
    fireEvent.change(toComboBox!, { target: { value: ECurrency.EUR } });
    // Assert
    expect(button).toBeEnabled();
  });

    test("submit button is enabled when one currency is not selected", () => {
    render(<Conversions />);
    const comboBoxes = screen.getAllByRole("combobox");
    const fromComboBox = comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "from")
    const toComboBox = comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "to")
    const button = screen.getByRole("button");
    // Act
    fireEvent.change(fromComboBox!, { target: { value: ECurrency.CHF } });
    fireEvent.change(toComboBox!, { target: { value: ECurrency.EUR } });
    fireEvent.change(toComboBox!, { target: { value: "" } });
    // Assert
    expect(button).toBeDisabled();
  });
});