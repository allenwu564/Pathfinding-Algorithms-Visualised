
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showPath(start, end, pred) {
    let curr = end;
    let path = []
    while (pred[curr] !== start) {
        path.push(pred[curr])
        curr = pred[curr]
    }
    path.reverse()
    for (let x in path) {
        let node = document.getElementById(path[x]);
        node.className = "path"
        await sleep(1)
    }
    
}

async function BFS(start, end) {
    let found = false;
    let queue = [start]
    let seen = [start]
    let pred = {}
    while (queue.length > 0 && !found) {
        let n = queue.shift()
        const x = parseInt(n.split(" ")[0])
        const y = parseInt(n.split(" ")[1])
        const adjacent = [x.toString() + " " + (y - 1).toString(), (x + 1).toString() + " " + y.toString(), x.toString() + " " + (y + 1).toString(), (x - 1).toString() + " " + y.toString()]
        let i;
        for (i in adjacent) {
            if (adjacent[i] === end) { 
                pred[adjacent[i]] = n
                found = true
                break
            }
            let node = document.getElementById(adjacent[i])
            if (node !== null) {
                if ((node.className === "default" || node.className === "weight") && !seen.includes(node.id)) {
                    seen.push(node.id)
                    if (node.className === "default") {
                        node.className = "seen"
                    }
                    pred[adjacent[i]] = n
                    queue.push(node.id)
                    await sleep(1)
                }
            }
        }
    }
    if (found) {
        showPath(start, end, pred)
    }
}



async function DFS(start, end) {
    let found = false;
    let stack = [start]
    let seen = [start]
    let pred = {}
    while (stack.length > 0 && !found) {
        let n = stack.pop()
        const x = parseInt(n.split(" ")[0])
        const y = parseInt(n.split(" ")[1])
        const adjacent = [x.toString() + " " + (y - 1).toString(), (x + 1).toString() + " " + y.toString(), x.toString() + " " + (y + 1).toString(), (x - 1).toString() + " " + y.toString()]
        let i;
        for (i in adjacent) {
            if (adjacent[i] === end) { 
                pred[adjacent[i]] = n
                found = true
                break
            }
            let node = document.getElementById(adjacent[i])
            if (node !== null) {
                if ((node.className === "default" || node.className === "weight") && !seen.includes(node.id)) {
                    seen.push(node.id)
                    if (node.className === "default") {
                        node.className = "seen"
                    }
                    pred[adjacent[i]] = n
                    stack.push(node.id)
                    await sleep(1)
                }
            }
        }
    }
    if (found) {
        showPath(start, end, pred)
    }
}

async function Dijkstra(startId, endId, defWeight, weight) {
    const nodeWeights = {"default": parseInt(defWeight),
        "seen": parseInt(defWeight),
        "start": 0,
        "end": parseInt(defWeight),
        "weight": parseInt(weight),
    }
    let seen = []
    let pred = {}
    let distance = {}
    let found = false;

    let x;
    let defNodes = document.querySelectorAll(".default");
    for (x = 0; x < defNodes.length; x++) {
        distance[defNodes[x].id] = Number.MAX_VALUE
    }
    let weightNodes = document.querySelectorAll(".weight");
    for (x = 0; x < weightNodes.length; x++) {
        distance[weightNodes[x].id] = Number.MAX_VALUE
    }
    let seenNodes = document.querySelectorAll(".seen");
    for (x = 0; x < seenNodes.length; x++) {
        distance[seenNodes[x].id] = Number.MAX_VALUE
    }
    let path = document.querySelectorAll(".path");
    for (x = 0; x < path.length; x++) {
        distance[path[x].id] = Number.MAX_VALUE
    }

    distance[startId] = 0
    distance[endId] = Number.MAX_VALUE
    let node = getShortestNode(distance, seen)
    while (node) {
        const x = parseInt(node.split(" ")[0])
        const y = parseInt(node.split(" ")[1])
        const adjacent = [x.toString() + " " + (y - 1).toString(), (x + 1).toString() + " " + y.toString(), x.toString() + " " + (y + 1).toString(), (x - 1).toString() + " " + y.toString()]
        for (let child in adjacent) {
            let childNode = document.getElementById(adjacent[child])
            if (childNode === null || childNode.id === startId) {continue}
            if (adjacent[child] === endId) {found = true}
            let temp = distance[node] + nodeWeights[childNode.className]
            if (distance[childNode.id] > temp) {
                distance[childNode.id] = temp
                pred[childNode.id] = node
            }
        }
        let currNode = document.getElementById(node)
        if (currNode.className === "default") {
            currNode.className = "seen"
        }
        seen.push(node)
        await sleep(1)
        node = getShortestNode(distance, seen)
    }
    if (found) {
        showPath(startId, endId, pred)
    }
}

function getShortestNode(distance, seen) {
    let shortest = null
    for (let node in distance) {
        let curr = shortest === null || distance[node] < distance[shortest]
        if (curr && !seen.includes(node)) {
            shortest = node
        }
    }
    return shortest
}

async function Astar(startId, endId, defWeight, weight) {
    let open = []
    let closed = []
    let distance = {}
    let fDistance = {}
    let pred = {}

    const nodeWeights = {"default": parseInt(defWeight),
        "seen": parseInt(defWeight),
        "start": 0,
        "end": parseInt(defWeight),
        "weight": parseInt(weight),
    }

    distance[startId] = 0
    fDistance[startId] = 0 + getHDistance(startId, endId, nodeWeights)
    let curr = startId
    while (curr !== endId && curr !== undefined) {
        console.log(curr)
        const x = parseInt(curr.split(" ")[0])
        const y = parseInt(curr.split(" ")[1])
        const adjacent = [x.toString() + " " + (y - 1).toString(), (x + 1).toString() + " " + y.toString(), x.toString() + " " + (y + 1).toString(), (x - 1).toString() + " " + y.toString()]
        for (let child in adjacent) {
            let childNode = document.getElementById(adjacent[child])
            if (childNode === null || childNode.className === "wall") {continue}
            if (!open.includes(adjacent[child]) && !closed.includes(adjacent[child])) {
                open.push(adjacent[child])
            }
            let temp = distance[curr] + nodeWeights[childNode.className]
            if (!(adjacent[child] in distance) || distance[childNode.id] > temp) {
                distance[adjacent[child]] = temp
            }
            let f = distance[adjacent[child]] + getHDistance(adjacent[child], endId, nodeWeights)
            if (!(adjacent[child] in fDistance) || f < fDistance[adjacent[child]]) {
                fDistance[adjacent[child]] = f
                pred[adjacent[child]] = curr
            }
        }
        let currNode = document.getElementById(curr)
        if (currNode.className === "default") {
            currNode.className = "seen"
        }
        await sleep(1)
        closed.push(curr)

        let smallest = open[0]
        for (let x in open) {
            if (fDistance[open[x]] < fDistance[smallest]) {
                smallest = open[x]
            }
        }
        const index = open.indexOf(smallest)
        open.splice(index, 1)

        curr = smallest
    }
    if (curr !== undefined) {
        curr = endId;
        showPath(startId, endId, pred)
    }
}

function getHDistance(start, end, nodeWeights) {
    const startX = parseInt(start.split(" ")[0])
    const startY = parseInt(start.split(" ")[1])
    const endX = parseInt(end.split(" ")[0])
    const endY = parseInt(end.split(" ")[1])
    let x = Math.abs(startX - endX)
    let y = Math.abs(startY - endY)
    let node = document.getElementById(start)
    return x + y + nodeWeights[node.className]
}

export {BFS, DFS, Dijkstra, Astar};