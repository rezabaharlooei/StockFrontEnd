// src/components/bootstrap-carousel.component.js
import React, {Component} from "react";

import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class MyModalComponent extends Component {

    render() {

        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide()}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            Message Detail
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row">
                            <div class="col-sm-6">
                                <li className="list-group-item">Stock: <span
                                    className="badge">{this.props.data.stock}</span></li>
                            </div>
                            <div className="col-sm-6">
                                <li className="list-group-item">Source: <span
                                    className="badge">{this.props.data.source}</span></li>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-sm-6">
                                <li className="list-group-item">Sentiment: <span
                                    className="badge">{this.props.data.sentiment}</span></li>
                            </div>
                            <div className="col-sm-6">
                                <li className="list-group-item">Like Count: <span
                                    className="badge">{this.props.data.likeCount}</span></li>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-sm-6">
                                <li className="list-group-item">Sender Username: <span
                                    className="badge">{this.props.data.senderUsername}</span></li>
                            </div>
                            <div className="col-sm-6">
                                <li className="list-group-item">Sender Name: <span
                                    className="badge">{this.props.data.senderName}</span></li>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-sm-6">
                                <li className="list-group-item">Channel Username: <span
                                    className="badge">{this.props.data.channelUsername}</span></li>
                            </div>
                            <div className="col-sm-6">
                                <li className="list-group-item">Channel Name: <span
                                    className="badge">{this.props.data.channelName}</span></li>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col-sm-6">
                                <li className="list-group-item">Message Date: <span
                                    className="badge">{this.props.data.messageDate}</span></li>
                            </div>
                            <div className="col-sm-6">
                                <li className="list-group-item">Crawl Date: <span
                                    className="badge">{this.props.data.elasticPushDate}</span></li>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-sm-12">
                                <li className="list-group-item">Content: <span
                                    className="badge">{this.props.data.content}</span></li>
                            </div>
                        </div>
                        <ul>

                        </ul>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.onClick()}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default MyModalComponent;