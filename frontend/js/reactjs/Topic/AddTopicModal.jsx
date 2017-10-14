import React from 'react';
import { Button, Row, Col, Modal } from 'react-bootstrap';

export default class AddTopicModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
        };
    }

    onTitleChange = (event) => {
        let newTitle = event.target.value;
        this.setState({ title: newTitle });
    }

    onSubmit = () => {
        this.props.onAdd(this.state.title);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.onClose} dialogClassName="topic-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Submit a new Topic</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div id="topic-form">
                        <div className="rounded-container">
                            <span className="label">Title</span>
                            <input type="text" id="new-topic-title" onChange={this.onTitleChange}></input>
                        </div>
                        <div>
                            <Button id="submit-topic-btn" bsStyle="primary" onClick={this.onSubmit}>Add new topic</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
