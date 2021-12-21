import logo from '../logo.svg';
import 'bulma/css/bulma.min.css';
import '../css/App.css';
import 'whatwg-fetch';
import HomePageModule from './HomePageModule';

function App() {
  return (
    <div className="home-page">
      <div className="columns title-container">
          <div className="column is-2 is-offset-5">
              <h1><strong className="title-text">nibble.</strong></h1>
          </div>
      </div>
      <HomePageModule />
    </div>
  );
}

export default App;
