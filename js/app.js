// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // This helper loads the sprite for the enemies.
    // It will be reused later for loading the player sprite.
    this.sprite = 'images/enemy-bug.png';
    //Setting initial enemy location and speed:
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed *dt;
    if (this.x >= 505) {
      this.x = -10;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

Player.prototype.update = function() {
  this.x = this.x;
  this.y = this.y;
  // reset player when reaching water:
  if (this.y <= 0) {
    this.x = 200;
    this.y = 400;
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(pressedKey) {
  if (pressedKey == 'left' && this.x >0) {
    this.x -= 100;
  } else if (pressedKey == 'right' && this.x <400) {
    this.x += 100;
  } else if (pressedKey == 'up' && this.y >0) {
    this.y -= 100;
  } else if (pressedKey == 'down' && this.y <400) {
    this.y += 100;
  }
}

// Now we instantiate the objects:
// Place all enemy objects in an array called allEnemies
var allEnemies = [ new Enemy(0,60,300), new Enemy(0,120,150), new Enemy(0,160,200)];
// Place the player object in a variable called player
var player = new Player(200,400);

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
