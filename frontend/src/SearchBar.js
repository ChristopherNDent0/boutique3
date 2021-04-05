import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
            categoryId: null,
            categories : []
        }
      this.handleChange = this.handleChange.bind(this);  
    }

    handleChange = (event) =>{
      if (event.target.name === "category") {
        this.setState((state)=>
          state.categoryId = event.target.value) 
        this.props.searchByCategoryCallback(this.state.categoryId);     
      }
      else{
          this.setState((state)=>state[event.target.name] = event.target.value)
      }
  }

    // handleChange = (evt)=>{
    //   this.setState((state)=>state[evt.target.name] = evt.target.value)
    // }

    search = (evt)=>{
      let searchWord = this.state.searchWord.trim();
      if(searchWord.length > 0){
        this.props.searchCallback(searchWord.toLowerCase());
      }
    }

    annuler = ()=>{
      this.setState((state)=>state.searchWord = "")
      this.props.annulerSearch();
    }

    render(){
      return (
        <React.Fragment>
          <div>
            <input type="text" name="searchWord" onChange={this.handleChange} value={this.state.searchWord}/>
            <button onClick={this.search}>Rechercher</button>
            <button onClick={this.annuler}>Annuler</button>
          </div>
          <div>
            <label htmlFor="category">Categorie </label>
            <select name="category" id="category" onChange={this.handleChange} value={this.state.categoryId} defaultValue={this.state.categoryId}>
              {this.state.categories.map(cat=> {
                // const selected = cat.id === produit.categorie.id ? {selected : "selected"} : {};
                return <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
              })}
            </select>
          </div> 
       </React.Fragment>
    )}

    componentDidMount(){
      //get categories
      fetch(`http://localhost:8080/api/categories/public/categories`, {
            method: "GET"
        })
        .then((data)=>{
          console.log("hello1")
            console.log(data);
            return data.json()
          })
        .then((res)=> {
          console.log(res);
          this.setState({
              categories: res,
            }
            )
        }) 
    }      
      
}