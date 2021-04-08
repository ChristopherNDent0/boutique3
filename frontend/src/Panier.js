import React from 'react';

export default class Panier extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange=(event, produitId)=>{
      this.props.editCartItem(produitId, event.target.value);
    }
    render() {
        return (
            <React.Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nom</th>
                            {/* <th>prix</th> */}
                            <th>quantité</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.panier.map((p) => {
                            return (<tr key={p.id}> 
                                <td>{p.id}</td>
                                <td>{p.nom}</td>
                                {/* <td>{p.prixUnitaire}</td> */}
                                <td><input type="number" value={p.quantite} onChange={(e)=>this.handleChange(e, p.id)}/></td>
                                <td>
                                    <button onClick={() => this.props.deleteFromCart(p.id)}>Supprimer</button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
                <button onClick={this.props.deleteAllFromCart}>Vider le panier</button>
                <button onClick={() => this.props.passerCommande(this.props.panier)}>Passer la commande</button>
            </React.Fragment>

        )
    }
    componentDidMount(){
        
    }
}