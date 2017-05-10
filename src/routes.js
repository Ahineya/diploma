import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import App from './components/App';
import Lessons from './components/Lessons';
import NotFound from './components/NotFound';

const Routes = (props) => (
    <Router {...props}>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/lesson" component={Lessons}/>
        </div>
    </Router>
);

export default Routes;
