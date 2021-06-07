import React from 'react';
import './Panier.css';

export default class Panier extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange = (event, produitId) => {
        this.props.editCartItem(produitId, event.target.value);
    }
    render() {
        return (
            <React.Fragment>
                <section id="produits">
                    {this.props.panier.map((p) => {
                        return (
                            <section>
                                <div><img src={p.product.urlImage} height="150" /></div>
                                <section id="NamePriceQuantity">
                                    <div id="ProductName">{p.product.productName}</div>
                                    <div id="Price">Prix à l'unité : {p.product.price}&euro;<br/>
                                                    Prix total : {p.product.price*p.quantite}&euro;
                                    </div>
                                    <div id="Quantity">Quantite <input type="number" value={p.quantite} onChange={(e) => {(p.quantite<=0) ? this.props.deleteFromCart(p.product.productId) : this.handleChange(e, p.product.productId)}} /></div>
                                </section>
                                <div><button id="DeleteProductCart" onClick={() => this.props.deleteFromCart(p.product.productId)}>Supprimer</button></div>
                            </section>)
                    }
                    )}
                </section>
                <button onClick={this.props.deleteAllFromCart}>Vider le panier</button>
                <button onClick={() => this.props.passerCommande(this.props.panier)}>Passer la commande</button>
            </React.Fragment>
        )
    }
    componentDidMount() {

    }
}