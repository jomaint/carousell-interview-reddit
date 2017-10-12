import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Row, Col } from 'react-bootstrap'   ;
import Landing from './Landing/Landing';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row id="creddit-header">
                    <Col xs={12}>
                        <h1>creddit</h1>
                    </Col>
                </Row>
                { this.props.children }
            </div>
        );
    }
}

render(
    <Router history={browserHistory}>
        <Route path="/" component={Main} >
            <IndexRoute component={Landing} />
        </Route>
    </Router>,
document.getElementById('content'));
