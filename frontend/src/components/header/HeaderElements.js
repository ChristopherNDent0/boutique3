import React from 'react';
import Button from '@material-ui/core/Button';

import './styles/header.scss'
import {Link} from "react-router-dom";
import HeaderIcon from "./HeaderIcon";

export default class HeaderElements extends React.Component {

    render(){
        return (
            <div>
                <HeaderIcon/>
                <Button variant="text" color="primary" href="/" to="/products">
                    <Link className="" to="/products">Desktop</Link>
                </Button>
                <Button variant="text" color="primary" href="#outlined-buttons">
                    <Link className="" to="/categories">Mobile</Link>
                </Button>
                <Button variant="text" color="primary" href="#outlined-buttons">
                    <Link className="" to="/categories">Gaming</Link>
                </Button>
                <Button variant="text" color="primary" href="#outlined-buttons">
                    <Link className="" to="/categories">Accessories</Link>
                </Button>

            </div>
        );

    }


    }
