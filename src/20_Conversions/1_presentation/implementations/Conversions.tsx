import { DConversions, IConversions } from "20_Conversions/3_domain";
import { DSelectCurrency, TSelectCurrency } from "25_Currency/1_presentation";
import { ECurrency } from "25_Currency/5_objects";
import { useState } from "react";
import { container } from "tsyringe";
import { DUseSubmitHandler, TUseSubmitHandler } from "./useSubmitHandler";

interface IProps {
  conversions?: IConversions;
  useSubmitHandler?: TUseSubmitHandler;
  SelectCurrency?: TSelectCurrency;
}

export const Conversions = ({
  conversions = container.resolve(DConversions),
  useSubmitHandler = container.resolve(DUseSubmitHandler),
  SelectCurrency = container.resolve(DSelectCurrency),
}: IProps) => {
  if (!conversions || !useSubmitHandler || !SelectCurrency)
    throw new Error("Internal app error");
  const [fromCurrency, setFromCurrency] = useState<ECurrency | undefined>(
    undefined
  );
  const [toCurrency, setToCurrency] = useState<ECurrency | undefined>(
    undefined
  );
  const [output, setOutput] = useState<string>("");
  const submitHandler = useSubmitHandler(fromCurrency, toCurrency, setOutput);
  return (
    <form aria-label="Conversions">
      <SelectCurrency
        label="From:"
        ariaLabel="from"
        onSelect={setFromCurrency}
      />
      <SelectCurrency label="To:" ariaLabel="to" onSelect={setToCurrency} />
      <input
        type="button"
        value="Submit"
        disabled={fromCurrency === undefined || toCurrency === undefined}
        onClick={submitHandler}
      />
      <label>
        Rate: <output>{output}</output>
      </label>
    </form>
  );
};
