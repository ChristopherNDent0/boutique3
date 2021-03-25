import { logDOM } from '@testing-library/react';
import React from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import ProduitForm from './ProduitForm';

export default class ProductDisplay extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      networkError: false,
      startEditing : false,
      product : {},
      // productId: 1000,
      products : [
   
      ]
    }
  }
  

  deleteProduct = (productId)=>{//productId = 2 => products=[1,3]
    fetch(`http://localhost:8080/products/${productId}`, {
      method: "DELETE"
    })
    .then((data)=>data.json())
    .then((res)=>this.setState(
            {products : 
              this.state.products.filter((product)=> product.id !== productId)}
            ))
  }

  cancel = ()=>{
    this.setState({startEditing: false, product: {}});
  }
  save = (product)=>{
    //ajout d'un nouveau produit
    if (!product.id) {
      // product.id = this.state.productId;
      fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(product)
      })
      .then((data)=>data.json())
      .then((res)=>{
        this.setState({products: this.state.products.concat(res), 
                          // productId : this.state.productId+1, 
                          startEditing: false})
        console.log(res)
      })
    }
    else{
      fetch(`http://localhost:8080/products/${product.id}`, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(product)
      })
      .then((data)=>data.json())
      .then((res)=> this.setState(
        {
          products: this.state.products.map((p)=> p.id === product.id ? res : p), 
          startEditing: false
        }
        ))
      
    }
  }
  render(){
    if (this.state.networkError) {
      return <p>problème de réseau !</p>
    } else {
      // return this.state.startEditing ? // pas besoin de start editing
      return(
      <Switch>
        <Route path={this.props.match.path + '/create'} component={ProduitForm}/>
        <Route path={this.props.match.path + '/edit/:id'} render={(props) => (
              <ProduitForm {...props} cancelCallback={this.cancel} 
              saveCallback={this.save}/>
            )} />
        <Route path={this.props.match.path + '/'} render={(props) => (
              <ProductTable {...props} products={this.state.products} 
              deleteCallback={this.deleteProduct}/>
            )} />
        <Redirect to={this.props.match.path}/>
       </Switch>
      )
    }
  }
  componentDidMount = ()=>{
    let promesse= fetch("http://localhost:8080/products");
    promesse
    .then((data)=>{
      console.log(data);
      return data.json()
    })
    .then((res)=> {
      console.log(res);
      this.setState({products: res})
    })
    .catch((err)=>{
      console.log(err)
      this.setState({networkError: true})
    })
  }
}