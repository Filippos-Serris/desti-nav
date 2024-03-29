import "../../assets/stylesheets/Locations/LocationList.css";

import Location from "./Location";

const LocationList = (props) => {
  const { addresses, enableForms } = props;
  return (
    <div className="location-list-container">
      <h2>Where are you</h2>
      <ul className="location-list">
        {addresses.map((data) => (
          <Location
            key={data.address}
            address={data}
            enableForms={enableForms}
          />
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
