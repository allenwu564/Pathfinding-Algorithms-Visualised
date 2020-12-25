import React, {Component} from "react";
import {Button, Modal, Col} from 'react-bootstrap';
import "../styles/HelpModal.css"

class HelpModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState(prevState => ({modalVisible: !prevState.modalVisible}))
    }

    render() {
        return (
            <div>
                <Modal show={this.state.modalVisible} onHide={this.toggleModal} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Help</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>                            
                            <div className="nodeRow">
                                <div className="row">
                                    <div className="node">
                                        <Col className={"defaultNode"} sm={0}>.</Col>
                                    </div>
                                    Default unvisited node
                                </div>
                                
                                <div className="row">
                                    <div className="node">
                                        <Col className={"startNode"} sm={0}>.</Col>
                                    </div>
                                    The starting node
                                </div >
                                <div className="row">
                                    <div className="node">
                                        <Col className={"endNode"} sm={0}>.</Col>
                                    </div>
                                    The destination node
                                </div>
                                <div className="row">
                                    <div className="node">
                                        <Col className={"pathNode"} sm={0}>.</Col>
                                    </div>
                                    Path nodes
                                </div>
                            </div>
                            <div className="nodeRow">
                                <div className="row">
                                    <div className="node">
                                        <Col className={"seenNode"} sm={0}>.</Col>
                                    </div>
                                    Visited nodes
                                </div>
                                <div className="row">
                                    <div className="node">
                                        <Col className={"wallNode"} sm={0}>.</Col>
                                    </div>
                                    Wall nodes
                                </div>
                                <div className="row">
                                    <div className="node">
                                        <Col className={"weightNode"} sm={0}>.</Col>
                                    </div>
                                    Weighted nodes
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="helpText">
                            Use left click to place wall nodes, middle click to place weighted nodes and right click to reset nodes to default.
                        </div>
                    </Modal.Footer>
                    <Modal.Footer>
                        <Button onClick={this.toggleModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="info" className="helpButton" onClick={this.toggleModal}>Help</Button>
            </div>
        )
    }
}

export default HelpModal