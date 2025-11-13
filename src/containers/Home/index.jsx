import './styles.css'
import { Link } from 'react-router-dom';

function MainMenu() {
  return (
    <div>
      <h1>Crawl Lover</h1>
      <div className="menu">

        <Link to="/create">
            <button className="Play">New Game</button>
        </Link>

        <Link to="/settings"
        ><button className="Config">Settings</button>
        </Link>

        <Link to="/infos">
        <button className="Info">Information</button>
        </Link>
      </div>

      <footer>
        <p>version 1.39b</p>
      </footer>
    </div>
  );
}

export default MainMenu;