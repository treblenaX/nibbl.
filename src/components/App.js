import logo from '../logo.svg';
import 'bulma/css/bulma.min.css';
import '../css/App.css';
import 'whatwg-fetch';
import HomePageModule from './HomePageModule';
import FooterModule from './FooterModule';

function App() {

  return (
    <div className="hero is-fullheight home-page">
      <div className="title-container">
          <div className="column is-2 is-offset-5">
              <h1><strong className="title-text">nibble.</strong></h1>
          </div>
          <HomePageModule className="home-page-container" />
      </div>
      <footer className="footer">
        <FooterModule />
      </footer>
    </div>
  );
}

export default App;
