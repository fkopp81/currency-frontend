const Conversions = () =>
{ 
  return <form aria-label="Conversions">
    <label>From: <select aria-label="from"></select></label>
    <label>To: <select aria-label="to"></select></label>
    <input type="submit" value="Submit"></input>
    <label>Rate: <output></output></label>
  </form>
}

export default Conversions;