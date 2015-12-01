// Enemies our player must avoid
var posX = 202;
var posY = 404;
var numPoints = 0;
var col = false;
var visible = false;
var numEnemies = 5;

var randomPosY = function() {
	var enemyPosY = [72,155,238];
    // from: https://gist.github.com/kerimdzhanov/7529623
    var i = Math.floor(Math.random() * (2 + 1));
    return enemyPosY[i];
};

var randomPosX = function() {
	var gemPosX = [0,101,202,303,404];
    		// from: https://gist.github.com/kerimdzhanov/7529623
    		var i = Math.floor(Math.random() * (4 + 1));
    		return gemPosX[i];
    	};


var Enemy = function() {
    this.x = -101;
    this.y = randomPosY();
    this.speed = Enemy.randomSpeed();
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.randomSpeed = function() {
	var rSpeed = Math.random() * 130;
	if (rSpeed < 40) {
		return 40;
	}
	else {
		return rSpeed;
	}
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = -101;
        this.y = randomPosY();
        this.speed = Enemy.randomSpeed();
    }
    else {
    this.x = this.x + (this.speed * dt);
    }

    // collision with enemy
    if (((this.x + 75) > player.x && this.x < player.x && this.y === player.y) || ((this.x + 75) > (player.x + 75) && this.x < (player.x + 75) && (this.y === player.y)))  {
        posX = 202;
        posY = 404;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class



var Player = function() {
    x = posX;
    y = posY;
    this.sprite = 'images/char-boy.png';
};
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    this.x = posX;
    this.y = posY;

// reset to initial position when reaching water
    if (this.y <= 0) {
        posX = 202;
        posY = 404;
        numPoints = numPoints + 1;
    }
};

Player.prototype.handleInput = function(key) {
    if (key === "left" && posX >= 101) {
        posX = posX - 101;
    }
    else if (key === "right" && posX < 404) {
        posX = posX + 101;
    }
    else if (key === "up" && posY >= 0) {
        posY = posY - 83;
    }
    else if (key === "down" && posY < 404) {
        posY = posY + 83;
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Points class
var Points = function() {
    };

Points.prototype.render = function() {
    ctx.font = "24px sans-serif";
    ctx.textBaseline = "hanging";
    ctx.fillText("Points:", 10, 10);
    ctx.fillText(this.value, 90, 10);
   };

Points.prototype.update = function() {
    this.value = numPoints;
    };

// Gem class
var Gem = function() {
	this.x = randomPosX();
	this.y = randomPosY();
    this.sprite = 'images/Gem Orange.png';
};

Gem.prototype.render = function() {
    if (numPoints > 1 && col === false) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    visible = true;
}
};

var z = 0;

Gem.prototype.update = function() {

    // collision with gem
    if (this.x === player.x && this.y === player.y && visible === true) {
    	numPoints = numPoints + 2;
    	// make gem disappear
    	col = true;
    	visible = false;
    }

    if (col === true) {
    	z = z + 1;
    	if (z === 500) {
    		col = false;
    		z = 0;
    		this.y = randomPosY();
    		this.x = randomPosX();
    	}
	}

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < numEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();

// Place the Points object in a variable called points
var points = new Points();

// Place the Gem object in a variable called gem
var gem = new Gem();


// var newGem = function() {
// 	col = false;
// };

// setTimeout(newGem, 3000);