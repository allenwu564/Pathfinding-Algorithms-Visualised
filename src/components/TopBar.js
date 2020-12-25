import React, {Component} from "react";
import {Button, Form, Navbar, Nav, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/TopBar.css"
import {BFS, DFS, Dijkstra, Astar} from './algos/Algorithms.js'
import HelpModal from './HelpModal.js'

class TopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            running: true,
        }
        this.startAlgorithm = this.startAlgorithm.bind(this)
        this.resetGrid = this.resetGrid.bind(this)
    }

    resetPath() {
        let x
        let seen = document.querySelectorAll(".seen");
        for (x = 0; x < seen.length; x++) {
            seen[x].className = "default"
        }
        let path = document.querySelectorAll(".path");
        for (x = 0; x < path.length; x++) {
            path[x].className = "default"
        }
    }

    resetGrid() {
        let walls = document.querySelectorAll(".wall");
        let x;
        for (x = 0; x < walls.length; x++) {
            walls[x].className = "default"
        }
        let weight = document.querySelectorAll(".weight");
        for (x = 0; x < weight.length; x++) {
            weight[x].className = "default"
        }
        this.resetPath()
        let start = document.getElementsByClassName("start")[0]
        if (start !== undefined) {
            start.className = "default"
        }
        let end = document.getElementsByClassName("end")[0]
        if (end !== undefined) {
            end.className = "default"
        }
        const startX = parseInt(window.innerWidth/33/3)
        const startY = parseInt(window.innerHeight/31/2)
        const startId = startX.toString() + " " + startY.toString()
        const endX = parseInt(window.innerWidth*2/33/3)
        const endY = parseInt(window.innerHeight/31/2)
        const endId = endX.toString() + " " + endY.toString()
        let newStart = document.getElementById(startId)
        newStart.className = "start"
        let newEnd = document.getElementById(endId)
        newEnd.className = "end"
    }

    toggleRunning() {
        let grid = document.getElementById("grid")
        grid.className = !this.state.running
        this.setState(prevState => ({running: !prevState.running}))
    }

    async startAlgorithm(e) {
        e.preventDefault()

        this.toggleRunning()

        let x;
        let seen = document.querySelectorAll(".seen");
        for (x = 0; x < seen.length; x++) {
            seen[x].className = "default"
        }
        let path = document.querySelectorAll(".path");
        for (x = 0; x < path.length; x++) {
            path[x].className = "default"
        }

        let start = document.getElementsByClassName("start")[0].id
        let end = document.getElementsByClassName("end")[0].id
        const defWeight = e.target[1].value
        const weight = e.target[2].value
        switch (e.target[0].value) {
            case("Breadth First Search"):
                await BFS(start, end)
                this.toggleRunning()
                break
            case("Depth First Search"):
                await DFS(start, end)
                this.toggleRunning()
                break
            case("Dijkstra's Algorithm"):
                await Dijkstra(start, end, defWeight, weight)
                this.toggleRunning()
                break
            case("A* Algorithm"):
                await Astar(start, end, defWeight, weight)
                this.toggleRunning()
                break
            default:
                this.toggleRunning()
                break
        }
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Pathfinding Algorithms Visualised</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Form className="algorithm" onSubmit={this.startAlgorithm} inline>
                    <Nav className="formAlgos">
                        <Nav.Item>
                            <Form.Group className="form">
                                <Form.Control as="select" >
                                    <option>Breadth First Search</option>
                                    <option>Depth First Search</option>
                                    <option>Dijkstra's Algorithm</option>
                                    <option>A* Algorithm</option>
                                </Form.Control>
                            </Form.Group>
                        </Nav.Item>
                        <Nav.Item>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Weight of Default Nodes</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </Form.Control>
                            </InputGroup>
                        </Nav.Item>
                        <Nav.Item>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Weight of Weighted Nodes</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                </Form.Control>
                            </InputGroup>
                        </Nav.Item>
                    </Nav>
                    <div className="buttons">
                        <Button type="submit" variant="success" className="startButton" disabled={!this.state.running}>Start</Button>
                        <Button variant="warning" className="resetButton" onClick={this.resetPath} disabled={!this.state.running}>Reset Path</Button>
                        <Button variant="warning" className="resetButton" onClick={this.resetGrid} disabled={!this.state.running}>Reset Grid</Button>
                        <HelpModal></HelpModal>
                    </div>
                </Form>
            </Navbar>        
        )
    }
}

export default TopBar