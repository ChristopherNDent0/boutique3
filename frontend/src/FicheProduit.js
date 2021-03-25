import React from 'react';
import { Link, Route } from 'react-router-dom';

export default class FicheProduit extends React.Component {
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
                <div style={messageConst ? { display: 'none' } : {}}>
                    <ul>    
                        <li>id : {this.state.product.productId}</li>
                        <li>Nom : {this.state.product.productName}</li>
                        <li>Stock : {this.state.product.stock}</li>
                        <li>Description : {this.state.product.description}</li>
                        <li>urlImage : {this.state.product.urlImage}</li>
                        <li>Categorie Id : {this.state.product.category.categoryId}</li>
                        <li>Categorie : {this.state.product.category.categoryName}</li>
                        <li>Prix : {this.state.product.price}</li>
                    </ul>
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