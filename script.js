var canvas = document.getElementById("canvas"); //Get the canvas Element
var cx = canvas.getContext('2d');
//Define the cavnas's height and width 
var screen_gap = 350;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth - screen_gap; // The whole window width minus the margin we used to center the board

//Game's Variables (Global)
var board = []; // Array of arraies to define the columns and the rows of the game
var cols = 7; // Number of the columns in the game
var rows = 6; // Number of the rows in the game
var cell_COLOR = '#0033cc'; // Blue
var cell_WIDTH = 100; // each cell width
var cell_HEIGHT = 93; // each cell height
var cell_X = 0; // Define the cell's X
var cell_Y = 0; // Define the cell's Y
var player1_color = 'red';
var player2_color = 'yellow';
var whosplay=1; // which player is playing now?
var turnOver = false; // variable - if the turn is over
var whoswin = 0; // 1 = player1 wins, 2= player 2 wins
var gameover = false;

function Cell(x,y){
	this.x = x;
	this.y = y;
	this.width = cell_WIDTH;
	this.height = cell_HEIGHT;
	this.color = cell_COLOR;
	this.radius = 0.45*this.width; // The radius of the white circle at the middle of the cell - 45% of the cell
	this.circle_color = 'white';
	this.circle_X = this.x + this.width/2; // The circle's X is at the center of the cell
	this.circle_Y = this.y + this.height/2; // Same as the X - the Y is at the center of the cell
	this.ocupied = false; // if the position s ocupied	

	this.draw = function () {
		cx.fillStyle = this.color; // color of each cell
		cx.fillRect(this.x,this.y,this.width,this.height); // filling the cell's rects.
		cx.beginPath();
		cx.fillStyle=this.circle_color; // Circle's color
		cx.arc(this.circle_X,this.circle_Y,this.radius,0,Math.PI*2); //Drawing the white circle
		cx.fill();
	}
}
//function to draw the board
function CreateGame(){
	for(var i=0;i<rows;i++){ // for loop to run on the rows
		board[i] = []; // Add to each row a different array
		for(var j=0; j<cols; j++){ // for loop to run each cell in the row (the columns)
			board[i][j] = new Cell(cell_X + (j*cell_WIDTH),cell_Y + (i*cell_HEIGHT)); // Adding new cell Object to each cell on the array
			board[i][j].draw(); // Activating the draw function to each cell
		}
	}
}
// function  checking if any player wins the game
function WhosWinning(){
	// 3  double for loops -
	// the first will check horizontal 4 in a row 
	// the second loop will check vertical 4 in a row
	// the last one will check slant 4 in a row
	for (var i = 0; i < board.length-1; i++) {
		for (var j = 0; j < board[i].length-3; j++) { // we prevent the loop to slip out the array
			if(board[i][j].circle_color == player1_color && board[i][j+1].circle_color == player1_color	&&
			 board[i][j+2].circle_color == player1_color && board[i][j+3].circle_color == player1_color)
			{
				whoswin = 1;
				gameover = true;
				DrawWin(whoswin);
			}
			else if(board[i][j].circle_color == player2_color && board[i][j+1].circle_color == player2_color &&
				board[i][j+2].circle_color == player2_color && board[i][j+3].circle_color == player2_color)
			{
				whoswin = 2;
				gameover = true;
				DrawWin(whoswin);
			}
		}
	}

	for (var i = 0; i < board.length-3; i++) {
		for (var j = 0; j < board[i].length-1; j++) {
			if(board[i][j].circle_color == player1_color && board[i+1][j].circle_color == player1_color && 
				board[i+2][j].circle_color == player1_color && board[i+3][j].circle_color == player1_color)
			{
					whoswin = 1;
					gameover = true;
					DrawWin(whoswin);
			}
			else if(board[i][j].circle_color == player2_color && board[i+1][j].circle_color == player2_color && 
				board[i+2][j].circle_color == player2_color && board[i+3][j].circle_color == player2_color)
			{
					whoswin = 2;
					gameover = true;				
					DrawWin(whoswin);
			}
		}
	}

	for (var i = 0; i < board.length-3; i++) {
		for (var j = 0; j < board[i].length-3; j++) {
			if(board[i][j].circle_color == player1_color && board[i+1][j+1].circle_color == player1_color && 
				board[i+2][j+2].circle_color == player1_color && board[i+3][j+3].circle_color == player1_color)
			{
					whoswin = 1;
					gameover = true;
					DrawWin(whoswin);
			}
			else if(board[i][j].circle_color == player2_color && board[i+1][j+1].circle_color == player2_color && 
				board[i+2][j+2].circle_color == player2_color && board[i+3][j+3].circle_color == player2_color)
			{
					whoswin = 2;
					gameover = true;				
					DrawWin(whoswin);
			}
		}
	}

}
//function to draw the winning Title
function DrawWin(whoswin){
	var drawX = cell_X + cell_WIDTH;
	var drawY = cell_Y + cell_HEIGHT;
	cx.fillStyle = 'transparent';
	cx.strokeStyle = 'black';
	cx.lineWidth = 10;
	cx.fillRect(drawX,drawY,cell_WIDTH*5,cell_HEIGHT*3);
	cx.strokeRect(drawX,drawY,cell_WIDTH*5,cell_HEIGHT*3);
	cx.fillStyle = 'black';
	cx.font = "80px Arial";
	cx.fillText("Player "+whoswin+" Wins!",drawX + cell_WIDTH/2,drawY+cell_HEIGHT*1.5);
}

CreateGame();

window.addEventListener("click", function(event){ // Adding a click Event
	let click_x = event.clientX; // this is the X position of our curosr while clicking
	let click_y = event.clientY; // this is the Y position of our cursoe while clicking
	let click_col = Math.floor((click_x - screen_gap)/cell_WIDTH); // calculate the column
	let click_row = Math.floor(click_y/cell_HEIGHT); // calculate the row
	// console.log("col:" +click_col);
	// console.log("row:" +click_row);
	// console.log(board[click_row][click_col]);
	if(gameover == false)
		for(var i = board.length-1; i>=0; i--){
			if(board[i][click_col].ocupied == false && turnOver == false){
				if(whosplay == 1){ // then we check which player's turn is it
					board[i][click_col].circle_color = player1_color;// changing the matching color
					board[i][click_col].draw(); //we draw again the cell
					board[i][click_col].ocupied = true; // the cell is now ocupied
					whosplay = 2; // now it's player 2 turn
					turnOver = true; // the current turn is over
					WhosWinning(); // We running a function to check if any player won
				}
				else{
					board[i][click_col].circle_color = player2_color; // changing the matching color
					board[i][click_col].draw(); //we draw again the cell
					board[i][click_col].ocupied = true; // the cell is now ocupied
					whosplay = 1;// player 1's turn
					turnOver = true; // the current turn is over
					WhosWinning(); // We running a function to check if any player won
				}
			}
		}
		turnOver = false; // we are starting a new turn
})
