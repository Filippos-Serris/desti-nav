import { useContext } from "react";
import LocationContext from "../../store/location-context";
import Card from "../UI/Card";

const Location = (props) => {
  const locationCtx = useContext(LocationContext);

  const locationHandler = () => {
    locationCtx.setSelectedLocation(props.address);
    props.locationSet();
  };

  return (
    <Card>
      <li>
        <label>{props.address.address}</label>
        <button
          onClick={locationHandler}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Select
        </button>
      </li>
    </Card>
  );
};

export default Location;

//onClick={}
