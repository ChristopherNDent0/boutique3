import { logDOM } from '@testing-library/react';
import React from 'react';
import ProductTable from './ProductTable';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import ProduitForm from './ProduitForm';
import FicheProduit from './FicheProduit';
import SearchProduct from './SearchProduct';

export default class ProductDisplay extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchName : "",
      categories : [],
      Recherche : false,
      networkError: false,
      startEditing : false,
      product : {},
      products : [
   
      ]
    }
  }

  // searchByName = (productName)=>{
  //   this.state.Recherche = true;
  //   this.state.searchName = productName
  //   fetch(`http://localhost:8080/products/productName/${productName}`, {
  //   method: "GET"
  //   })
  //   .then((data)=>data.json())
  //   .then((res)=>this.setState({
  //       products: res
  //     })
  //     )
  //   }

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
    this.setState({product: {}});
    this.props.history.push(this.props.match.path)
  }

  save = (product)=>{
    //ajout d'un nouveau produit
    if (!product.productId) {
      // product.id = this.state.productId;
      fetch("http://localhost:8080/products", {
        method: "POST",
        // mode: 'no-cors',
        headers: {"Content-type": "application/json", "Access-Control-Allow-Origin": "http://localhost:8080", 'Accept' :'application/json', 'Authorization': '*'},
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
      fetch(`http://localhost:8080/products/${product.productId}`, {
        method: "PUT",
        // mode: 'no-cors',
        headers: {"Content-type": "application/json", "Access-Control-Allow-Origin": "http://localhost:8080", 'Accept' :'application/json', 'Authorization': '*'},
        body: JSON.stringify(product)
      })
      .then((data)=>data.json())
      .then((res)=> this.setState(
        {
          products: this.state.products.map((p)=> p.productId === product.productId ? res : p), 
          startEditing: false
        }
        ))
      this.props.history.push('/products');
    }
  }

  render(){
    if (this.state.networkError) {
      return <p>problème de réseau !</p>
    } else {
      // return this.state.startEditing ? // pas besoin de start editing
      return(
      <Switch>
        <Route exact path={this.props.match.path + '/:id'} component={FicheProduit}/>
        <Route path={this.props.match.path + '/productName/:productName'} component={SearchProduct}/>
        <Route path={this.props.match.path + '/create'} component={ProduitForm}/>
        <Route path={this.props.match.path + '/edit/:id'} render={(props) => (
              <ProduitForm {...props} categories={this.state.categories} cancelCallback={this.cancel} 
              saveCallback={this.save}/>
            )} />
        <Route path={this.props.match.path + '/'} render={(props) => (
              <ProductTable {...props} products={this.state.products} 
              deleteCallback={this.deleteProduct} searchByName={this.searchByName}/>
            )} />
        <Redirect to={this.props.match.path}/>
       </Switch>
      )
    }
  }
  
  componentDidMount = ()=>{
    this.state.Recherche ?
    fetch(`http://localhost:8080/products/productName/${this.state.productName}`, {
    method: "GET"
    })
    .then((data)=>data.json())
    .then((res)=>this.setState({
        products: res
      })
      )
    //   Promise.all([
    //     fetch(`http://localhost:8080/products/categories`).then(res => res.json())
    // ]).then(([urlTwoData]) => {
    //     this.setState({
    //       categories : urlTwoData
    //     });
    //     console.log("BYE!!!!");
    //     console.log(this.state.categories);
    //     console.log(this.state.products);
    // })
    // .catch((err)=>{
    //     console.log(err)
    //     this.setState({networkError: true})
    //   })
      :
      Promise.all([
        fetch("http://localhost:8080/products").then(res => res.json()),
        fetch(`http://localhost:8080/products/categories`).then(res => res.json())
    ]).then(([urlOneData, urlTwoData]) => {
        this.setState({
          products: urlOneData,
          categories : urlTwoData

          // categories : urlTwoData.map((c)=> this.state.categories.concat(c))
        });
        console.log("BYE!!!!");
        console.log(this.state.categories);
        console.log(this.state.products);
    })
    .catch((err)=>{
        console.log(err)
        this.setState({networkError: true})
      })
  // componentDidMount = ()=>{
  //   let promesse= fetch("http://localhost:8080/products");
  //   promesse
  //   .then((data)=>{
  //     console.log(data);
  //     return data.json()
  //   })
  //   .then((res)=> {
  //     console.log(res);
  //     this.setState({products: res})
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //     this.setState({networkError: true})
  //   })
  // }
}
}