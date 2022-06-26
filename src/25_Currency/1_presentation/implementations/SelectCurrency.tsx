import { ECurrency } from "25_Currency/5_objects";

interface IProps
{
  label: string
  ariaLabel: string
}

const SelectCurrency = ({ label, ariaLabel }: IProps) =>
{
  const options = [];
  options.push(<option value="" key="">---</option>);
  for (const currency in ECurrency)
  {
    const currencyIndex = Number(currency);
    if (isNaN(currencyIndex)) continue;
    options.push(<option value={currency} key={currency}>
      {ECurrency[currencyIndex]}
    </option>);
  }
  return <label>{label}<select aria-label={ariaLabel}>
    {options}
  </select></label>
};

export default SelectCurrency;