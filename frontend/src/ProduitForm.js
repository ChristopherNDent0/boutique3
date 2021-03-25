import React from 'react';
import categories from './Categories';

export default class ProduitForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            category : {
                categoryName : "",
                categoryId : "",
            },
            product: {
                productId: "",
                productName: "",
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

    render(){
        const edit = !!this.props.productId;
        return (
            <form>
                <div style={edit ? {} : { display: 'none' }}>
                    id : <input name="id" readOnly value={this.props.match.params.id}/>
                </div>
                <div>
                    Nom : <input name="name" value={this.state.product.productName}/>
                </div>
                <div>
                    Stock : <input name="stock" value={this.state.product.stock}/>
                </div>
                <div>
                    Description : <input name="description" value={this.state.product.description}/>
                </div>
                <div>
                    urlImage : <input name="urlImage" value={this.state.product.urlImage}/>
                </div>
                <div>
                    Prix : <input name="prix" value={this.state.product.price}/>
                </div>
                <label for="category">Categorie</label>
                <select name="category" id="category">
                    {this.state.category.categoryName.map((number)=> <option>{number}</option>)}
                    {/* <option value="cat1">{this.state.category.categoryName[1]}</option>
                    <option value="cat2">cat2</option>
                    <option value="cat3">cat3</option> */}
                </select>
            </form>
        )
    }
    
    componentDidMount = ()=>{
        let promesse= fetch(`http://localhost:8080/products/${this.props.match.params.id}`);
        promesse
        .then((data)=>{
          console.log(data);
          return data.json()
        })
        .then((res)=> {
          console.log(res);
          this.setState({product: res})
        })
        .catch((err)=>{
          console.log(err)
          this.setState({networkError: true})
        })

    categoryFetch = () => {
        fetch(`http://localhost:8080/products/categories`, {
        method: "GET",
      })
      .then((data)=>data.json())
      .then((res)=> this.setState(
        {
          category : this.state.res.map((c)=> this.state.category.concat(c)), 
        }
        ))
    }
        
    //   let promesse2= fetch(`http://localhost:8080/products/categories`);
    //     promesse2
    //     .then((data)=>{
    //       console.log(data);
    //       return data.json()
    //     })
    //     .then((res)=> {
    //       console.log(res);
    //       this.setState({categories: res});
    //       console.log(this.state.categories);
    //     })
    //     .catch((err)=>{
    //       console.log(err)
    //       this.setState({networkError: true})
    //     })
      }
}