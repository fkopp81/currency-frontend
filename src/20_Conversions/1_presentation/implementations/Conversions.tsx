import SelectCurrency from "25_Currency/1_presentation/implementations/SelectCurrency";
import { ECurrency } from "25_Currency/5_objects";
import { useCallback, useState } from "react";

const Conversions = () =>
{ 
  const [fromCurrency, setFromCurrency] = useState<ECurrency | undefined>(undefined);
  const [toCurrency, setToCurrency] = useState<ECurrency | undefined>(undefined);
  return <form aria-label="Conversions">
    <SelectCurrency label="From:" ariaLabel="from" onSelect={setFromCurrency}/>
    <SelectCurrency label="To:" ariaLabel="to" onSelect={setToCurrency}/>
    <input
      type="submit"
      value="Submit"
      disabled={fromCurrency === undefined || toCurrency === undefined}
    />
    <label>Rate: <output></output></label>
  </form>
}

export default Conversions;