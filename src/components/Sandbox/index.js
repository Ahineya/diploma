import React, {PropTypes, Component} from 'react';
import CodeMirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');
import classnames from 'classnames';

import './style.css';

const options = {
    lineNumbers: true
};

export default class Sandbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            code: props.code || '// JS goes here',
            tests: [],
            error: '',
            fullscreen: false
        };

        this.visual = null;
        this.tests = [];
    }

    componentWillReceiveProps(newProps) {
        console.log('oldCode, newCode', newProps.code === this.props.code);
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode
        });
    };

    assert = (statement, textStatement) => {
        this.tests.push(<span>{statement ? <span className="correct">{textStatement}</span> :
            <span className="error">{textStatement}</span>}</span>);
    };

    log = (textStatement) => {
        this.tests.push(`${textStatement}`);
    };

    createElement = (element) => {
        const elem = document.createElement(element);
        this.visual.appendChild(elem);

        return elem;
    };

    run = () => {

        this.setState({
            error: ''
        }, () => {
            this.visual.innerHTML = '';
            this.tests = [];

            try {
                const f = new Function('sandbox', this.state.code);
                f(this);
            } catch (e) {
                console.log(e);

                this.setState({
                    error: e.message
                });
            }

            this.setState({
                tests: this.tests
            });
        });
    };

    fullscreen = (isFull) => {
        this.setState({
            fullscreen: isFull
        });
    };

    render() {
        return (
            <div className="sandbox">

                <div className="sandbox-top">
                    <div className="sandbox-results">
                        <div className="sandbox-results-buttons">
                            <button className="run" onClick={this.run}>Run</button>
                            <button className="run" onClick={() => this.fullscreen(true)}>Fullscreen</button>
                        </div>
                        <div ref={ref => this.visual = ref} className="sandbox-visual"/>
                    </div>
                    <div className={classnames('codemirror', {"fullscreen": this.state.fullscreen})}>
                        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options}/>
                        <button className="btn-fullscreen" onClick={() => this.fullscreen(false)}>Collapse</button>
                    </div>
                </div>
                <div className="sandbox-bottom">
                    <ul>
                        {this.state.error && <li className="error">{this.state.error}</li>}
                        {this.state.tests.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}