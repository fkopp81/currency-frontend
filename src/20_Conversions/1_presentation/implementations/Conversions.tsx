import { DConversions, IConversions } from "20_Conversions/3_domain";
import { SelectCurrency } from "25_Currency/1_presentation";
import { ECurrency } from "25_Currency/5_objects";
import { useCallback, useState } from "react";
import { container } from "tsyringe";

interface IProps
{
  conversions?: IConversions
}

export const Conversions = ({conversions = container.resolve(DConversions)}: IProps) =>
{ 
  if (!conversions) throw new Error("Internal app error");
  const [fromCurrency, setFromCurrency] = useState<ECurrency | undefined>(undefined);
  const [toCurrency, setToCurrency] = useState<ECurrency | undefined>(undefined);
  const [output, setOutput] = useState<string>("");
  const submitHandler = useCallback(async () =>
  {
    if (fromCurrency === undefined || toCurrency === undefined) return false;
    const rate = await conversions.getCurrentRate(fromCurrency, toCurrency);
    setOutput(`${rate}`);
    return false;
  }, [conversions, fromCurrency, toCurrency])
  return <form aria-label="Conversions">
    <SelectCurrency label="From:" ariaLabel="from" onSelect={setFromCurrency}/>
    <SelectCurrency label="To:" ariaLabel="to" onSelect={setToCurrency}/>
    <input
      type="button"
      value="Submit"
      disabled={fromCurrency === undefined || toCurrency === undefined}
      onClick={submitHandler}
    />
    <label>Rate: <output>{output}</output></label>
  </form>
}
