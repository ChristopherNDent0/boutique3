import './App.css';
import {Link, Route} from 'react-router-dom';
import Categories from './Categories';
import ProductDisplay from './ProductDisplay';
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Header/>
      </header>
      <main>
      <Route path="/products" component={ProductDisplay}/>
      <Route path="/categories" component={Categories}/>
      </main>
    </div>
  );
}

export default App;
