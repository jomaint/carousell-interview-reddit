import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { updateTopic } from '../Services';

export default class TopicItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Why do i not just update just this item
    onDownVote = () => {
        let { item } = this.props;
        let newVote = item.votes - 1;

        updateTopic(item._id,newVote,() => {
            this.props.onRefreshList();
        });
    }

    onUpVote = () => {
        let { item } = this.props;
        let newVote = item.votes + 1;

        updateTopic(item._id,newVote,() => {
            this.props.onRefreshList();
        });

    }

    render() {
        let { rank, item } = this.props;
        return (
            <Row className="topic-item">
                <Col xs={12}>
                    <span className="rank">{rank}</span>
                    <div className="votes">
                        <div className="arrow up" onClick={this.onUpVote}></div>
                        <div className="score">{formatNumber(item.votes)}</div>
                        <div className="arrow down" onClick={this.onDownVote}></div>
                    </div>
                    <a className="topic-thumbnail">
                        <img src={item.imgSrc} height="50" width="70" />
                    </a>
                    <div className="entry">
                        <p className="title">{item.title}</p>
                        <span className="created-date">{`Submitted ${formatDate(item.createdDate)} ago`}</span>
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

function formatDate(date) {
    let now = new Date();
    let created = new Date(date);
    // difference in seconds
    let diff = (now.getTime() - created.getTime()) / 1000;

    // less than a min
    if (diff < 60) {
        return "a while";

    // less than a hour
    } else if (diff < 3600) {
        let count = Math.floor(diff%60);
        return count + String((count>1) ? " minutes" : "minute");

    // within a day (24 hours)
    } else if (diff < 86400) {
        let count = Math.floor(diff%3600);
        return count + String((count>1) ? " hours" : "hour");

     // within a month
     } else if (diff < 2419200) {
         let count = Math.floor(diff%604800);
         return count + String((count>1) ? " weeks" : "week");

     // within a year
     } else if (diff < 29030400) {
         let count = Math.floor(diff%2419200);
         return count + String((count>1) ? " months" : "month");
     }
}
