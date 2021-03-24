import React from 'react';
import { Link, Route } from 'react-router-dom';

export default class ProduitList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            product : {
            productId :"",
                productName:"",
                stock: "",
                description: "",
                urlImage:"",
                category:{
                    categoryId:"",
                    categoryName:""
                },
                price : ""
            }
            
        }
        
    }
  
    
    render() {

        return (
            
            <ul> 
                <li >
                    <Link to={this.props.match.url + '/1'}>Afficher</Link>
                    <Link to={this.props.match.url + '/edit/1'}>Modifier</Link>
                    <button onClick={() => this.delete(1)}>Supprimer</button>
                </li>
                <li>
                    <Link to={this.props.match.url + '/2'}>Afficher</Link>
                    <Link to={this.props.match.url + '/edit/2'}>Modifier</Link>
                    <button onClick={() => this.delete(2)}>Supprimer</button>
                </li>
                <li>
                    <Link to={this.props.match.url + '/3'}>Afficher</Link>
                    <Link to={this.props.match.url + '/edit/3'}>Modifier</Link>
                    <button onClick={() => this.delete(3)}>Supprimer</button>
                </li>
                <li>
                    <Link to={this.props.match.url + '/4'}>Afficher</Link>
                    <Link to={this.props.match.url + '/edit/4'}>Modifier</Link>
                    <button onClick={() => this.delete(4)}>Supprimer</button>
                </li>
            </ul>
        )
    }
    componentDidMount(){
        fetch("http://localhost:8080/products/", { // serveur qui tourne sur le port 3500
                method: "GET",
            })
                .then((data) => data.json())  // une fois que la requête a abouti .then s'execute  // transforme en json
                .then((res) => {  // res c'est le résultat du serveur 
                    this.setState({product : res})
                    console.log(res)
                })
    }

}