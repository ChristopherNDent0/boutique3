import logo from './logo.svg';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import Categories from './Categories';
import ProductDisplay from './ProductDisplay';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Link to="/products">Produits</Link>
       <Link to="/categories">Categories</Link>

      </header>
      <main>
      <Route path="/products" component={ProductDisplay}/>
      <Route path="/categories" component={Categories}/>
      </main>
    </div>
  );
}

export default App;
