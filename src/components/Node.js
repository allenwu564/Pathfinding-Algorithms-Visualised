import React, {Component} from "react";
import { Col } from 'react-grid-system';
import "../styles/Node.css";

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x, 
            y: props.y,
            type: props.type,
        }
    }

    render() {
        return <Col className={this.state.type} sm={0} id={this.state.x + " " + this.state.y}>.</Col>
    }
}

export default Node;