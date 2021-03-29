import React from 'react';

export default class ProductId extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="product-name">
                <h1 className='title text-center'>{this.props.name}</h1>
            </div>
        )
    }
}