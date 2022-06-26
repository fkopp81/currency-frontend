import { IConversions } from "20_Conversions/3_domain";
import { ECurrency } from "25_Currency/5_objects";
import { fireEvent, getRoles, render, screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import Conversions from "../implementations/Conversions";

describe("Conversions", () =>
{
  test("renders a Conversions component", () =>
  {
    // Arrange
    // Act
    render(<Conversions conversions={mock<IConversions>()} />);
    const ConversionsElement = screen.getByRole("form")
    // Assert
    expect(ConversionsElement).toBeTruthy();
    expect(ConversionsElement.getAttribute("aria-label")).toBe("Conversions");
  })

  test("renders comboBoxes for from-to conversions", () => {
    // Arrange
    render(<Conversions conversions={mock<IConversions>()} />);
    const comboBoxes = screen.getAllByRole("combobox");
    // Act
    // Assert
    expect(comboBoxes.length).toBe(2);
    expect(comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "from")).toBeTruthy();
    expect(comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "to")).toBeTruthy();
  });

  test("renders output field", () => {
    // Arrange
    render(<Conversions conversions={mock<IConversions>()} />);
    const output = screen.getByRole("status");
    // Act
    // Assert
    expect(output).toBeDefined();
  });

  test("renders submit button", () => {
    // Arrange
    render(<Conversions conversions={mock<IConversions>()} />);
    const output = screen.getByRole("button");
    // Act
    // Assert
    expect(output).toBeDefined();
    expect(output).toHaveAttribute("type", "submit");
  });

  test("submit button is initially disabled", () => {
    // Arrange
    render(<Conversions conversions={mock<IConversions>()} />);
    const button = screen.getByRole("button");
    // Act
    
    // Assert
    expect(button).toBeDisabled();
  });

  test("submit button is enabled when both currencies have been selected", () => {
    render(<Conversions conversions={mock<IConversions>()} />);
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

  test("submit button is disabled when one currency is not selected", () => {
  render(<Conversions conversions={mock<IConversions>()} />);
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
  
  test("displays conversion rate on submission", async () => {
    // Arrange
    const testRate = 7.357;
    const conversionsDomain = mock<IConversions>();
    conversionsDomain.getCurrentRate.mockReturnValue(
      Promise.resolve(testRate));
    render(<Conversions conversions={conversionsDomain} />);
    const comboBoxes = screen.getAllByRole("combobox");
    const fromComboBox = comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "from")
    const toComboBox = comboBoxes.find((comboBox) => comboBox.getAttribute("aria-label") === "to")
    const button = screen.getByRole("button");
    // Act
    fireEvent.change(fromComboBox!, { target: { value: ECurrency.CHF } });
    fireEvent.change(toComboBox!, { target: { value: ECurrency.EUR } });
    fireEvent.click(button);
    const output = await screen.findByText(`${testRate}`);
    // Assert
    expect(conversionsDomain.getCurrentRate).toHaveBeenCalled();
    expect(output).toBeDefined();
    expect(getRoles(output)["status"]).toBeDefined();
  });
  
});