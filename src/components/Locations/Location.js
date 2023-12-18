import "./Location.css";

import { useContext } from "react";
import LocationContext from "../../store/location-context";
import Card from "../UI/Card";

const Location = (props) => {
  const locationCtx = useContext(LocationContext);

  const locationHandler = () => {
    props.locationSet();
    locationCtx.setSelectedLocation(props.address);
  };

  return (
    <div className="location-container">
      <li className="location">
        <p>{props.address.address}</p>
        <p className="flag">{props.address.flag}</p>
        <button
          onClick={locationHandler}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Select
        </button>
      </li>
    </div>
  );
};

export default Location;
