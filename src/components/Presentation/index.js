import React, {PropTypes, Component} from 'react';
import ReactMarkdown from 'react-markdown';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import classnames from 'classnames';

import './style.css';

export default class Presentation extends Component {
    render() {

        const p = this.props;

        return (
            <div className="presentation">
                <div className="slide">

                    <Route path={`${p.match.url}/:page`}
                           render={props => {
                               const slide = p.slides[props.match.params.page - 1];

                               switch (slide.type) {
                                   case "text":
                                       return <ReactMarkdown source={slide.content}/>;
                                   case "image":
                                       return <img src={`data:image/png;base64,${slide.content}`} alt={`slide ${props.match.params.page - 1}`}/>;
                               }
                           }}/>


                </div>
                <Route path={`${p.match.url}/:page`}
                       render={props => {
                           const buttons = [];
                           const page = parseInt(props.match.params.page, 10);
                           if (page !== 1) {
                               buttons.push(<Link className="prev" to={`${page - 1}`}>Prev</Link>);
                           }
                           if (page < p.slides.length) {
                               buttons.push(<Link className="next" to={`${page + 1}`}>Next</Link>);
                           }
                           return <div className="pager">{buttons.map(b => b)}</div>;
                       }}/>
            </div>
        );
    }
}