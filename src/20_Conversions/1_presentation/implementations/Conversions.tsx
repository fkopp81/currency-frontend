import SelectCurrency from "25_Currency/1_presentation/implementations/SelectCurrency";

const Conversions = () =>
{ 
  return <form aria-label="Conversions">
    <SelectCurrency label="From:" ariaLabel="from"/>
    <SelectCurrency label="To:" ariaLabel="to"/>
    <input type="submit" value="Submit"></input>
    <label>Rate: <output></output></label>
  </form>
}

export default Conversions;