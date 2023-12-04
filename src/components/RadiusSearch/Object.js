import { useEffect, useState } from "react";

import Card from "../UI/Card";

const API_KEY = "5ae2e3f221c38a28845f05b6489e6f49a73600131a4aece3c12d2d07";

const Object = (props) => {
  const [search, setSearch] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (!search) {
      return;
    }

    async function fetchDetails() {
      const res = await fetch(
        `https://api.opentripmap.com/0.1/en/places/xid/${props.object.id}?apikey=${API_KEY}`
      );
      const resData = await res.json();
      console.log(resData);
    }
    fetchDetails();
  }, [search]);

  const searchHandler = (event) => {
    event.preventDefault();
    setSearch(true);
  };

  return (
    <Card>
      <li>
        <h2>{props.object.name}</h2>
        <p>
          Distance: {props.object.distance} Lat:{props.object.lat} Long:
          {props.object.lng}
        </p>
        <h3>Information about the place</h3>
        <button onClick={searchHandler}>Search</button>
      </li>
    </Card>
  );
};

export default Object;
