import React from 'react';

import './App.css';
import { Link, Route } from 'react-router-dom';
import Produits from './services/Produits';
import Categories from './pages/categories/Categories';
import Login from './pages/login/Login';
import AuthService from './auth/AuthService';
import AccessDenied from './auth/AccessDenied';
import Panier from './pages/cart/Panier';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      panier: [],//[{id: 1, nom: test, prixUnitaire: 10.50, quantité: 1}, {id: 5, nom: test5, prixUnitaire: 4.50, quantité: 3}]
      panierCount: 0
    }
  }
  addToCart = (produit, quantite = 1) => {
    this.setState({ panierCount: this.state.panierCount + 1 })
    let newProduit = true;

    this.state.panier.forEach(p => {
      if (p.id === produit.id) {
        newProduit = false;
      }
    })
    this.setState((state) => {
      if (newProduit) {
        const lignePanier = { id: produit.id, nom: produit.nom, /*prixUnitaire: produit.prixUnitaire, */quantite: quantite };
        state.panier = [...state.panier, lignePanier];
        // state.panier = state.panier.concat(lignePanier)
      }
      else {
        state.panier = state.panier.map((p) => {
          p.quantite = p.id === produit.id ? p.quantite + 1 : p.quantite;
          return p;
        })
      }

    })
  }
  deleteFromCart = (produitId) => {
    this.setState((state) => state.panier = state.panier.filter((p) => p.id !== produitId))
  }
  editCartItem = (produitId, quantite) => {
    this.setState((state) => state.panier = state.panier.map((p) => {
      p.quantite = p.id === produitId ? quantite : p.quantite;
      return p;
    }
    ))
  }

  deleteAllFromCart = () => {
    this.setState((state) => state.panier = [])
  }

  setCurrentUser = (user) => {
    console.log(user);
    this.setState({ currentUser: user })
  }

  logOut = () => {
    AuthService.logout();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/produits?currentPage=0">Produits</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/panier">Panier ({this.state.panier.length})</Link>
          {(this.state.currentUser) && <div>
            <span>{this.state.currentUser.username} | </span>
            <a href="/login" className="nav-link" onClick={this.logOut}>
              Se déconnecter
                                        </a>
          </div>}
          {(!this.state.currentUser) && <Link to="/login">Se connecter</Link>}

        </header>
        <main>
          <Route path="/produits" render={(props) => <Produits {...props} addToCart={this.addToCart} currentUser={this.state.currentUser} />} />
          <Route path="/panier" render={(props) => <Panier {...props} panier={this.state.panier} deleteFromCart={this.deleteFromCart} editCartItem={this.editCartItem} deleteAllFromCart={this.deleteAllFromCart} />} />
          <Route path="/categories" component={Categories} />
          <Route path="/login" render={(props) => <Login {...props} setCurrentUser={this.setCurrentUser} />} />
          <Route path="/access_denied" component={AccessDenied} />
        </main>
      </div>
    );
  }
  componentDidMount() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    this.setState({ currentUser: AuthService.getCurrentUser(), panier: panier })
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
    localStorage.setItem("panier", JSON.stringify(this.state.panier));
  }
}

export default App;
// import React from 'react';

// import './App.css';
// import {Link, Route} from 'react-router-dom';
// import Produits from './Produits';
// import Categories from './Categories';
// import Login from './Login';
// import AuthService from './AuthService';



// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       currentUser : undefined
//     }
//   }

//   setCurrentUser = (user)=>{
//     console.log(user);
//     this.setState({currentUser: user})
//   }

//   logOut = () =>{
//     AuthService.logout();
//   }

//   render(){
//     return (
//       <div className="App">
//         <header className="App-header">
//           <Link to="/produits?currentPage=0">Produits</Link>
//           <Link to="/categories">Categories</Link>
//           {(this.state.currentUser) && <a href="/login" className="nav-link" onClick={this.logOut}>
//                   Se déconnecter
//                 </a>}
//           {(!this.state.currentUser) && <Link to="/login">Se connecter</Link>}

//         </header>
//         <main>
//           <Route path="/produits" render={(props)=> <Produits {...props} currentUser={this.state.currentUser} />}/>
//           <Route path="/categories" component={Categories}/>
//           <Route path="/login" render={(props)=> <Login {...props} setCurrentUser={this.setCurrentUser} />}/>
//         </main>
//       </div>
//     );
//   }
//   componentDidMount(){
//     this.setState({currentUser : AuthService.getCurrentUser()})
//   }
// }

// export default App;