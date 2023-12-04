import { useRef } from "react";

const RadiusSearchForm = (props) => {
  const radius = useRef();
  const limit = useRef();
  const rate = useRef();

  const handleRateChange = (event) => {
    rate.current = event.target.value;
  };

  const searchHandler = (event) => {
    event.preventDefault();

    const enteredRadius = radius.current.value;
    const enteredLimit = limit.current.value;
    const enteredRate = rate.current;

    console.log(
      `Radius:${enteredRadius}, Limit:${enteredLimit}, Rate:${enteredRate}`
    );

    props.onSearch({
      radius: enteredRadius,
      limit: enteredLimit,
      rate: enteredRate,
    });
  };

  return (
    <form onSubmit={searchHandler}>
      <div>
        <label htmlFor="radius">Radius</label>
        <input id="radius" type="number" ref={radius}></input>
      </div>

      <div>
        <label htmlFor="limit">Number of results</label>
        <input
          id="limit"
          type="number"
          placeholder="1-1000"
          ref={limit}
        ></input>
      </div>

      <div>
        <label htmlFor="rate">Rate</label>
        <select id="rate" onChange={handleRateChange}>
          <option>---</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <button>Search</button>
    </form>
  );
};

export default RadiusSearchForm;
