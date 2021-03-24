import React from 'react';

export default class ProduitForm extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        const edit = !!this.props.match.params.id;
        return (
            <form>
                <div style={edit ? {} : { display: 'none' }}>
                    id : <input name="id"
                        readOnly
                        value={this.props.match.params.id}
                         />
                </div>
            </form>
        )
    }
}