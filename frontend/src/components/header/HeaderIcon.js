import React from 'react';

import Cord from './assets/cord.jpeg';
import {Link} from "react-router-dom";

export default class HeaderIcon extends React.Component{

    render() {
        return(
            <img className="company-logo" src={Cord}  alt="image broke" onClick={event => {
                <Link to="/products">Produits</Link>
            }}/>
        )
    }
}