import React from 'react';
import { Link, Route } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export default class ProductTable extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      rechercheValue: ""
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

  handlePageClick = ({selected}) =>{
    console.log(selected);
    this.props.setCurrentPage(selected);
    this.props.history.push(this.props.match.url + "?currentPage="+selected+"&searchWord="+this.props.searchWord)
  }

  render(){
    console.log(this.props);
    const isEmploye = this.props.currentUser && this.props.currentUser.roles.includes("ROLE_EMPLOYE");
    return(
      <React.Fragment>
        {!!this.props.searchWord && (<div>{this.props.produitsCount} produit(s) trouvés. Voici les résultats pour le mot-clé "{this.props.searchWord}"</div>)}
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    initialSelected={this.props.currentPage}
                    forcePage={this.props.currentPage}
                    pageCount={this.props.pageCount}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                    
                />
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
          {this.props.products.map((product)=>{
            return(
              <tr key={product.productId.toString()}>
                <td>{product.productName}</td>
                <td>{product.category.categoryName}</td>
                <td>{product.price}&euro;</td>
                {/* <td><img src={`/images/${product.name}.jpg`} width="50" height="50"/></td> */}
                <td><img src={product.urlImage} width="250" height="150"/></td>
                <td>
                {/* <button onClick={()=>this.props.addToCart(product.id)}>Add to cart</button> */}
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

  componentDidMount(){
    console.log("ProduitList Componentdidmount called");
    let search = this.props.location.search;
    search = search.trim();
    search = search.split("&");
    let currPage = 0;
    let searchWord = "";
    for (let index = 0; index < search.length; index++) {
        let temp = search[index].split("=");
        if (index === 0) {
            if(temp.length === 2){
                currPage = temp[0].indexOf("currentPage") >= 0 ? temp[1] : 0;
            }
        }
        else if(index === 1){
            if(temp.length === 2){
                searchWord = temp[0].indexOf("searchWord") >= 0 ? temp[1] : "";
            }
        }
    }
    if (searchWord !== "") {
        this.props.search(searchWord);
        this.props.history.push(this.props.match.url + "?currentPage="+currPage + "&searchWord="+ searchWord);
    }
    else{
        this.props.setCurrentPage(parseInt(currPage));
        this.props.history.push(this.props.match.url + "?currentPage="+currPage)
    }
}
}