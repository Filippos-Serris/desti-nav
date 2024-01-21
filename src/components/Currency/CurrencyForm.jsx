import { Fragment, useRef } from "react";

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
    <form onSubmit={formHandler}>
      <label htmlFor="currency-amount">Amount</label>
      <input
        id="currency-amount"
        placeholder="10.75"
        type="number"
        step="any"
        pattern="[0-9]+(\.[0-9]+)?"
        ref={amount}
      ></input>

      <select onChange={currencyFromHandler}>
        {currencies.map((data) => (
          <option key={data.iso} value={data.iso}>
            {data.iso} - {data.currency}
          </option>
        ))}
      </select>

      <select onChange={currencyToHandler}>
        {currencies.map((data) => (
          <option key={data.iso} value={data.iso}>
            {data.iso} - {data.currency}
          </option>
        ))}
      </select>

      <button />
    </form>
  );
};

export default CurrencyForm;

/*

return (
    <Fragment>
      {currencies.map((data) => (
        <p>{data.iso}</p>
      ))}
    </Fragment>
  );

  */
