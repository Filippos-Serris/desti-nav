import "./Header.css";

const Header = () => {
  return (
    <div className="navigation">
      <h2>DestiNav</h2>
      <nav>
        <ul>
          <li>
            <a>Landmarks</a>
          </li>
          <li>
            <a>Dining</a>
          </li>
          <li>
            <a>Coffee</a>
          </li>
          <li>
            <a>Drinks</a>
          </li>
          <li>
            <a>Weather</a>
          </li>
          <li>
            <a>Currency</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
