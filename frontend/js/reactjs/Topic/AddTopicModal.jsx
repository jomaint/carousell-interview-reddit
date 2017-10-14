import React from 'react';
import { Button, Row, Col, Modal } from 'react-bootstrap';

export default class AddTopicModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            error: ""
        };
    }

    onTitleChange = (event) => {
        let newTitle = event.target.value;
        if (newTitle.length <= 255) {
            this.setState({
                title: newTitle,
                error: ""
            });
        } else {
            this.setState({ error: "Title has a maxiumum length of 250 characters" });
        }
    }

    onSubmit = () => {
        this.props.onAdd(this.state.title);
        this.state.title = "";
    }

    onClose = () => {
        this.setState({
            title: "",
            error: ""
        });
        this.props.onClose();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.onClose} dialogClassName="topic-modal">
                <Modal.Header closeButton>
                    <Modal.Title>New Topic</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div id="topic-form">
                        <div className="rounded-container">
                            <span className="label">Title</span>
                            <textarea
                                id="new-topic-title"
                                type="text"
                                rows="2"
                                value={this.state.title}
                                onChange={this.onTitleChange} autoFocus />
                        </div>
                        {
                            /* error msg */
                            this.state.error && <span className="error-msg">{this.state.error}</span>
                        }
                        <div>
                            <Button id="submit-topic-btn" bsStyle="primary" onClick={this.onSubmit}>Add new topic</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
