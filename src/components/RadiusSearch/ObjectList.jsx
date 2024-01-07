import { Fragment } from "react";

import "../../assets/stylesheets/RadiusSearch/ObjectList.css"

import Object from "./Object";
import Card from "../UI/Card";

const ObjectList = (props) => {
  const {objects} = props
  return (
    <Fragment>
      {objects.length === 0 && (
        <Card>
          <p className="hints">
            No matches found. Try expanding the search radius or the rate
            parameter
          </p>
        </Card>
      )}

      {objects.length !== 0 && (
        <ul className="object-list">
          {objects.map((data) => (
            <Object key={data.id} object={data} />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default ObjectList;
