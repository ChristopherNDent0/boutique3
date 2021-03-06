import React from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './ProduitListe.css'

export default class ProduitListe extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    handlePageClick = ({selected}) =>{
        console.log(selected);
        this.props.setCurrentPage(selected);
        this.props.history.push(this.props.match.url + "?currentPage="+selected+"&searchWord="+this.props.searchWord)
    }
    render() {
        console.log(this.props);
        const isEmploye = this.props.currentUser && this.props.currentUser.roles.includes("ROLE_EMPLOYE");
        return (
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
                <section id="produits">
                {this.props.produits.map((p) => {
                            if (p.estActif === true) { 
                            return (
                            <section>
                            <div><img src={p.urlImage} height="150"/></div>
                            <section id="NameCategoryPrice">
                                {/* <div><img src={p.urlImage} height="150"/></div> */}
                                <div id="ProductName">{p.productName}</div>
                                <div>{p.category.categoryName}</div>
                                <div id="price">{p.price}&euro;</div>
                                <div>
                                    <button onClick={()=>this.props.addToCart(p)}>Ajouter au panier</button>
                                    <Link to={this.props.match.url + '/'+p.productId}>Afficher</Link>
                                    <Link style={isEmploye ? {}: {display: "none" }} to={this.props.match.url + '/edit/'+p.productId}>Modifier</Link>
                                    <button style={isEmploye ? {}: {display: "none" }}  onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) {this.props.deleteCallback(p)}}}>Supprimer</button>     
                                </div>
                            </section>
                            </section>)}
                        })}
	            </section>
                </React.Fragment>
                )
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