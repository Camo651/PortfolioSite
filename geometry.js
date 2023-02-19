const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let nodeCount = 75;
const nodeVelocity = .3;
let nodeConnectRadius = 100;
const nodeClearPercent = 0.1;
const nodeColor = '#2c3b47';
const backgroundColor = '#0c1b27ff';
let nodePositions = [];
let nodeVelocities = [];
const canvasBorderExtra = 25;

ctx.globalAlpha = 0.5;

function init(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    width = canvas.width;
    height = canvas.height;

    nodeCount = Math.floor(width / 25);

    nodePositions = [];
    nodeVelocities = [];

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    for(let i = 0; i < nodeCount; i++){
        nodePositions.push(
            [Math.random() * (width + canvasBorderExtra * 2) - canvasBorderExtra, Math.random() * (height + canvasBorderExtra * 2) - canvasBorderExtra]
        );
        nodeVelocities.push(
            [Math.random() * nodeVelocity * 2 - nodeVelocity, Math.random() * nodeVelocity * 2 - nodeVelocity]
        );
    }

}

init();
update();

function update(){

    if(width != canvas.width || height != canvas.height){
        init();
    }

    for(let i = 0; i < nodeCount; i++){
        nodePositions[i][0] += nodeVelocities[i][0];
        nodePositions[i][1] += nodeVelocities[i][1];

        //wrap around
        if(nodePositions[i][0] < -canvasBorderExtra){
            nodePositions[i][0] = width;
        }
        if(nodePositions[i][0] > width + canvasBorderExtra){
            nodePositions[i][0] = 0;
        }
        if(nodePositions[i][1] < -canvasBorderExtra){
            nodePositions[i][1] = height;
        }
        if(nodePositions[i][1] > height + canvasBorderExtra){
            nodePositions[i][1] = 0;
        }

    }

    if(window.innerWidth != width || window.innerHeight != height){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    draw();

    requestAnimationFrame(update);
}

function draw(){
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = nodeColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    for(let i = 0; i < nodeCount; i++){
        let nodes = getNodesInRadius(nodePositions[i][0], nodePositions[i][1], nodeConnectRadius);
        for(let j = 0; j < nodes.length; j++){

            ctx.moveTo(nodePositions[i][0], nodePositions[i][1]);
            ctx.lineTo(nodePositions[nodes[j][0]][0], nodePositions[nodes[j][0]][1]);
        }
    }
    ctx.stroke();
}

function getNodesInRadius(x, y, radius){
    let nodes = [];
    for(let i = 0; i < nodeCount; i++){
        let dx = nodePositions[i][0] - x;
        let dy = nodePositions[i][1] - y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < radius){
            nodes.push([i, distance]);
        }
    }
    return nodes;
}
