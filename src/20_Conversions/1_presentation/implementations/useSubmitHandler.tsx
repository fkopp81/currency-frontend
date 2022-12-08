import { DConversions, IConversions } from "20_Conversions/3_domain";
import { ECurrency } from "25_Currency/5_objects";
import { useCallback } from "react";
import { container } from "tsyringe";

export type TUseSubmitHandler = (
  fromCurrency: ECurrency | undefined,
  toCurrency: ECurrency | undefined,
  setOutput: (output: string) => void,
  conversions?: IConversions
) => () => Promise<boolean>;

export const DUseSubmitHandler = "TUseSubmitHandler";

export const useSubmitHandler: TUseSubmitHandler = (
  fromCurrency: ECurrency | undefined,
  toCurrency: ECurrency | undefined,
  setOutput: (output: string) => void,
  conversions: IConversions = container.resolve(DConversions)
) => {
  return useCallback(async () => {
    if (fromCurrency === undefined || toCurrency === undefined) return false;
    const rate = await conversions.getCurrentRate(fromCurrency, toCurrency);
    setOutput(`${rate}`);
    return false;
  }, [conversions, fromCurrency, setOutput, toCurrency]);
};
