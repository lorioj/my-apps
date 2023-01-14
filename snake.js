//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//food
var foodX;
var foodY;

//move
var velocityX = 0;
var velocityY = 0;

//snake body
var snakeBody = [];


var gameOver = false;



window.onload = function(){
    board = document.getElementById("board");
 
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);

    // update();
    // setInterval(update, 1000/10); // 100 millisecondsy
    setInterval(update, 1000/10);

}

function update(){
    if(gameOver){
        return;
    }

    //board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //eat food
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    //move the body with the head
    for(let i = snakeBody.length - 1; i >= 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    //head
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
     //adding snake body
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

   //game over condition
   if(snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize){
        gameOver = true;
        alert("Game Over");
   }

   //if head touch/bump with the body
   for(let i = 0; i < snakeBody.length; i++){
    if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
        gameOver = true;
        alert("Game Over");
    }
   }
   

}


function placeFood(){
    //Math.random return (0 - 1) * cols * blockSize
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}


function changeDirection(e){
    //!= number this means not allowed to opposite direction
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }


    if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }

    if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}