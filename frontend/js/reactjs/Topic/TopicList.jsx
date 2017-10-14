import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import TopicItem from './TopicItem';
import { HOST } from '../Constants';
import { getTopics, saveNewTopic } from '../Services';
import AddTopicModal from './AddTopicModal';

export default class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            showTopicModal: false
        };
    }

    componentWillMount() {
        this.getTopicsFromAPI();
    }

    getTopicsFromAPI = () => {
        getTopics((topics) => {
            this.setState({ topics });
        });
    }

    onAddNewTopic = (title) => {
        this.setState({ showTopicModal: false });
        saveNewTopic(title, (result) => {
            this.getTopicsFromAPI();
        });
    }

    render() {
        return (
            <Row>
                <Col xs={12} md={9}>
                    <div id="menu-area">
                        <span id="add-topic" onClick={ () => this.setState({ showTopicModal: true })}>
                            Add Topic
                        </span >
                    </div>
                    <div id="topic-list">
                        {
                            this.state.topics.map((topic,ind) =>
                                <TopicItem
                                    key={ind}
                                    item={topic}
                                    rank={ind+1}
                                    onRefreshList={this.getTopicsFromAPI} />
                            )
                        }
                    </div>
                </Col>
                <AddTopicModal
                    onAdd={this.onAddNewTopic}
                    show={this.state.showTopicModal}
                    onClose={ () => this.setState({ showTopicModal: false })} />
            </Row>
        );
    }
}
