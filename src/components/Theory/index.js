import React, {PropTypes, Component} from 'react';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';

import './style.css';

export default class Theory extends Component {
    render() {
        return (
            <div className="theory">
                <ReactMarkdown source={this.props.source}/>
            </div>
        );
    }
}