import { Link } from "react-scroll";

import "../../assets/stylesheets/UI/Header.css";

const Header = () => {
  return (
    <div className="navigation">
      <h2>DestiNav</h2>

      <nav>
        <ul>
          <li>
            <Link to="landmarks">Landmarks</Link>
          </li>
          <li>
            <Link to="dining">Dining</Link>
          </li>
          <li>
            <Link to="coffee">Coffee</Link>
          </li>
          <li>
            <Link to="drinks">Drinks</Link>
          </li>
          <li>
            <Link to="activities">Activities</Link>
          </li>
          <li>
            <Link to="weather">Weather</Link>
          </li>
          <li>
            <Link to="currency">Currency</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
