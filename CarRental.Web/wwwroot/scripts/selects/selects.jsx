import React from 'react';
import { connect } from 'react-redux';
import EntitySelect from '../selects/selects.jsx';

class Selects extends React.Component {

    componentDidMount() {
        this.props.getPosts(0);
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        <td><EntitySelect route='countries'/></td>
                    </tr>
                </table>
            </div>
        );
    }
};

let mapProps = (state) => {
    return {
        posts: state.data,
        error: state.error
    }
}

let mapDispatch = (dispatch) => {
    return {
        getPosts: (index, tags) => dispatch(getPosts(index, tags))
    }
}

export default connect(mapProps, mapDispatch)(Selects)