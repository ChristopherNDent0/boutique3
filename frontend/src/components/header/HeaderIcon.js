import React from 'react';

import Cord from './assets/cord.jpeg';
import {Link} from "react-router-dom";

export default class HeaderIcon extends React.Component{

    render() {
        return(
            <img className="company-logo" src={Cord}  width="50" height="50" alt="broke" onClick={event => {
                <Link to="/products">Produits</Link>
            }}/>
        )
    }
}