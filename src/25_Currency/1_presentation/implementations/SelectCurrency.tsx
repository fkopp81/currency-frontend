interface IProps
{
  label: string
  ariaLabel: string
}

const SelectCurrency = ({ label, ariaLabel }: IProps) =>
{
  return <label>{label}<select aria-label={ariaLabel}></select></label>
};

export default SelectCurrency;