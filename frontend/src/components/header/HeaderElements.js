import React from 'react';
import Button from '@material-ui/core/Button';

import './styles/header.scss'
import {Link} from "react-router-dom";
import HeaderIcon from "./HeaderIcon";
import {Icon} from "@material-ui/core";
import {Class, HomeOutlined, PhoneAndroid, ShoppingBasketSharp} from "@material-ui/icons";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

export default class HeaderElements extends React.Component {

    render(){
        return (
            <div>
                <div>
                    <HeaderIcon/>
                    <Button startIcon={<DesktopWindowsIcon/>} variant="text" color="primary" href="/" to="/products">
                        <Link className="" to="/produits">Desktop</Link>
                    </Button>
                    <Button startIcon={<PhoneAndroid/>} variant="text" color="primary" href="#outlined-buttons">
                        <Link className="" to="/categories">Mobile</Link>
                    </Button>
                    <Button startIcon={<Class/>} variant="text" color="primary" >
                        <Link className="" to="/categories">Gaming</Link>
                    </Button>
                    <Button variant="text" color="primary" >
                        <Link className="" to="/categories">Accessories</Link>
                    </Button>
                    <Button startIcon={<HomeOutlined/>} color="primary ">
                        <Link classname="" to="/login">Account</Link>
                    </Button>
                    <Button startIcon={<ShoppingBasketSharp/>} color="primary" href="#">
                        <Link className="" to="/cart">Cart</Link>
                    </Button>
                </div>
            </div>
        );

    }
}
