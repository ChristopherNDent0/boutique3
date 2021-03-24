
import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import Produits from '../components/product/Product';
import Categories from '../components/categories/Categories';

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
