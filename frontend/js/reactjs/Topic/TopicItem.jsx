import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

export default class TopicItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { rank, item } = this.props;
        return (
            <Row className="topic-item">
                <Col xs={12}>
                    <span className="rank">{rank}</span>
                    <div className="votes">
                        <div className="arrow up"></div>
                        <div className="score">{formatNumber(item.votes)}</div>
                        <div className="arrow down"></div>
                    </div>
                    <a className="topic-thumbnail">
                        <img src={`http://loremflickr.com/320/240?random=${rank}`} height="50" width="70" />
                    </a>
                    <div className="entry">
                        <p className="title">{item.title}</p>
                    </div>
                </Col>
            </Row>
        );
    }
}

function formatNumber(num) {
    if (num >= 10000)
        return num / 1000 + 'K'
    else
        return num;
}
