import { Fragment } from "react";

const CurrencyResult = (props) => {
  const { result, info } = props;
  return (
    <Fragment>
      <p>
        {info.amount} ({info.isoFrom}): {result.result} ({info.isoTo})
      </p>
      <p>
        1({info.isoFrom}) = {result.rate} ({info.isoTo})
      </p>
    </Fragment>
  );
};

export default CurrencyResult;
