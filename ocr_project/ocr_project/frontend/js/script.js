var canvas = document.getElementById('canvas'), 
    ctx = canvas.getContext("2d"), 
    rect = canvas.getBoundingClientRect();
    width = rect.right - rect.left, 
    height = rect.bottom - rect.top, 
    numCell = 20,
    cell = Math.floor(width/numCell),
    arrayInt = new Array(20*20).fill(0);


var value = 0,
    mode;

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
            
        }
    }
    ctx.closePath();
}

function clearGrid(){

    ctx.clearRect(0 , 0 , 2600, 2600);
    drawGrid(width, height);

}

function getInputValue(){
    value = parseInt(document.getElementById("value").value);
}

var i = 0,
    j = 0,
    isDrawing = false;

canvas.addEventListener('mousedown', e => {
    if((e.clientX >= rect.left && e.clientX <= rect.right) && (e.clientY >= rect.top && e.clientY <= rect.bottom)){
        i = Math.floor((e.clientY/(rect.right + rect.left) * numCell) - 0.20);
        j = Math.floor((e.clientX/(rect.bottom + rect.top) * numCell) - 0.53);

        isDrawing = true;
        
        canvas.addEventListener('mousemove', e => {
            if(isDrawing == true){
                x = Math.floor(e.offsetX / cell) * cell;
                y = Math.floor(e.offsetY / cell) * cell;
                
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, cell, cell);

                arrayInt[Math.floor(x/cell) + Math.floor(y/cell) * 20] = 1;

            }
        });
    }
});

canvas.addEventListener('mouseup', e => {
    if(isDrawing == true){
        isDrawing = false;
    }
})

document.getElementById("buttonTrain").addEventListener("click", function() {
    sendToTrain();
    clearGrid();
  }); 

document.getElementById("buttonRecognize").addEventListener("click", function() {
    sendToGuess();
    clearGrid();
})

drawGrid(width, height);

function argMax(array) {
    return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

//TODO: stocker dans un JSON
/*
async function sendToFit(){

    var payload = {
        value: value,
        tab: arrayInt
    }

    var data = new FormData();
    data.append("json", JSON.stringify(payload) );


    await fetch("http://127.0.0.1:8000/items/", 
    {   
        method : "POST",
        body : data,            
    })
    .then(function(response){ 
        return response.json(); })
}
*/
async function sendToGuess(){

    await fetch("http://127.0.0.1:8000/guess/", 
    {   
        method : "POST",
        body: JSON.stringify({"content": arrayInt})

    })
    .then(async function(response){
        response.json().then( result => {

            var color = result.map(x => 'rgba(75,192,192,0.4)');

            color[argMax(result)] = 'red';

            new Chart(document.getElementById("output"), {
                type: 'horizontalBar',
                data: {
                  labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                  datasets: [
                    {
                      label: "Prediction",
                      backgroundColor: color,
                      data: result
                    }
                  ]
                },
                options: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            steps: 0.1,
                            stepValue: 5,
                            max: 1
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Output'
                }
            });            
        });
    })
}

async function sendToTrain(){

    var payload = {
        value: value,
        tab: arrayInt
    }

    await fetch("http://127.0.0.1:8000/train/", 
    {   
        method : "POST",
        body: JSON.stringify(payload)

    })
    .then(function(res){ return res.json(); })
}