import { useRef, useState } from "react";

import "../../assets/stylesheets/Currency/CurrencyForm.css";

const CurrencyForm = (props) => {
  const { currencies, onSearch, buttonDisabled } = props;

  const amount = useRef();

  const [isoFrom, setIsoFrom] = useState();
  const [isoTo, setIsoTo] = useState();

  const currencyFromHandler = (event) => {
    setIsoFrom(event.target.value);
  };
  const currencyToHandler = (event) => {
    setIsoTo(event.target.value);
  };

  const revertIso = (event) => {
    event.preventDefault();

    const isoBetween = isoFrom;

    setIsoFrom(isoTo);
    setIsoTo(isoBetween);
  };

  const formHandler = (event) => {
    event.preventDefault();

    let enteredAmount = amount.current.value;
    onSearch({
      amount: enteredAmount,
      isoFrom: isoFrom.substring(0, 3),
      isoTo: isoTo.substring(0, 3),
    });
  };

  return (
    <form className="currency-form" onSubmit={formHandler}>
      <div className="currency-input">
        <label htmlFor="currency-amount">Amount</label>
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
        <label>From</label>
        <select
          id="currencyFrom"
          onChange={currencyFromHandler}
          value={isoFrom}
        >
          {currencies.map((data) => (
            <option key={data.iso} value={`${data.iso} - ${data.currency}`}>
              {data.iso} - {data.currency}
            </option>
          ))}
        </select>
      </div>

      <button className="revert-iso" onClick={revertIso} />

      <div className="currency-input">
        <label>To</label>
        <select id="currencyTo" onChange={currencyToHandler} value={isoTo}>
          {currencies.map((data) => (
            <option key={data.iso} value={`${data.iso} - ${data.currency}`}>
              {data.iso} - {data.currency}
            </option>
          ))}
        </select>
      </div>
      <button className="convert-currency" disabled={buttonDisabled} />
    </form>
  );
};

export default CurrencyForm;
