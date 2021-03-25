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
    }

    render(){
        console.log("HELLO!!!!");
        console.log(this.props.categories);
        
        const edit = !!this.props.productId;
        return (
            <form>
                <div style={edit ? {} : { display: 'none' }}>
                    id : <input name="id" readOnly value={this.props.match.params.id} />
                </div>
                <div>
                    Nom : <input name="name" value={this.state.product.productName} onChange={this.handleChange}/>
                </div>
                <div>
                    Stock : <input name="stock" value={this.state.product.stock} onChange={this.handleChange}/>
                </div>
                <div>
                    Description : <input name="description" value={this.state.product.description} onChange={this.handleChange}/>
                </div>
                <div>
                    urlImage : <input name="urlImage" value={this.state.product.urlImage} onChange={this.handleChange}/>
                </div>
                <div>
                    Prix : <input name="prix" value={this.state.product.price} onChange={this.handleChange}/>
                </div>
                <label htmlFor="category">Categorie</label>
                <select name="category" id="category">
                    {this.props.categories.map((c)=> {return(<option key={c.categoryId}>{c.categoryName}</option>);})}
                    {/* {/* <option value="cat1">cat1</option> */}
                    {/* <option value="cat2">cat2</option> */}
                    {/* <option value="cat3">cat3</option> */}
                </select>
            </form>
        )
    }

    handleChange = (evt)=>{
        console.log(evt);
        evt.persist();
        let field = evt.target.name;
        let value = evt.target.value;
        this.setState((state)=>state[field] = value)
        // this.setState((state)=>state[evt.target.name] = evt.target.value)
      }

    componentDidMount = ()=>{
        Promise.all([
            fetch(`http://localhost:8080/products/${this.props.match.params.id}`).then(res => res.json()),
        ]).then(([urlOneData]) => {
            this.setState({
                product: urlOneData,
            });
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