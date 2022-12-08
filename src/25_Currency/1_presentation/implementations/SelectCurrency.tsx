import { ECurrency } from "25_Currency/5_objects";
import { ChangeEvent, useCallback } from "react";

interface IProps {
  label: string;
  ariaLabel: string;
  onSelect: (currency: ECurrency | undefined) => void;
}

export type TSelectCurrency = (props: IProps) => JSX.Element;
export const DSelectCurrency = "TSelectCurrency";

export const SelectCurrency: TSelectCurrency = ({
  label,
  ariaLabel,
  onSelect,
}: IProps): JSX.Element => {
  const options = [];
  options.push(
    <option value="" key="">
      ---
    </option>
  );
  for (const currency in ECurrency) {
    const currencyIndex = Number(currency);
    if (isNaN(currencyIndex)) continue;
    options.push(
      <option value={currency} key={currency}>
        {ECurrency[currencyIndex]}
      </option>
    );
  }
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      const currency: ECurrency = Number(value);
      if (!value || isNaN(currency)) return onSelect(undefined);
      onSelect(currency);
    },
    [onSelect]
  );
  return (
    <label>
      {label}
      <select aria-label={ariaLabel} onChange={handleChange}>
        {options}
      </select>
    </label>
  );
};
