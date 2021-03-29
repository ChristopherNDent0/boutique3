import React from 'react';
import ProductName from "./ProductName";
import ProductDescription from "./ProductDescription";
import ProductId from "./ProductId";

import './styles/product-info.scss'

export default class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message : "",
            product: {
                productId: "",
                praductName: "",
                stock: "",
                description: "",
                urlImage: "",
                category: {
                    categoryId: "",
                    categoryName: ""
                },
                price: ""
            }
        }
    }
    render() {
        const messageConst = !!this.state.message;
        return (
            <React.Fragment>
                <div className="flex-grid">
                    <div className="col">
                        <ProductName name={this.state.product.productName}/>
                    </div>
                    <div className="col" >
                        {/*<ProductId name={this.state.product.productId}/>*/}
                        <div className="p-description">
                            <ProductDescription name={this.state.product.description}/>
                        </div>
                    </div>
                    <br/>
                    {/*<div className="p-description">*/}
                    {/*    <table>*/}
                    {/*        <td>Stock : {this.state.product.stock}</td>*/}
                    {/*        <td>urlImage : {this.state.product.urlImage}</td>*/}
                    {/*        <td>Categorie Id : {this.state.product.category.categoryId}</td>*/}
                    {/*        <td>Categorie : {this.state.product.category.categoryName}</td>*/}
                    {/*        <td>Prix : {this.state.product.price}</td>*/}
                    {/*    </table>*/}
                    {/*</div>*/}
                </div>
                <div id="message_produit">
                    {this.state.message}
                </div>
            </React.Fragment>
        )
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/products/" + id, { // serveur qui tourne sur le port 3500
            method: "GET",
        })
            .then((response) => {
                if (response.ok) {
                    response.json()  // une fois que la requête a abouti .then s'execute  // transforme en json
                        .then(data => {  // res c'est le résultat du serveur 
                            this.setState({ product: data })
                        })
                }
                else {
                    if (response.status == 400) {
                        this.setState({message:"Ce produit n'existe pas"});
                    } else if (response.status == 404) {
                        this.setState({message:"le id n'existe pas"});
                    }
                }
            });
    }
}