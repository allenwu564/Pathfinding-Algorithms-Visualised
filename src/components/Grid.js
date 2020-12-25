import React, {Component} from "react";
import { Row } from 'react-grid-system';
import Node from "./Node.js"

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startMove: false,
            endMove: false,
            middleDown: false,
            leftDown: false,
            rightDown: false,
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        this.resetGrid()
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
        let seen = document.querySelectorAll(".seen");
        for (x = 0; x < seen.length; x++) {
            seen[x].className = "default"
        }
        let path = document.querySelectorAll(".path");
        for (x = 0; x < path.length; x++) {
            path[x].className = "default"
        }
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

    resetMouse(e) {
        this.setState({startMove: false,
            endMove: false,
            middleDown: false,
            leftDown: false,
            rightDown: false,
        })
    }

    setMouse(e) {
        let grid = document.getElementById("grid")
        console.log(grid.className)
        if (grid.className !== "false") {
            if (e.button === 0) {
                if (e.target.className === "start") {
                    this.setState(prevState => ({startMove: !prevState.startMove}))
                }
                else if (e.target.className === "end") {
                    this.setState(prevState => ({endMove: !prevState.endMove}))
                }
                else {
                    this.setState(prevState => ({leftDown: !prevState.leftDown}))
                    this.convertToWall(e.target.id)
                }
            }
            else if (e.button === 1) {
                this.setState(prevState => ({middleDown: !prevState.middleDown}))
                this.convertToWeight(e.target.id)
            }
            else if (e.button === 2) {
                this.setState(prevState => ({rightDown: !prevState.rightDown}))
                this.convertToDefault(e.target.id)
            }
        }
    }

    hoverMouse(e) {
        let grid = document.getElementById("grid")
        if (grid.className !== "false") {
            if (this.state.leftDown) {
                this.convertToWall(e.target.id)
            }
            else if (this.state.rightDown) {
                this.convertToDefault(e.target.id)
            }
            else if (this.state.middleDown) {
                this.convertToWeight(e.target.id)
            }
            else if (this.state.startMove) {
                this.convertToStart(e.target.id)
            }
            else if (this.state.endMove) {
                this.convertToEnd(e.target.id)
            }
        }
    }

    convertToStart(id) {
        let prevStart = document.getElementsByClassName("start")[0]
        let newStart = document.getElementById(id)
        prevStart.className = "default"
        newStart.className = "start"
    }

    convertToEnd(id) {
        let prevEnd = document.getElementsByClassName("end")[0]
        let newEnd = document.getElementById(id)
        prevEnd.className = "default"
        newEnd.className = "end"
    }

    convertToWall(id) {
        let node = document.getElementById(id)
        if (node.className === "default" || node.className === "seen" || node.className === "path") {
            node.className = "wall"
        }
    }

    convertToWeight(id) {
        let node = document.getElementById(id)
        if (node.className === "default" || node.className === "seen" || node.className === "path") {
            node.className = "weight"
        }
    }

    convertToDefault(id) {
        let node = document.getElementById(id)
        if (node.className === "wall" || node.className === "weight") {
            node.className = "default"
        }
    }

    checkType(x, y) {
        let type = "default"
        if (x === parseInt(this.state.width/33/3) && y === parseInt(this.state.height/31/2)) {
            type = "start"
        }
        else if (x === parseInt(this.state.width*2/33/3) && y === parseInt(this.state.height/31/2)) {
            type = "end"
        }
        return type
    }

    render() {
        let col = []
        let y = 0;
        while (y < this.state.height/30) {
            let row = []
            let x;
            for (x = 0; x < this.state.width/32; x++) {
                let type = this.checkType(x, y);
                row.push(<Node x={x} y={y} type={type} key={x + " " + y}></Node>)
            }
            col.push(<Row debug key={y}>{row.map(e => e)}</Row>)
            y++;
        }
        return (
            <div id="grid" style={{marginLeft: "15px"}} onContextMenu={e => e.preventDefault()} onMouseLeave={e => this.resetMouse(e)} onMouseDown={e => this.setMouse(e)} onMouseUp={e => this.setMouse(e)} onMouseOver={e => this.hoverMouse(e)}>
                {col.map(e => e)}
            </div>
        )
    }
}

export default Grid;