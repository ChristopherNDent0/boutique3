import React from 'react';

export default class ProduitForm extends React.Component {
    constructor(props) {
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
                price: "",
                estActif: false
            },
            categories: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    cancel = (evt) => {
        evt.preventDefault();
        this.props.history.push("/produits")
    }
    save = (evt) => {
        if (this.state.produit.category.categoryId == null) {
            this.setState(this.state.produit.category = this.state.categories[0])
        }
        evt.preventDefault();
        this.props.saveCallback(this.state.produit);
        console.log(this.state.produit);
    }
    handleChange = (event) => {
        if (event.target.name === "category") {
            this.setState((state) =>
                state.produit.category[`categoryId`] = event.target.value)
        }
        if (event.target.name === "estActif") {
            this.setState((state) =>
                state.produit.estActif = !state.produit.estActif)
        }
        else {
            this.setState((state) => state.produit[event.target.name] = event.target.value)
        }
    }
    render() {
        const edit = !!this.props.match.params.id;
        const produit = this.state.produit || {};
        return (
            <form>
                <div style={edit ? {} : { display: 'none' }}>
                    id : <input name="id"
                        readOnly
                        value={produit.productId ? produit.productId : 0} />
                </div>
                <div>
                    nom : <input name="productName"
                        value={produit.productName} onChange={this.handleChange} />
                </div>
                <div>
                    Stock : <input name="stock" type="number" value={this.state.produit.stock} onChange={this.handleChange} />
                </div>
                <div>
                    Description : <input name="description" type="text" value={this.state.produit.description} onChange={this.handleChange} />
                </div>
                <div>
                    urlImage : <input name="urlImage" type="text" value={this.state.produit.urlImage} onChange={this.handleChange} />
                </div>
                <div>
                    Prix : <input name="price" type="number" value={this.state.produit.price} onChange={this.handleChange} />
                </div>
                <div>
                    <label for="est_actif">Actif</label>
                    <input type="checkbox" id="est_actif" name="estActif" checked={this.state.produit.estActif} value={this.state.produit.estActif} onClick={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="category">Categorie</label>
                    <select name="category" id="category" onChange={this.handleChange} value={this.state.produit.category.categoryId} defaultValue={this.state.produit.category.categoryId}>
                        {this.state.categories.map(cat => {
                            // const selected = cat.id === produit.categorie.id ? {selected : "selected"} : {};
                            return <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                        })}
                    </select>
                </div>
                <div>
                    <button onClick={(event) => { if (window.confirm('Are you sure you wish to modify this item?')) {this.save(event)}}}>{edit ? "Modifier" : "Créer"}</button>
                    <button onClick={this.cancel}>Annuler</button>
                </div>

            </form>
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

        const id = this.props.match.params.id;
        if (id) {
            fetch(`http://localhost:8080/api/public/produits/${id}`, {
                method: "GET"
            })
                .then((data) => {
                    console.log("hello")
                    console.log(data);
                    return data.json()
                })
                .then((res) => {
                    console.log(res);
                    this.setState({
                        produit: res
                    }
                    )
                    console.log("PRODUIT ACTIF ?");
                    console.log(this.state.produit);
                })
        }
    }
}