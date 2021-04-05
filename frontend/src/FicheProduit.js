import React from 'react';

export default class FicheProduit extends React.Component{
    constructor(props){
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

    render(){
        return (
            <div>
                <ul>
                    <li>Id : {this.state.produit.productId}</li>
                    <li>Nom : {this.state.produit.productName}</li>
                    <li>Stock : {this.state.produit.stock}</li>
                    <li>Description : {this.state.produit.description}</li>
                    <li><img src={this.state.produit.urlImage} width="250" height="150"/></li>
                    <li>Categorie : {this.state.produit.category.categoryName}</li>
                    <li>Prix : {this.state.produit.price}</li>
                </ul>
            </div>
        )
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/public/produits/"+id, {
            method: "GET"
        })
        .then((data)=>data.json())
        .then((res)=>{
        this.setState({produit : res}) //{"productId":1,"productName":"HP","stock":5,"description":"text","urlImage":"adz","category":{"categoryId":1,"categoryName":"ordinateur"},"price":200.0}
        console.log(res)
      })
    }
}