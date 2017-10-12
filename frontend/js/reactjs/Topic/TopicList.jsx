import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import TopicItem from './TopicItem';

export default class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [
                {
                    title: "At National Science Challenge 2017",
                    votes: 299
                },
                {
                    title: "Just 10 rivers, 8 in Asia alone, may be responsible for dumping almost 4 million tonnes of plastic into the seas every year, accounting for 88-95% of all of plastic pollution in the ocean. Cutting plastic pollution in the 10 rivers could reduce plastic pollution in the ocean by as much as 45%.",
                    votes: 13600
                },
                {
                    title: "The owners of the 'Breaking Bad' house put up a fence to stop people throwing pizzas onto their roof",
                    votes: 123
                }
            ]
        };
    }

    render() {
        return (
            <Row>
                <Col xs={12} md={9}>
                    <div id="topic-list">
                        {
                            this.state.topics.map((topic,ind) =>
                                <TopicItem
                                    key={ind}
                                    item={topic}
                                    rank={ind} />
                            )
                        }
                    </div>
                </Col>
            </Row>
        );
    }
}
