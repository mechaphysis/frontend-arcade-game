// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // This helper loads the sprite for the enemies.
    // It will be reused later for loading the player sprite.
    this.sprite = 'images/enemy-bug.png';
    //Setting initial enemy location and speed:
    this.x = x;
    this.y = y;
    this.speed = speed;
    // This properties which hold the width and height of the sprite will be used by
    // the 2D collision detection algorithm later on:
    this.width = 171;
    this.height = 101;
};

Enemy.prototype.update = function(dt) {
    // Multiplying any movement by the dt parameter
    // will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed *dt;
    if (this.x >= 505) {
      this.x = -10;
    }
    //2D Collision detection algorithm based on:
    // https://developer.mozilla.org/es/docs/Games/Techniques/2D_collision_detection
    // The values that stand for 50 and 100 are corrections to the algorithm
    // in order to adapt it to work with these sprites:
      if (player.x < this.x + this.width -50 &&
          player.x + player.width > this.x &&
          player.y < this.y + this.height -100 &&
          player.height + player.y > this.y) {
        player.reset();
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now we define Player class with its methods:
// .update(), .render() and .handleInput()
var Player = function(x,y) {
  this.sprite = 'images/char-cat-girl.png';
  this.x = x;
  this.y = y;
  // This properties which hold the width and height of the sprite
  //will be used by the 2D collision detection algorithm implemented
  this.width = 101;
  this.height = 171;
};

Player.prototype.update = function() {
  this.x = this.x;
  this.y = this.y;
  // reset player when reaching water:
  if (this.y < 0) {
    player.reset();
  }
};

Player.prototype.reset = function()  {
  this.x = 200;
  this.y = 430;
}

//We reuse the same code from enemy .render() method:
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// With the handleInput method we control the movement
// of the character according to which key is pressed:
Player.prototype.handleInput = function(pressedKey) {
  if (pressedKey == 'left' && this.x >0) {
    this.x -= 30;
  } else if (pressedKey == 'right' && this.x <400) {
    this.x += 30;
  } else if (pressedKey == 'up' && this.y >=0) {
    this.y -= 30;
  } else if (pressedKey == 'down' && this.y <430) {
    this.y += 30;
  }
}

// Now we instantiate the objects:
// Place all enemy objects in an array called allEnemies
var allEnemies = [ new Enemy(0,60,300), new Enemy(0,120,150), new Enemy(0,160,200), new Enemy(-200,200,200)];
// Place the player object in a variable called player
var player = new Player(200,430);

// This listens for key presses and sends the keys to
// Player.handleInput() method.
// **Remember: each key in keyboard has a number assigned
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
