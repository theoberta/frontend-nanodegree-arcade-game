// Enemies our player must avoid

var Enemy = function() {
    this.x = -101;
    var enemyPosY = [63,146,229];
    // from: https://gist.github.com/kerimdzhanov/7529623
    var i = Math.floor(Math.random() * (2 + 1));

    this.y = enemyPosY[i];
    this.speed = Math.random() * 130;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    if (this.x > 505) {
        this.x = -101;
    }
    else {
    this.x = this.x + (this.speed * dt);
    }

    // collision with enemy
    if ((this.x + 50) > player.x && this.x < player.x && (this.y + 50) > player.y && this.y < player.y) {
        posX = 202;
        posY = 404;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var posX = 202;
var posY = 404;

var Player = function() {
    this.x = posX;
    this.y = posY;
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 5; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();

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
