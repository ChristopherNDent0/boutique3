import React from 'react';

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
        const edit = !!this.props.match.params.id;
        return (
            <form>
                <div>
                    id : <input name="id" readOnly value={this.props.match.params.id}/>
                </div>
                <div>
                    id : <input name="name" value={this.state.product.productName}/>
                </div>
            </form>
        )
    }
    
    componentDidMount = ()=>{
        let promesse= fetch("http://localhost:8080/products/1");
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
      }
}