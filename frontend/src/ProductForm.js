import React from 'react';
import categories from './Categories';

export default class ProduitForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    render(){
        console.log("HELLO!!!!");
        console.log(this.props.categories);
        
        const edit = !!this.props.productId;
        return (
            <form onSubmit="return confirm('Are you sure you wish to modify this product?');">
                <div>
                    id : <input name="productId" type="number" readOnly value={this.props.match.params.id} />
                </div>
                <div>
                    Nom : <input name="productName" type="text" value={this.state.product.productName} onChange={this.handleChange}/>
                </div>
                <div>
                    Stock : <input name="stock" type="number" value={this.state.product.stock} onChange={this.handleChange}/>
                </div>
                <div>
                    Description : <input name="description" type="text" value={this.state.product.description} onChange={this.handleChange}/>
                </div>
                <div>
                    urlImage : <input name="urlImage" type="text" value={this.state.product.urlImage} onChange={this.handleChange}/>
                </div>
                <div>
                    Prix : <input name="price" type="number" value={this.state.product.price} onChange={this.handleChange}/>
                </div>
                <label htmlFor="category">Categorie</label>
                <select name="category" id="category" onChange={this.handleChangeCategory} value={this.state.product.category.categoryId}>
                    {this.props.categories.map((c)=> {return(<option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>);})}
                </select>
                <button onClick={this.save}>Enregistrer</button>
                <button onClick={this.props.cancelCallback}>Annuler</button>
            </form>
        )
    }
    handleChange(event) {
        this.setState((state)=>state.product[event.target.name] = event.target.value)
      }

    handleChangeCategory(event){
        this.setState((state)=>state.product.category[`categoryId`] = event.target.value)
        this.setState((state)=>state.product.category[`categoryName`] = event.target.value)
      }

    // handleChange = (evt)=>{
    //     console.log(evt);
    //     evt.persist();
    //     let field = evt.target.name;
    //     let value = evt.target.value;
    //     this.setState((state)=>state[field] = value)
    //     // this.setState((state)=>state[evt.target.name] = evt.target.value)
    //   }

      save = (evt)=>{
        evt.preventDefault();//désactive l'action/opération par défaut du navigateur pour l'évènement onClick sur un bouton de form
        let product = {
          productId : this.state.product.productId,
          productName : this.state.product.productName,
          stock : this.state.product.stock,
          description : this.state.product.description,
          urlImage : this.state.product.urlImage,
          category :{      
            categoryId : this.state.product.category.categoryId,
            // categoryName : this.state.product.category.categoryName
        },
          price : this.state.product.price,
        }
        this.props.saveCallback(product);
      }

    componentDidMount = ()=>{
        Promise.all([
            fetch(`http://localhost:8080/products/${this.props.match.params.id}`).then(res => res.json()),
        ]).then(([urlOneData]) => {
            this.setState({
                product: urlOneData,
            });
            console.log(urlOneData)
        })
        .catch((err)=>{
            console.log(err)
            this.setState({networkError: true})
          })
        }
    
    // componentDidMount = ()=>{
    //     Promise.all([
    //         fetch(`http://localhost:8080/products/${this.props.match.params.id}`).then(res => res.json()),
    //         fetch(`http://localhost:8080/products/categories`).then(res => res.json())
    //     ]).then(([urlOneData, urlTwoData]) => {
    //         this.setState({
    //             product: urlOneData,
    //             categories : urlTwoData.map((c)=> this.state.categories.concat(c))
    //         });
    //         console.log("BYE!!!!");
    //         console.log(this.state.categories);
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //         this.setState({networkError: true})
    //       })

        // let promesse= fetch(`http://localhost:8080/products/${this.props.match.params.id}`);
        // promesse
        // .then((data)=>{
        //   console.log(data);
        //   return data.json()
        // })
        // .then((res)=> {
        //   console.log(res);
        //   this.setState({product: res})
        // })
        // .catch((err)=>{
        //   console.log(err)
        //   this.setState({networkError: true})
        // })

    // categoryFetch = () => {
    //     fetch(`http://localhost:8080/products/categories`, {
    //     method: "GET",
    //   })
    //   .then((data)=>data.json())
    //   .then((res)=> this.setState(
    //     {
    //       category : this.state.res.map((c)=> this.state.category.concat(c)), 
    //     }
    //     ))
    // }
        
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
    // }
}