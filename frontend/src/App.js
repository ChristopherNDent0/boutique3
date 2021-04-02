import React from 'react';

import './App.css';
import {Link, Route} from 'react-router-dom';
import Produits from './Produits';
import Categories from './Categories';
import Login from './Login';
import AuthService from './AuthService';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser : undefined
    }
  }

  setCurrentUser = (user)=>{
    console.log(user);
    this.setState({currentUser: user})
  }

  logOut = () =>{
    AuthService.logout();
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/produits?currentPage=0">Produits</Link>
          <Link to="/categories">Categories</Link>
          {(this.state.currentUser) && <a href="/login" className="nav-link" onClick={this.logOut}>
                  Se déconnecter
                </a>}
          {(!this.state.currentUser) && <Link to="/login">Se connecter</Link>}
          
        </header>
        <main>
          <Route path="/produits" render={(props)=> <Produits {...props} currentUser={this.state.currentUser} />}/>
          <Route path="/categories" component={Categories}/>
          <Route path="/login" render={(props)=> <Login {...props} setCurrentUser={this.setCurrentUser} />}/>
        </main>
      </div>
    );
  }
  componentDidMount(){
    this.setState({currentUser : AuthService.getCurrentUser()})
  }
}

export default App;