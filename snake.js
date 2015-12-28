var draw = function(snakeToDraw, apple){
	var drawableSnake = {color: "green", pixels: snakeToDraw};
	var drawableApple = {color: "red", pixels: [apple]};
	var drawableObjects = [drawableSnake, drawableApple];
	CHUNK.draw(drawableObjects);
}


var moveSegment = function(segment){
	switch(segment.direction) {
    case "down":
        return {top:segment.top + 1, left: segment.left}
        break;
    case "up":
        return {top:segment.top - 1, left: segment.left}
        break;
    case "right":
        return {top: segment.top, left: segment.left + 1}
        break;
    case "left":
        return {top:segment.top, left: segment.left - 1}
        break;
    default:
        return segment;
	}	
}

//goal is to return segment closer to head...will assign last segment to next
var segmentFurtherDown = function(index, snake){
		return snake[index -1 ] || snake[index];
}

//rewrite of moveSname using map, pass in array and it's objects
var moveSnake = function(snake){
	return snake.map(function(oldSegment, segmentIndex){ //each iterable in the snake array is implied here
	//the map function will take an old object and create a new object
	var newSegment = moveSegment(oldSegment);//obj.value;
   	newSegment.direction = segmentFurtherDown(segmentIndex, snake).direction;
   	return newSegment;
	});
}


var growSnake = function(snake){
	var indexOfLastSegment = snake.length - 1;
	var lastSegment = snake[indexOfLastSegment];
	snake.push({top:lastSegment.top, left:lastSegment.left});//always need to push an object into the array
	return snake;
}

var ate = function(snake, otherThing){
	var head = snake[0];
	return CHUNK.detectCollisionBetween([head], otherThing);

}

//this function recreates snake and moves snake 
var advanceGame = function(){
	var newSnake = moveSnake(snake); //bw creating and drawing object anew, we check
	
	if(ate(newSnake, snake)){
		CHUNK.endGame();
		CHUNK.flashMessage("Whoops you ate yourself!");
	}
	if(ate(newSnake, [apple])){
		newSnake = growSnake(newSnake);
		apple = CHUNK.randomLocation();
	}
	if(ate(newSnake, CHUNK.gameBoundaries())){
		CHUNK.endGame();
		CHUNK.flashMessage("Woops! You hit a wall.");
	}
	snake = newSnake;
	draw(snake, apple);
}


var changeDirection = function(direction){
	snake[0].direction = direction;
}

var apple = CHUNK.randomLocation();				
//initial value of snake - each Object/hash is a segment, we call props from
var snake = [{ top: 1, left: 0, direction: "down" }, { top: 0, left: 0, direction: "down"} ];


CHUNK.executeNTimesPerSecond(advanceGame, 1);
CHUNK.onArrowKey(changeDirection);



//creates a location/position, which is a hashmap, that indicates the pixel that should be filled
//var snake = [{top:2, left:2}, {top:1, left:2}, {top:0, left:2}];//more positions in the object == more drawn pixelss
//var wall = [{top:4, left:0}, {top:4, left:1}, {top:4, left:2}, {top:4, left:3} ];


//creates an object with two properties - a color, and a location
//var drawableSnake = {color: "green", pixels: snake};
//var drawableWall = {color: "gray", pixels: wall};

//creates an array of objects, which the method draw is expecting
//var drawableObjects = [drawableSnake, drawableWall];

//passes in the array of objects per spec
//CHUNK.draw(drawableObjects);


	
/*var moveSnake = function(snake){//passing in original object which is array of hashes
	var newSnake = []; //creates new array
	snake.forEach(function(oldSegment){ //will iterate through the old array
		//we're assigning "segment" to mean each hash chunk on the fly
		var newSegment = moveSegment(oldSegment);//{top:oldSegment.top + 1, left:oldSegment.left};
		newSegment.direction = oldSegment.direction; //Object.direction - gets re-assigned
		newSnake.push(newSegment); //gets added to the array 
	});
	return newSnake;
}	

//rewrite moveSnake using a for or while loop
var moveSnake3 = function(snake){
	var newSnake = [];
	for(var i=0; i<snake.length; i++){
		var currSeg = snake[i];
		var newSeg = moveSegment(currSeg);
		newSeg.direction = currSeg.direction;
		newSnake.push(newSeg);
	}
	return newSnake;
}	*/