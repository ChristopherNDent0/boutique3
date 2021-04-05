import React from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

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
                <table>
                    <thead>
                        <tr>
                            {/* <th>id</th> */}
                            <th>Nom</th>
                            {/* <th>cat id</th> */}
                            <th>Catégorie</th>
                            <th>Prix</th>
                            <th>Image</th>
                            {/* <th>Action</th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.produits.map((p) => {
                            return (<tr key={p.productId}> 
                                {/* <td>{p.id}</td> */}
                                <td>{p.productName}</td>
                                {/* <td>{p.categorie.id}</td> */}
                                <td>{p.category.categoryName}</td>
                                <td>{p.price}&euro;</td>
                                <td><img src={p.urlImage} width="250" height="150"/></td>
                                <td>
                                    <Link to={this.props.match.url + '/'+p.productId}>Afficher</Link>
                                    <Link style={isEmploye ? {}: {display: "none" }} to={this.props.match.url + '/edit/'+p.productId}>Modifier</Link>
                                    <button style={isEmploye ? {}: {display: "none" }}  onClick={() => this.props.deleteCallback(p.productId)}>Supprimer</button>
                                    
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
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