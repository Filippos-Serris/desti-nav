import Location from "./Location";
const LocationList = (props) => {
  return (
    <ul>
      <li key={props.location.address}>
        <Location location={props.location} />
      </li>
    </ul>
  );
};

export default LocationList;
