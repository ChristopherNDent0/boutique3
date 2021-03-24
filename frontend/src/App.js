import logo from './logo.svg';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import Produits from './Produits';
import Categories from './Categories';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Link to="/products">Produits</Link>
       <Link to="/categories">Categories</Link>

      </header>
      <main>
      <Route path="/products" component={Produits}/>
      <Route path="/categories" component={Categories}/>

      </main>
    </div>
  );
}

export default App;
