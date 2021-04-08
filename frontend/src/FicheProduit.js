import React from 'react';
import './FicheProduit.css'

export default class FicheProduit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: {
                productId: "",
                productName: "",
                stock: "",
                description: "",
                urlImage: "",
                category: {
                    categoryId: null,
                    categoryName: ""
                },
                price: ""
            }
        }
    }

    render() {
        return (
            <section id="produit">
                <div><img src={this.state.produit.urlImage} height="250" /></div>
                <section id="NomDescription">
                    <section id="Nom">
                        <div id="ProductName">{this.state.produit.productName}</div>
                        <div>(Id : {this.state.produit.productId})</div>
                        <div>Stock : {this.state.produit.stock}</div>
                    </section>
                    <section>
                        <div id="description">{this.state.produit.description}</div>
                        <div>Categorie : {this.state.produit.category.categoryName}</div>
                        <div id="price">Prix : {this.state.produit.price}€</div>
                    </section>
                </section>
            </section >
        )
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/public/produits/" + id, {
            method: "GET"
        })
            .then((data) => data.json())
            .then((res) => {
                this.setState({ produit: res })
                console.log(res)
            })
    }
}