// some global variables
var initialPlayerPosX = 202;
var initialPlayerPosY = 404;
var numPoints = 0;
var timeCount = 0;
var numEnemies = 5;

// 2 global functions choosing random position from array
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

// Enemies pseudoclass
var Enemy = function() {
    this.x = -101;
    this.y = randomPosY();
    this.speed = Enemy.randomSpeed();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// function returns random speed or minimum speed
Enemy.randomSpeed = function() {
	var rSpeed = Math.random() * 130;
	if (rSpeed < 40) {
		return 40;
	}
	else {
		return rSpeed;
	}
}

// Update the enemy's position and check for collision
Enemy.prototype.update = function(dt) {

	// if enemy moves off screen x position is reset to beginning
	// y position and speed are randomly changed
    if (this.x > 505) {
        this.x = -101;
        this.y = randomPosY();
        this.speed = Enemy.randomSpeed();
    }
    // update the enemy's position
    // dt parameter ensure the game runs at the same speed for all computers
    else {
    this.x = this.x + (this.speed * dt);
    }

    // check for collision of player and enemy
    if (((this.x + 75) > player.x && this.x < player.x && this.y === player.y) ||
    	((this.x + 75) > (player.x + 75) && this.x < (player.x + 75) && (this.y === player.y)))  {
        player.resetPlayer();
    }

};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player pseudoclass
var Player = function() {
    this.resetPlayer();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.resetPlayer = function() {
	this.x = initialPlayerPosX;
    this.y = initialPlayerPosY;
};

// draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// update player's position
Player.prototype.update = function() {

	// reset to initial position when player reaches water and increment point number
    if (this.y <= 0) {
        this.resetPlayer();
        numPoints = numPoints + 1;
    }
};

// moves player acording to pressed key
// prevents player from moving off screen
Player.prototype.handleInput = function(key) {
    if (key === "left" && this.x >= 101) {
        this.x = this.x - 101;
    }
    else if (key === "right" && this.x < 404) {
        this.x = this.x + 101;
    }
    else if (key === "up" && this.y >= 0) {
        this.y = this.y - 83;
    }
    else if (key === "down" && this.y < 404) {
        this.y = this.y + 83;
    }
};

// listen for key presses and send keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Points pseudoclass
var Points = function() {
    };

// draw points on the screen
// define text style
Points.prototype.render = function() {
    ctx.font = "24px sans-serif";
    ctx.textBaseline = "hanging";
    ctx.fillText("Points:", 10, 10);
    ctx.fillText(this.value, 100, 10);
   };

// update points
Points.prototype.update = function() {
    this.value = numPoints;
    };

// Gem pseudoclass
var Gem = function() {
	this.x = randomPosX();
	this.y = randomPosY();
    this.sprite = 'images/Gem Orange.png';
    this.visible = false;
    this.collected = false;
};

// draw gem on the screen if at least 2 points and this.collected is false
Gem.prototype.render = function() {
    if (numPoints > 1 && this.collected === false) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.visible = true;
    }
};

// check collision of player and gem
// after interval causes gem to render again at other position
Gem.prototype.update = function() {
    // collision with gem, updates points, sets this.collected to true so gem is not rendered
    if (this.x === player.x && this.y === player.y && this.visible === true) {
    	numPoints = numPoints + 2;
    	this.collected = true;
    	this.visible = false;
    	}

    // after interval gem renders again at another random position
    if (this.collected === true) {
    	timeCount = timeCount + 1;
    	if (timeCount === 500) {
    		this.collected = false;
    		timeCount = 0;
    		this.y = randomPosY();
    		this.x = randomPosX();
    	}
	}
};

// instantiate objects
// Place all enemy objects in array allEnemies
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
// 	gemCollected = false;
// };

// setTimeout(newGem, 3000);