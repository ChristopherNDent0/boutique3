import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
            categoryId: 0,
            categories : []
        }
      this.handleChange = this.handleChange.bind(this);  
      this.keyPress = this.keyPress.bind(this)
    }

    keyPress(event) {
      if(event.keyCode == 13){
        event.preventDefault();
        this.search();
      }
    }

    handleChange = (event) =>{
      if (event.target.name === "category") {
        this.setState((state)=>
          state.categoryId = event.target.value)
          console.log("CATEGORY ID");
          console.log(this.state.categoryId); 
        // this.props.searchByCategoryCallback(this.state.categoryId);
        this.props.searchByCategoryCallback(event.target.value);   // il y a une latence entre le set state et qd la variable a été updater c'est pour cela qu'on utilise event.target.value comme cela c'est immédiat   
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
            <input type="text" name="searchWord" onChange={this.handleChange} onKeyDown={this.keyPress} value={this.state.searchWord} placeholder="Tapez votre recherche"/>
            <button onClick={this.search}>Rechercher</button>
            <button onClick={this.annuler}>Annuler</button>
          </div>
          <div>
            <label htmlFor="category">Categorie </label>
            <select name="category" id="category" onChange={this.handleChange} value={this.state.categoryId} defaultValue={this.state.categoryId}>
              <option key="All" value={0} >All</option>
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