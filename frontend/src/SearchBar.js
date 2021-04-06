import React from 'react';
import './SlideBar2.css';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      categoryId: 0,
      price: 0,
      categories: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this)
  }

  keyPress(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      this.search();
    }
  }

  handleChangePrice = (event) => {
    this.setState({price : event.target.value})
  }

  handleChange = (event) => {
    if (event.target.name === "category") {
      this.setState((state) =>
        state.categoryId = event.target.value)
      // console.log("CATEGORY ID");
      // console.log(this.state.categoryId);
      // this.props.searchByCategoryCallback(this.state.categoryId);
      this.props.searchByCategoryCallback(event.target.value);   // il y a une latence entre le set state et qd la variable a été updater c'est pour cela qu'on utilise event.target.value comme cela c'est immédiat   
    }
    else {
      this.setState((state) => state[event.target.name] = event.target.value)
    }
  }

  searchByPrice = () => {
    let price = this.state.price;
    this.props.searchByPrice(price);
    // console.log("PRIX");
    // console.log(price);
  }

  search = (evt) => {
    let searchWord = this.state.searchWord.trim();
    if (searchWord.length > 0) {
      this.props.searchCallback(searchWord.toLowerCase());
    }
  }

  annuler = () => {
    this.setState((state) => state.searchWord = "")
    this.props.annulerSearch();
  }

  setBubble = (range, bubble) => {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;

    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
  }

  render() {
    const allRanges = document.querySelectorAll(".range-wrap");
    allRanges.forEach(wrap => {
      const range = wrap.querySelector(".range");
      // console.log("RANGE");
      // console.log(range);
      const bubble = wrap.querySelector(".bubble");
      // console.log("BUBBLE");
      // console.log(bubble);

      range.addEventListener("input", () => {
        this.setBubble(range, bubble);
      });
      this.setBubble(range, bubble);
    });

    return (
      <React.Fragment>
        <div>
          <input type="text" name="searchWord" onChange={this.handleChange} onKeyDown={this.keyPress} value={this.state.searchWord} placeholder="Tapez votre recherche" />
          <button onClick={this.search}>Rechercher</button>
          <button onClick={this.annuler}>Annuler</button>
        </div>
        <div class="range-wrap">
          Prix<br/>
          <button onClick={this.searchByPrice}>Confirmer</button>
          <input type="range" max='1000' class="range" onChange={this.handleChangePrice}/>
          <output class="bubble"></output>
          
        </div>
        <div>
          <label htmlFor="category">Categorie </label>
          <select name="category" id="category" onChange={this.handleChange} value={this.state.categoryId} defaultValue={this.state.categoryId}>
            <option key="All" value={0} >All</option>
            {this.state.categories.map(cat => {
              // const selected = cat.id === produit.categorie.id ? {selected : "selected"} : {};
              return <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
            })}
          </select>
        </div>
      </React.Fragment>
    )
  }

  componentDidMount() {
    //get categories
    fetch(`http://localhost:8080/api/categories/public/categories`, {
      method: "GET"
    })
      .then((data) => {
        console.log("hello1")
        console.log(data);
        return data.json()
      })
      .then((res) => {
        console.log(res);
        this.setState({
          categories: res,
        }
        )
      })
  }

}