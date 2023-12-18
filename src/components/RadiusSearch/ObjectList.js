import "./ObjectList.css";

import Object from "./Object";

const ObjectList = (props) => {
  return (
    <ul className="object-list">
      {props.objects.map((data) => (
        <Object key={data.id} object={data} />
      ))}
    </ul>
  );
};

export default ObjectList;
