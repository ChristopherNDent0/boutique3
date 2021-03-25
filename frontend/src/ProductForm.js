import React from 'react';

export default class ProductForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      productId : props.product.productId || "",
      productName : props.product.productName || "",
      stock : props.product.stock || "",
      description : props.product.description || "",
      urlImage : props.product.urlImage || "",
      idCategory : props.product.idCategory || "",
      categoryName : props.product.categoryName || "",
      price : props.product.price || "",
    }
  }
  handleChange = (evt)=>{
    console.log(evt);
    evt.persist();
    let field = evt.target.name;
    let value = evt.target.value;
    this.setState((state)=>state[field] = value)
    // this.setState((state)=>state[evt.target.name] = evt.target.value)
  }
  save = (evt)=>{
    evt.preventDefault();//désactive l'action/opération par défaut du navigateur pour l'évènement onClick sur un bouton de form
    let product = {
      id : this.state.productId,
      name : this.state.productName,
      stock : this.state.stock,
      description : this.state.description,
      urlImage : this.state.urlImage,
      category :{      
        categoryId : this.state.categoryId,
        categoryName : this.state.categoryName},
      price : this.state.product.price,
    }
    this.props.saveCallback(product);
  }
  render(){
    return(
      <form>
        <input type="text" name="id" value={this.state.productId} placeholder="id" readOnly/>
        <input type="text" name="name" value={this.state.productName} placeholder="nom" onChange={this.handleChange}/>
        <input type="text" name="description" value={this.state.stock} placeholder="stock" onChange={this.handleChange}/>
        <input type="text" name="name" value={this.state.description} placeholder="description" onChange={this.handleChange}/>
        <input type="text" name="category" value={this.state.category.categoryName} placeholder="catégorie" onChange={this.handleChange}/>
        <input type="number" name="price" value={this.state.price} placeholder="Prix" onChange={this.handleChange}/>
        <button onClick={this.save}>Enregistrer</button>
        <button onClick={this.props.cancelCallback}>Annuler</button>
      </form>

    );
  }
}