'use strict';

// define constants
var HORIZONTAL_BASE_UNIT = 101;
var VERTICAL_BASE_UNIT = 83;

// define global variables
var initialPlayerPosX = 2 * HORIZONTAL_BASE_UNIT;
var initialPlayerPosY = 4 * HORIZONTAL_BASE_UNIT;
var timeCount = 0;

/**
* @description Chooses random y position from array
* @returns {number} random y position
*/
var randomPosY = function() {
    var arrayPosY = [72, 155, 238];
    // from: https://gist.github.com/kerimdzhanov/7529623
    // calculates random number within range of array index
    var i = Math.floor(Math.random() * (2 + 1));
    return arrayPosY[i];
};

/**
* @description Chooses random x position from array
* @returns {number} random x position
*/
var randomPosX = function() {
    var arrayPosX = [0, 1 * HORIZONTAL_BASE_UNIT, 2 * HORIZONTAL_BASE_UNIT, 3 * HORIZONTAL_BASE_UNIT, 4 * HORIZONTAL_BASE_UNIT];
    // from: https://gist.github.com/kerimdzhanov/7529623
    // calculates random number within range of array index
    var i = Math.floor(Math.random() * (4 + 1));
    return arrayPosX[i];
};

/**
* @description Represents an enemy
* @constructor
*/
var Enemy = function() {
    this.x = -HORIZONTAL_BASE_UNIT;
    this.y = randomPosY();
    this.speed = this.randomSpeed();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/**
* @description generates random speed, or minimum speed if speed < 50
* @returns {number} random speed or minimum speed
*/
Enemy.prototype.randomSpeed = function() {
    var rSpeed = Math.random() * 300;
    if (rSpeed < 50) {
        return 50;
    } else {
        return rSpeed;
    }
};

/**
* @description Updates the enemy's position and checks for collision
* @param {number} dt - ensures the game runs at the same speed for all computers
*/
Enemy.prototype.update = function(dt) {

    // if enemy moves off screen x position is reset to beginning
    // y position and speed are randomly changed
    if (this.x > 5 * HORIZONTAL_BASE_UNIT) {
        this.x = -HORIZONTAL_BASE_UNIT;
        this.y = randomPosY();
        this.speed = this.randomSpeed();
    }
    // update the enemy's position
    else {
        this.x = this.x + (this.speed * dt);
    }

    // check for collision of player and enemy, reset player and subtract 1 point
    if (((this.x + 75) > player.x && this.x < player.x && this.y === player.y) ||
        ((this.x + 75) > (player.x + 75) && this.x < (player.x + 75) && (this.y === player.y))) {
        player.resetPlayer();
        points.value = points.value - 1;
    }

};

/**
* @description Draws the enemy on the screen
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Represents player
* @constructor
*/
var Player = function() {
    this.resetPlayer();
    this.sprite = 'images/char-boy.png';
};

/**
* @description Resets player
*/
Player.prototype.resetPlayer = function() {
    this.x = initialPlayerPosX;
    this.y = initialPlayerPosY;
};

/**
* @description Draws the player on the screen
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Resets player to initial position when player reaches water and increment point by 1
*/
Player.prototype.update = function() {

    if (this.y <= 0) {
        this.resetPlayer();
        points.value = points.value + 1;
    }
};

/**
* @description Moves player acording to pressed key, prevents player from moving off screen
* @param {string} key - pressed key code
*/
Player.prototype.handleInput = function(key) {
    if (key === "left" && this.x >= HORIZONTAL_BASE_UNIT) {
        this.x = this.x - HORIZONTAL_BASE_UNIT;
    } else if (key === "right" && this.x < 4 * HORIZONTAL_BASE_UNIT) {
        this.x = this.x + HORIZONTAL_BASE_UNIT;
    } else if (key === "up" && this.y >= 0) {
        this.y = this.y - VERTICAL_BASE_UNIT;
    } else if (key === "down" && this.y < 4 * HORIZONTAL_BASE_UNIT) {
        this.y = this.y + VERTICAL_BASE_UNIT;
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

/**
* @description Represents points
* @constructor
*/
var Points = function() {
    this.value = 0;
};

/**
* @description Draws points on the screen, defines text style
*/
Points.prototype.render = function() {
    ctx.font = "24px sans-serif";
    ctx.textBaseline = "hanging";
    ctx.fillText("Points:", 10, 10);
    ctx.fillText(this.value, 100, 10);
};

/**
* @description Represents gem
* @constructor
*/
var Gem = function() {
    this.x = randomPosX();
    this.y = randomPosY();
    this.sprite = 'images/Gem Orange.png';
    this.visible = false;
    this.collected = false;
};

/**
* @description Draws gem on the screen if at least 2 points and this.collected is false
*/
Gem.prototype.render = function() {
    if (points.value > 1 && this.collected === false) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        this.visible = true;
    }
};

/**
* @description Checks collision of player and gem, after interval causes gem to render again at other position
*/
Gem.prototype.update = function() {
    // collision with gem, updates points, sets this.collected to true so gem is not rendered
    if (this.x === player.x && this.y === player.y && this.visible === true) {
        points.value = points.value + 2;
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
for (var i = 0; i < 5; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();

// Place the Points object in a variable called points
var points = new Points();

// Place the Gem object in a variable called gem
var gem = new Gem();