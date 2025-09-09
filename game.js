class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Game state
        this.keys = {};
        this.gravity = 0.5;
        this.friction = 0.8;
        
        // Initialize players
        this.fireboy = new Player(100, 400, '#ff4444', 'fireboy');
        this.watergirl = new Player(150, 400, '#4444ff', 'watergirl');
        
        // Level elements
        this.platforms = this.createLevel1();
        this.goals = [
            { x: 700, y: 350, width: 30, height: 50, type: 'fire' },
            { x: 750, y: 350, width: 30, height: 50, type: 'water' }
        ];
        
        this.setupControls();
        this.gameLoop();
    }
    
    createLevel1() {
        return [
            // Ground platforms
            { x: 0, y: 550, width: 800, height: 50, type: 'ground' },
            { x: 200, y: 450, width: 150, height: 20, type: 'ground' },
            { x: 450, y: 350, width: 150, height: 20, type: 'ground' },
            { x: 650, y: 400, width: 150, height: 20, type: 'ground' },
            
            // Hazards
            { x: 300, y: 530, width: 100, height: 20, type: 'lava' },
            { x: 500, y: 530, width: 100, height: 20, type: 'water' },
        ];
    }
    
    setupControls() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }
    
    update() {
        // Update players
        this.fireboy.update(this.keys, this.platforms, ['water']);
        this.watergirl.update(this.keys, this.platforms, ['lava']);
        
        // Check win condition
        this.checkWinCondition();
    }
    
    checkWinCondition() {
        const fireboyAtGoal = this.checkCollision(this.fireboy, this.goals.find(g => g.type === 'fire'));
        const watergirlAtGoal = this.checkCollision(this.watergirl, this.goals.find(g => g.type === 'water'));
        
        if (fireboyAtGoal && watergirlAtGoal) {
            alert('Level Complete! 🎉');
            // Load next level or restart
        }
    }
    
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw platforms
        this.platforms.forEach(platform => {
            if (platform.type === 'lava') {
                this.ctx.fillStyle = '#ff4444';
            } else if (platform.type === 'water') {
                this.ctx.fillStyle = '#4444ff';
            } else {
                this.ctx.fillStyle = '#666';
            }
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        });
        
        // Draw goals
        this.goals.forEach(goal => {
            this.ctx.fillStyle = goal.type === 'fire' ? '#ffaa44' : '#44aaff';
            this.ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
        });
        
        // Draw players
        this.fireboy.render(this.ctx);
        this.watergirl.render(this.ctx);
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

class Player {
    constructor(x, y, color, type) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.color = color;
        this.type = type;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpPower = 12;
        this.onGround = false;
    }
    
    update(keys, platforms, hazards) {
        // Movement controls
        if (this.type === 'fireboy') {
            if (keys['arrowleft']) this.velocityX = -this.speed;
            else if (keys['arrowright']) this.velocityX = this.speed;
            else this.velocityX *= 0.8;
            
            if (keys['arrowup'] && this.onGround) {
                this.velocityY = -this.jumpPower;
                this.onGround = false;
            }
        } else {
            if (keys['a']) this.velocityX = -this.speed;
            else if (keys['d']) this.velocityX = this.speed;
            else this.velocityX *= 0.8;
            
            if (keys['w'] && this.onGround) {
                this.velocityY = -this.jumpPower;
                this.onGround = false;
            }
        }
        
        // Apply gravity
        this.velocityY += 0.5;
        
        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Collision detection
        this.handleCollisions(platforms, hazards);
    }
    
    handleCollisions(platforms, hazards) {
        this.onGround = false;
        
        platforms.forEach(platform => {
            if (this.checkCollision(platform)) {
                // Check if it's a hazard
                if (hazards.includes(platform.type)) {
                    this.respawn();
                    return;
                }
                
                // Platform collision
                if (this.velocityY > 0 && this.y < platform.y) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.onGround = true;
                }
            }
        });
        
        // Keep player in bounds
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > 800) this.x = 800 - this.width;
        if (this.y > 600) this.respawn();
    }
    
    checkCollision(platform) {
        return this.x < platform.x + platform.width &&
               this.x + this.width > platform.x &&
               this.y < platform.y + platform.height &&
               this.y + this.height > platform.y;
    }
    
    respawn() {
        if (this.type === 'fireboy') {
            this.x = 100;
            this.y = 400;
        } else {
            this.x = 150;
            this.y = 400;
        }
        this.velocityX = 0;
        this.velocityY = 0;
    }
    
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Simple character details
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 8, this.y + 8, 6, 6); // Eye
        ctx.fillRect(this.x + 16, this.y + 8, 6, 6); // Eye
    }
}

// Start the game
window.addEventListener('load', () => {
    new Game();
});