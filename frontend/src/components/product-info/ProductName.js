import React from 'react';
import './styles/product-name.scss';

export default class ProductName extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="product-id">
                <h1 className='title text-center'>{this.props.name}</h1>
            </div>
        )
    }
}