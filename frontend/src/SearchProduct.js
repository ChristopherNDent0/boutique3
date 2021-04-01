import React from "react";
import { Link } from 'react-router-dom';

export default class SearchProduct extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rechercheValue : "",
            products : [],
            //prevProps : "",
            Recherche : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.keyPress = this.keyPress.bind(this);
       
    }

    handleChange(event) {
        this.setState((state)=>state.rechercheValue = event.target.value)
      }
      handleClick(event) {
        //window.location.href=("/products/productName/" + this.state.rechercheValue)
        
        fetch(`http://localhost:8080/products/productName/${this.state.rechercheValue}`, {
            method: "GET"
            })
            .then((data)=>data.json())
            .then((res)=> {this.setState({

                products: res
                
              })
            this.props.history.push ("/products/productName/" + this.state.rechercheValue)}
              )
            }
        
      
    
      keyPress(event) {
        if(event.keyCode == 13){
          event.preventDefault();
          this.handleClick();
        }
      }
    
    render(){
        
        return(
          <React.Fragment>
            <form>
            {/* Recherche par nom <input name="searchByName" type="text" placeholder="Tapez votre recherche" value={this.state.rechercheValue} 
                                onChange={this.handleChange}/>
            {<Link to= {`/products/productName/${this.state.rechercheValue}` }>Recherche</Link>} */}

        Recherche par nom <input name="searchByName" type="text" placeholder="Tapez votre recherche" 
        value={this.state.rechercheValue} onChange={this.handleChange} onKeyDown={this.keyPress}/>
        <button type="button" onClick={this.handleClick}>Recherche</button>
            {/*<Link onClick={window.location.href=("/products/productName/" + this.state.rechercheValue)}>Recherche</Link>*/}
            {/*<button onClick={()=>this.props.searchByNameCallback(this.state.rechercheValue)}>Recherche</button>*/}
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
              {this.state.products.map((product)=>{
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
    
      componentDidMount = () => {
        //searchByName = (productName)=>{
            // this.state.Recherche = true;
            // this.state.searchName = productName
            //window.location.href=("/products/productName/" + this.state.rechercheValue);
            fetch(`http://localhost:8080/products/productName/${this.props.match.params.productName}`, {
            method: "GET"
            })
            .then((data)=>data.json())
            .then((res)=>this.setState({
                products: res
              })
              )
              console.log(this.state.products)
            
        }
}