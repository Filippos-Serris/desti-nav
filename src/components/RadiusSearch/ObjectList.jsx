import { Fragment } from "react";

import "./ObjectList.css";

import Object from "./Object";
import Card from "../UI/Card";

const ObjectList = (props) => {
  return (
    <Fragment>
      {props.objects.length === 0 && (
        <Card>
          <p className="hints">
            No matches found. Try expanding the search radius or the rate
            parameter
          </p>
        </Card>
      )}

      {props.objects.length !== 0 && (
        <ul className="object-list">
          {props.objects.map((data) => (
            <Object key={data.id} object={data} />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default ObjectList;
