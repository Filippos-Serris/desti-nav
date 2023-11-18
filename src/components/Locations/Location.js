import { useContext } from "react";
import LocationContext from "../../store/location-context";

const Location = (props) => {
  const locationCtx = useContext(LocationContext);
  const locationHandler = () => {
    locationCtx.setSelectedLocation(props.location);
  };

  return (
    <div>
      <label>{props.location.address}</label>
      <button
        onClick={locationHandler}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Select
      </button>
    </div>
  );
};

export default Location;

//onClick={}
