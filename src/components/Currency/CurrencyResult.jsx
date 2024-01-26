import "../../assets/stylesheets/Currency/CurrencyResult.css";

const CurrencyResult = (props) => {
  const { result, info } = props;
  return (
    <div className="currency-result-container">
      <p className="currency-result">
        {info.amount} ({info.isoFrom}) = {result.result} ({info.isoTo})
      </p>

      <p className="currency-rate">
        1({info.isoFrom}) = {result.rate} ({info.isoTo})
      </p>
    </div>
  );
};

export default CurrencyResult;
