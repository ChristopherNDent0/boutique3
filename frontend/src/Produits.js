import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import ProduitList from './ProduitList';
import FicheProduit from './FicheProduit';
import ProduitForm from './ProduitForm';
import ProductDisplay from './ProductDisplay';
import ProductForm from './ProductForm';



export default class Produits extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.match);
        return (
            <React.Fragment>

                <Switch>
                    {/* <Route path={this.props.match.path + '/create'} component={ProduitForm}/>
                    <Route path={this.props.match.path + '/edit/:id'} component={ProduitForm} />
                    <Route path={this.props.match.path + '/:id'} component={FicheProduit} />
                    <Route exact path={this.props.match.path + '/'} component={ProductDisplay} /> */}
                </Switch>

            </React.Fragment>
        );
    }
}