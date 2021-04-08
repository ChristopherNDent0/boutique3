import React from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HeaderElements from "./HeaderElements";

import '../header/styles/header.scss'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="flex-grid">
                <HeaderElements/>
            </div>
        );
    }
}

