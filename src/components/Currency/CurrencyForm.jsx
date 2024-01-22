import { useRef } from "react";

import "../../assets/stylesheets/Currency/CurrencyForm.css";

const CurrencyForm = (props) => {
  const { currencies, onSearch } = props;
  //console.log(currencies);

  const amount = useRef();
  const isoFrom = useRef();
  const isoTo = useRef();

  const currencyFromHandler = (event) => {
    isoFrom.current = event.target.value;
  };
  const currencyToHandler = (event) => {
    isoTo.current = event.target.value;
  };

  const revertIso = (event) => {
    event.preventDefault();
  };

  const formHandler = (event) => {
    event.preventDefault();
    let enteredAmount = amount.current.value;
    onSearch({
      amount: enteredAmount,
      isoFrom: isoFrom.current,
      isoTo: isoTo.current,
    });
  };

  return (
    <form className="currency-form" onSubmit={formHandler}>
      <div className="currency-input">
        <label htmlFor="currency-amount">Amount:</label>
        <input
          id="currency-amount"
          placeholder="10.75"
          type="number"
          step="any"
          pattern="[0-9]+(\.[0-9]+)?"
          ref={amount}
        ></input>
      </div>

      <div className="currency-input">
        <label htmlFor="currencyFrom">From</label>
        <select id="currencyFrom" onChange={currencyFromHandler}>
          {currencies.map((data) => (
            <option key={data.iso} value={data.iso}>
              {data.iso} - {data.currency}
            </option>
          ))}
        </select>
      </div>

      <button className="revert-iso" onClick={revertIso}></button>

      <div className="currency-input">
        <label htmlFor="currencyTo">To</label>
        <select id="currencyTo" onChange={currencyToHandler}>
          {currencies.map((data) => (
            <option key={data.iso} value={data.iso}>
              {data.iso} - {data.currency}
            </option>
          ))}
        </select>
      </div>

      <button className="convert-currency" />
    </form>
  );
};

export default CurrencyForm;
