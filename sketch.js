var canvas;
var drawing = [];
var database;
var dbDrawing = [];
var button;

function setup(){
    createCanvas(400,400);
    database = firebase.database();
    button = createButton("Reset");
    button.position(350,350);
    button.mousePressed(clearDrawing());

    
}

function draw(){
    background(255);
    noFill();
    readData();
    beginShape();
    for(var i = 0;i<dbDrawing.length;i ++){
        vertex(dbDrawing[i].x,dbDrawing[i].y);
        endShape();
    }

    
}

function mouseDragged(){
    var position = {x:mouseX,y:mouseY};
    drawing.push(position);
    database.ref('drawing').set({
        'd': drawing
    })
    
}

function readData(){
    database.ref('drawing/').on("value",(data)=>{
        dbDrawing = data.val().d;
    })
}

function clearDrawing(){
    dbDrawing = [];
    database.ref("drawing").remove();
}