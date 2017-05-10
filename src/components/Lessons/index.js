import React, {PropTypes, Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import classnames from 'classnames';

import app from '../../data/data.json';
import Lesson from '../Lesson';

import './style.css';

export default class About extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    // state = {}

    render() {
        const {className, ...props} = this.props;

        return (
            <div className={classnames('lessons', className)} {...props}>
                <div className="sidebar">
                    <Route path={`${props.match.url}/:lesson`} render={(props) => {

                        const lesson = app.lessons.find(l => l.id === props.match.params.lesson);

                        return <ul className="sidebar-contents">
                            <li className="sidebar-back">
                                <Link to="/">To lessons list</Link>
                            </li>
                            {lesson.categories.map((category, i) => {
                                return <li key={i}>
                                    {category.name}
                                    <ul>
                                        {category.topics.map((topic, i) => {
                                            return <li key={i}>
                                                <Link
                                                    to={`${props.match.url}/${category.id}/${topic.id}/theory`}>{topic.name}</Link>
                                            </li>
                                        })}
                                    </ul>
                                </li>
                            })}
                        </ul>
                    }}/>
                </div>

                <Route path={`${props.match.url}/:lesson/:category/:topic/:module`}
                       render={props => {
                           const lesson = app.lessons.find(l => l.id === props.match.params.lesson);
                           return <Lesson lesson={lesson} {...props}/>
                       }}/>
            </div>
        );
    }
}
