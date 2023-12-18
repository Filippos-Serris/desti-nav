import { useEffect, useState, useContext } from "react";

import RadiusSearchForm from "./RadiusSearchForm";
import ObjectList from "./ObjectList";
import LocationContext from "../../store/location-context";
import Card from "../UI/Card";

const API_KEY = "5ae2e3f221c38a28845f05b6489e6f49a73600131a4aece3c12d2d07";

const RadiusSearch = (props) => {
  const [apiResponse, setApiResponse] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [params, setParams] = useState({});

  const ctxLocation = useContext(LocationContext);

  useEffect(() => {
    if (firstLoad) {
      return;
    }

    async function fetchObjects() {
      try {
        const res = await fetch(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=${params.radius}&lon=${ctxLocation.lng}&lat=${ctxLocation.lat}&kinds=${props.pointsOfInterest}&rate=${params.rate}&format=json&limit=${params.limit}&apikey=${API_KEY}`
        );
        const resData = await res.json();
        console.log(resData);

        const returnedObjects = [];

        if (Array.isArray(resData)) {
          resData.map((data) =>
            returnedObjects.push({
              id: data.xid,
              name: data.name,
              distance: data.dist,
              lng: data.point.lon,
              lat: data.point.lat,
            })
          );
        }
        setApiResponse(returnedObjects);
      } catch (error) {
        console.log(error);
      }
    }
    fetchObjects();
  }, [params]);

  const paramsHandler = (params) => {
    setFirstLoad(false);
    setParams({
      id: params.id,
      radius: params.radius,
      limit: params.limit,
      rate: params.rate,
    });
  };

  return (
    <Card>
      <h2 id={props.id}>{props.title}</h2>
      <RadiusSearchForm onSearch={paramsHandler} />
      <ObjectList objects={apiResponse} />
    </Card>
  );
};

export default RadiusSearch;
