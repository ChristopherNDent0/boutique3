import React from 'react';
import { Link, Route } from 'react-router-dom';

export default class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rechercheValue: "",
    }
    this.handleChange = this.handleChange.bind(this);    
    this.handleChangeCategory = this.handleChangeCategory.bind(this);  
  }

  handleChange(event) {
    this.setState((state)=>state.rechercheValue = event.target.value)
  }

  handleChangeCategory(event){
    this.setState((state)=>state.product.category[`categoryId`] = event.target.value)
  }

  render(){
    return(
      <React.Fragment>
        <form>
          Recherche par nom <input name="searchByName" type="text" placeholder="Tapez votre recherche" value={this.state.rechercheValue} onChange={this.handleChange}/>          
          {/* <button onClick={()=>this.props.searchByNameCallback(this.state.rechercheValue)}>Recherche</button> */}
          <br/>
          <label htmlFor="category">Categorie</label>
            <select name="category" id="category" onChange={this.handleChangeCategory}>
            {/* <select name="category" id="category"> */}
              {/* {console.log("category" + this.props.categories)} */}
              {this.props.categories.map((c)=> {return(<option key={c.categoryId} name={c.categoryId}>{c.categoryName}</option>);})}
            </select>
            <br/>
            <Link to= {this.props.match.url + `/productName/${this.state.rechercheValue}`}>Recherche</Link>
        </form>
        <table>
          <caption>Produits</caption>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
          {this.state.cart.map((product)=>{
            return(
              <tr key={product.productId.toString()}>
                <td>{product.productName}</td>
                <td>{product.category.categoryName}</td>
                <td>{product.price}&euro;</td>
                {/* <td><img src={`/images/${product.name}.jpg`} width="50" height="50"/></td> */}
                <td><img src={product.urlImage} width="250" height="150"/></td>
                <td>
                <Link to={this.props.match.url + `/edit/${product.productId}`}>Modifier</Link>
                <Link to={this.props.match.url + `/${product.productId}`}>Afficher</Link>
                  {/* <button onClick={()=>this.props.deleteCallback(product.id)}>Supprimer</button> */}
                </td>
              </tr>
            );
          })}
        </table>
        <Link to= {this.props.match.url + "/create"}>Créer Produit</Link>
      </React.Fragment>
      
    );
  }
}