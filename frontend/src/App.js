import React from 'react';

import './App.css';
import { Link, Route } from 'react-router-dom';
import Produits from './Produits';
import Login from './Login';
import AuthService from './AuthService';
import AccessDenied from './AccessDenied';
import Panier from './Panier';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      panier: [],
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
        const lignePanier = { id: produit.id, nom: produit.nom, quantite: quantite };
        state.panier = [...state.panier, lignePanier];
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
