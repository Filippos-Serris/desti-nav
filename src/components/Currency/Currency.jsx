import { Fragment, useEffect, useState } from "react";

import "../../assets/stylesheets/Currency/Currency.css";

import CurrencyForm from "./CurrencyForm";
import CurrencyResult from "./CurrencyResult";

const EXCHANGE_RATE_API_KEY = "2592ad5d7efc53ce945f9b32";

const Currency = (props) => {
  const { id, currency, buttonDisabled } = props;

  const [apiCurrencyResponse, setApiCurrencyResponse] = useState([]);
  const [apiPairConversion, setApiPairConversion] = useState({
    rete: "",
    result: "",
  });

  const [firstLoad, setFirstLoad] = useState(true);
  const [params, setParams] = useState({
    amount: "",
    isoFrom: "",
    isoTo: "",
  });

  const paramsHandler = (params) => {
    console.log(params);
    setFirstLoad(false);
    setParams(params);
  };

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/codes`
        );
        const resData = await res.json();

        const supportedCurrencies = [{ iso: "---", currency: "---" }];
        resData.supported_codes.map((data) =>
          supportedCurrencies.push({ iso: data[0], currency: data[1] })
        );
        setApiCurrencyResponse(supportedCurrencies);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (firstLoad) {
      return;
    }

    async function fetchCurrencyRate() {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/pair/${params.isoFrom}/${params.isoTo}/${params.amount}`
        );
        const resData = await res.json();
        setApiPairConversion({
          rate: resData.conversion_rate,
          result: resData.conversion_result,
        });
        console.log(resData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrencyRate();
  }, [params]);

  return (
    <div className="currency">
      <h2 className="title" id={id}>
        Currency
      </h2>
      <div className="currency-container">
        <CurrencyForm
          currencies={apiCurrencyResponse}
          onSearch={paramsHandler}
          buttonDisabled={buttonDisabled}
        />

        {!buttonDisabled && (
          <Fragment>
            <CurrencyResult result={apiPairConversion} info={params} />
            <p className="hint">
              The currency of the location selected above is {currency} before
              prosed check for the validity of this information
            </p>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Currency;
