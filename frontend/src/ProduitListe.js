import React from 'react';
import { Link } from 'react-router-dom';

export default class ProduitListe extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                <Link to={this.props.match.url + '/create'}>Créer un produit</Link>
                <ul>
                    <li>Produit 1
                        <Link to={this.props.match.url + '/1'}>Afficher</Link>
                        <Link to={this.props.match.url + '/edit/1'}>Modifier</Link>
                        <button onClick={() => this.delete(1)}>Supprimer</button>
                    </li>
                    <li>Produit 2
                        <Link to={this.props.match.url + '/2'}>Afficher</Link>
                        <Link to={this.props.match.url + '/edit/2'}>Modifier</Link>
                        <button onClick={() => this.delete(2)}>Supprimer</button>
                    </li>
                    <li>Produit 3
                        <Link to={this.props.match.url + '/3'}>Afficher</Link>
                        <Link to={this.props.match.url + '/edit/3'}>Modifier</Link>
                        <button onClick={() => this.delete(3)}>Supprimer</button>
                    </li>
                    <li>Produit 4
                        <Link to={this.props.match.url + '/4'}>Afficher</Link>
                        <Link to={this.props.match.url + '/edit/4'}>Modifier</Link>
                        <button onClick={() => this.delete(4)}>Supprimer</button>
                    </li>
                </ul>
                </React.Fragment>
        )
    }
}