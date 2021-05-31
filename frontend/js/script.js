/*var canvas = document.getElementById('canvas'), 
    ctx = canvas.getContext("2d"), 
    rect = canvas.getBoundingClientRect();
    width = rect.right - rect.left, 
    height = rect.bottom - rect.top, 
    numCell = 20,
    cell = Math.floor(width/numCell);

function initMatrix(){
    
    var x = new Array(numCell);
    for(var i = 0; i < numCell; i++){
        x[i] = new Array(numCell);
    } 
    return x;
}

var matrixBool = initMatrix();

function drawGrid(width, height){
    
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    
    for(var i = 0; i < numCell; i++){
        for(var j = 0; j < numCell; j++){
            
            var x = (j * cell);
            var y = (i * cell);
            
            ctx.rect(x,y,cell,cell);
            ctx.fill();
            ctx.stroke();
            matrixBool[i][j] = false;
            
        }
    }
    ctx.closePath();
}

var i = 0,
    j = 0,
    isDrawing = false;

canvas.addEventListener('mousedown', e => {
    if((e.clientX >= rect.left && e.clientX <= rect.right) && (e.clientY >= rect.top && e.clientY <= rect.bottom)){
        i = Math.floor((e.clientY/(rect.right + rect.left) * numCell) - 0.20);
        j = Math.floor((e.clientX/(rect.bottom + rect.top) * numCell) - 0.53);

        matrixBool[i][j] = true;
        isDrawing = true;
        
        canvas.addEventListener('mousemove', e => {
            
            x = Math.floor(e.offsetX / cell) * cell;
            y = Math.floor(e.offsetY / cell) * cell;

            ctx.fillStyle = "gray";
            ctx.fillRect(x-cell, y-cell, cell,cell);
            ctx.fillRect(x, y-cell, cell,cell);
            ctx.fillRect(x-cell, y, cell,cell);
            ctx.fillRect(x+cell, y+cell, cell,cell);
            ctx.fillRect(x, y+cell, cell,cell);
            ctx.fillRect(x+cell, y, cell,cell);  

            ctx.fillStyle = "black";
            ctx.fillRect(x, y, cell, cell);

        });
    }
});


canvas.addEventListener('mouseup', e => {
    if(isDrawing == true){
        isDrawing = false;
    }
})

drawGrid(width, height);*/

let arr = new Array(20*20);
arr.fill(false);

window.addEventListener("load", () => {

    let offsetX = 660;
    let offsetY = 95;
    let blockSize = 30;

    const canvas = document.querySelector("#canvas");

    canvas.height = 600;
    canvas.width = 600;

    const ctx = canvas.getContext('2d');

    createGrid();

    let painting = false;

    function startPosition(e){
        painting = true;
        ctx.fillRect( (Math.round((e.clientX - offsetX ) / blockSize) * blockSize )  , (Math.round((e.clientY - offsetY ) / blockSize) * blockSize ) ,blockSize,blockSize);
        fillArray(e);        
    }

    function createGrid(params) {
        for (let i = 0; i < 600 ; i = i+ blockSize) {
            ctx.moveTo(i,0);
            ctx.lineTo(i,600);
            ctx.stroke();
            
        }
    
        for (let j = 0; j < 600 ; j = j + blockSize) {
            ctx.moveTo(0,j);
            ctx.lineTo(600,j);
            ctx.stroke();
            
        }
        
    }

    function finishedPosition(){
        painting = false;
        ctx.beginPath();
        console.log("OOOH");
        sendJSON();

    }

    function draw(e) {
        if(!painting) return;
        console.log();
        ctx.lineCap = "round"

        console.log(e.clientX, e.clientY)
        ctx.fillRect( (Math.round((e.clientX - offsetX ) / blockSize) * blockSize )  , (Math.round((e.clientY - offsetY ) / blockSize) * blockSize ) ,blockSize,blockSize);

        fillArray(e);
    }

    function clearGrid(){
        ctx.clearRect(0 , 0 , 2600, 2600);
        console.log(arr)
        createGrid();
        arr.fill(false)
    }



    document.getElementById("button").addEventListener("click", function() {
        clearGrid();
      }); 

    function fillArray(e) {

        let i = Math.round((e.clientX - offsetX ) / blockSize)
        let j = Math.round((e.clientY - offsetY ) / blockSize)
        console.log("i = " + i + "j = " + j) 
        arr[i +(j * 20)] = true;
        console.log(i +(j * blockSize))
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);

});


async function sendJSON(){

    var payload = {
        "name": "string",
        "description": "aaaaa",
        "price": 5,
        "tax": 5
    }

    var data = new FormData();
    data.append("json", JSON.stringify(payload) );


    await fetch("http://127.0.0.1:8000/items/", 
    {   method : "POST",
        body : data,
        origin : "tchadInfinix"
            
    })
    .then(function(res){ return res.json(); })


}