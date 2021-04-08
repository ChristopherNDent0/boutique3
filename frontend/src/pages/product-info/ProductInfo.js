import React from 'react';

import './styles/product-info.scss'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Placeholder from './assets/ipad-air-select-202009.jpeg'
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    productTitle: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "paleTurquoise"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "aliceBlue"
    },
    paper2: {
        justifyContent: "alignRight",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "lightGreen"
    },
});



class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            product: {
                productId: "",
                praductName: "",
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

    render() {
        const { classes, theme} = this.props;
        return (
            <React.Fragment>
                <Grid container className={theme.root} >

                    <Grid className={classes.paper} sm={3} lg={3}>
                        <img className="image-style" src={Placeholder} alt={""}/>
                    </Grid>

                    <Grid className={classes.productTitle} spacing={9} lg={9}>
                        <text className="header">Buy </text>
                        <text className="header">{this.state.product.productName}</text>

                        <Grid container className={theme.root}>
                            <text>{this.state.product.description}</text>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className={theme.root}>

                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper2}>xs=12 sm=6</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper2}>xs=12 sm=6</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper2}>xs=6 sm=3</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper2}>xs=6 sm=3</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper2}>xs=6 sm=3</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper2}>xs=6 sm=3</Paper>
                    </Grid>
                </Grid>

                {/*<div className="flex-grid">*/}
                {/*    <div className="col">*/}
                {/*        <ProductName name={this.state.product.productName}/>*/}
                {/*    </div>*/}
                {/*    <div className="col" >*/}
                {/*        /!*<ProductId name={this.state.product.productId}/>*!/*/}
                {/*        <div className="p-description">*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <br/>*/}
                {/*    /!*<div className="p-description">*!/*/}
                {/*    /!*    <table>*!/*/}
                {/*    /!*        <td>Stock : {this.state.product.stock}</td>*!/*/}
                {/*    /!*        <td>urlImage : {this.state.product.urlImage}</td>*!/*/}
                {/*    /!*        <td>Categorie Id : {this.state.product.category.categoryId}</td>*!/*/}
                {/*    /!*        <td>Categorie : {this.state.product.category.categoryName}</td>*!/*/}
                {/*    /!*        <td>Prix : {this.state.product.price}</td>*!/*/}
                {/*    /!*    </table>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*</div>*/}
                {/*<div id="message_produit">*/}
                {/*    {this.state.message}*/}
                {/*</div>*/}
            </React.Fragment>
        )
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/products/" + id, { // serveur qui tourne sur le port 3500
            method: "GET",
        })
            .then((response) => {
                if (response.ok) {
                    response.json()  // une fois que la requête a abouti .then s'execute  // transforme en json
                        .then(data => {  // res c'est le résultat du serveur
                            this.setState({product: data})
                        })
                } else {
                    if (response.status === 400) {
                        this.setState({message: "Ce produit n'existe pas"});
                    } else if (response.status === 404) {
                        this.setState({message: "le id n'existe pas"});
                    }
                }
            });
    }
}

export default withStyles(styles, {withTheme: true})(ProductInfo);