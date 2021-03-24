import React from 'react';

export default class ProductTable extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <React.Fragment>
        <table>
          <caption>Produits</caption>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
          {this.props.products.map((product)=>{
            return(
              <tr key={product.productId.toString()}>
                <td>{product.productName}</td>
                <td>{product.category.categoryName}</td>
                <td>{product.price}&euro;</td>
                {<td><img src={`/images/${product.name}.jpg`} width="50" height="50"/></td>}
                <td>
                  <button onClick={()=>this.props.showForm(product)}>Modifier</button>
                  <button onClick={()=>this.props.deleteCallback(product.id)}>Supprimer</button>
                </td>
              </tr>
            );
          })}
        </table>
        <button onClick={()=>this.props.showForm({})}>Créer Produit</button>
      </React.Fragment>
      
    );
  }
}