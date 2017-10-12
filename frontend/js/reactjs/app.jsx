import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Row, Col } from 'react-bootstrap'   ;
import TopicList from './Topic/TopicList';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div id="creddit-header">
                    <h1>creddit</h1>
                </div>
                { this.props.children }
            </div>
        );
    }
}

render(
    <Router history={browserHistory}>
        <Route path="/" component={Main} >
            <IndexRoute component={TopicList} />
        </Route>
    </Router>,
document.getElementById('content'));
