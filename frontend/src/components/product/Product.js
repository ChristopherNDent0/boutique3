import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import ProduitList from '../product-list/ProduitList';
import ProductDetails from '../product-details/ProductDetails';
import ProduitForm from '../product-form/ProduitForm';
import ProductDisplay from '../../api/ProductDisplay';



export default class Produits extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.match);
        return (
            <React.Fragment>

                <Switch>
                    <Route path={this.props.match.path + '/edit/:id'} component={ProduitForm} />
                    <Route path={this.props.match.path + '/:id'} component={ProductDetails} />
                    <Route exact path={this.props.match.path + '/'} component={ProductDisplay} />
                </Switch>

            </React.Fragment>
        );
    }
}