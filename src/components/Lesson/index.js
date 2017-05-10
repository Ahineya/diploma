import React, {PropTypes, Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import classnames from 'classnames';

import Theory from '../Theory';
import Sandbox from '../Sandbox';
import Presentation from '../Presentation';
import './style.css';

export default class Lesson extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    // state = {}

    render() {
        const {className, lesson: {categories}, lesson} = this.props;
        const props = this.props;

        const category = lesson.categories.find(c => c.id === this.props.match.params.category);
        const topic = category.topics.find(t => t.id === this.props.match.params.topic);

        return (
            <div className={classnames('lesson', className)}>
                <div className="tabs-container">
                    <div className="tabs">
                        {['theory', 'presentation', 'sandbox'].map(module => {
                            const {
                                lesson,
                                category,
                                topic,
                                module: currentModule
                            } = this.props.match.params;

                            if (module === 'presentation') {
                                return <Link className={classnames('tab', {active: module === currentModule})}
                                             to={`/lesson/${lesson}/${category}/${topic}/${module}/1`}>{module}</Link>
                            }

                            return <Link className={classnames('tab', {active: module === currentModule})}
                                         to={`/lesson/${lesson}/${category}/${topic}/${module}`}>{module}</Link>
                        })}
                    </div>
                </div>
                <div className="lesson-container">
                    <Route path={`${props.match.url}`} render={() => {

                        switch (props.match.params.module) {
                            case 'theory':
                                return <Theory source={topic.theory}/>;
                            case 'presentation':
                                return <Presentation slides={topic.presentation.slides} {...props}/>;
                            case 'sandbox':
                                return <Sandbox code={topic.sandbox.code}/>;
                        }
                    }}/>
                </div>
            </div>
        );
    }
}
