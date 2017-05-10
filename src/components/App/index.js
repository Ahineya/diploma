import React, {Component} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

import app from '../../data/data.json';

import './style.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            app
        }
    }

    render() {
        const {className, ...props} = this.props;

        return (
            <div className={classnames("app", className)} {...props}>
                {this.state.app.lessons.map((lesson, i) => {
                    return <div className="lesson card" key={i}>
                        <h2>{lesson.name}</h2>
                        <p>{lesson.description}</p>
                        <div className="action-bar">
                            <Link to={`/lesson/${lesson.id}`}>
                                To the lesson
                            </Link>
                        </div>
                    </div>
                })}
            </div>
        );
    }
}

export default App;
