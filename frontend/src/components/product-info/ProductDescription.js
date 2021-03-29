import React from 'react';

export default class ProductDescription extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="product-detail">
                <h3 className="title">Description</h3>
                <text className="ul">{this.props.name}</text>
            </div>
        )
    }
}