// Level Manager Class (ONLY ONE!)
class LevelManager {
    static levels = {
        1: {
            name: "Temple Entrance",
            platforms: [
                // Main ground platforms (stone texture)
                { x: 0, y: 550, width: 200, height: 50, type: 'stone' },
                { x: 250, y: 550, width: 300, height: 50, type: 'stone' },
                { x: 600, y: 550, width: 200, height: 50, type: 'stone' },
                
                // Multi-level stone platforms
                { x: 100, y: 450, width: 150, height: 30, type: 'stone' },
                { x: 300, y: 400, width: 200, height: 30, type: 'stone' },
                { x: 550, y: 350, width: 150, height: 30, type: 'stone' },
                
                // Upper level complex platforms
                { x: 0, y: 300, width: 100, height: 30, type: 'stone' },
                { x: 150, y: 250, width: 100, height: 30, type: 'stone' },
                { x: 300, y: 200, width: 150, height: 30, type: 'stone' },
                { x: 500, y: 150, width: 100, height: 30, type: 'stone' },
                { x: 650, y: 200, width: 150, height: 30, type: 'stone' },
                
                // Hazard zones
                { x: 200, y: 530, width: 50, height: 20, type: 'lava' },
                { x: 550, y: 530, width: 50, height: 20, type: 'water' },
                
                // Moving platforms
                { x: 400, y: 300, width: 80, height: 20, type: 'moving', moveX: true, range: 100, speed: 1 },
                
                // Walls (for more complex navigation)
                { x: 0, y: 0, width: 20, height: 600, type: 'wall' },
                { x: 780, y: 0, width: 20, height: 600, type: 'wall' },
            ],
            collectibles: [
                { x: 120, y: 420, type: 'fire_gem' },
                { x: 320, y: 370, type: 'water_gem' },
                { x: 170, y: 220, type: 'fire_gem' },
                { x: 520, y: 120, type: 'water_gem' },
            ],
            goals: [
                { x: 670, y: 170, width: 30, height: 30, type: 'fire' },
                { x: 720, y: 170, width: 30, height: 30, type: 'water' }
            ],
            spikes: [
                { x: 250, y: 540, width: 20, height: 10 },
                { x: 450, y: 390, width: 20, height: 10 },
                { x: 600, y: 540, width: 20, height: 10 },
            ]
        },
        
        2: {
            name: "Crystal Caverns",
            platforms: [
                // Complex multi-tier stone structure
                { x: 0, y: 550, width: 800, height: 50, type: 'stone' },
                
                // Left side ascending platforms
                { x: 50, y: 480, width: 100, height: 25, type: 'stone' },
                { x: 0, y: 420, width: 120, height: 25, type: 'stone' },
                { x: 80, y: 360, width: 100, height: 25, type: 'stone' },
                { x: 20, y: 300, width: 80, height: 25, type: 'stone' },
                { x: 150, y: 240, width: 100, height: 25, type: 'stone' },
                
                // Center floating islands
                { x: 300, y: 450, width: 200, height: 30, type: 'stone' },
                { x: 250, y: 350, width: 100, height: 25, type: 'stone' },
                { x: 400, y: 280, width: 120, height: 25, type: 'stone' },
                { x: 300, y: 180, width: 200, height: 30, type: 'stone' },
                
                // Right side complex
                { x: 600, y: 480, width: 150, height: 25, type: 'stone' },
                { x: 650, y: 400, width: 100, height: 25, type: 'stone' },
                { x: 580, y: 320, width: 120, height: 25, type: 'stone' },
                { x: 650, y: 240, width: 100, height: 25, type: 'stone' },
                
                // Hazard pools
                { x: 200, y: 530, width: 80, height: 20, type: 'lava' },
                { x: 520, y: 530, width: 80, height: 20, type: 'water' },
                { x: 350, y: 430, width: 50, height: 20, type: 'acid' }, // deadly to both
                
                // Moving platforms
                { x: 200, y: 200, width: 80, height: 20, type: 'moving', moveY: true, range: 80, speed: 1.5 },
                { x: 550, y: 350, width: 60, height: 20, type: 'moving', moveX: true, range: 60, speed: 1 },
            ],
            collectibles: [
                { x: 70, y: 450, type: 'fire_gem' },
                { x: 90, y: 330, type: 'water_gem' },
                { x: 170, y: 210, type: 'fire_gem' },
                { x: 320, y: 420, type: 'water_gem' },
                { x: 420, y: 250, type: 'fire_gem' },
                { x: 670, y: 370, type: 'water_gem' },
                { x: 670, y: 210, type: 'fire_gem' },
            ],
            goals: [
                { x: 320, y: 150, width: 30, height: 30, type: 'fire' },
                { x: 370, y: 150, width: 30, height: 30, type: 'water' }
            ],
            spikes: [
                { x: 180, y: 470, width: 20, height: 10 },
                { x: 280, y: 340, width: 20, height: 10 },
                { x: 520, y: 470, width: 20, height: 10 },
                { x: 600, y: 310, width: 20, height: 10 },
            ],
        },
        
        3: {
            name: "Temple of Elements",
            platforms: [
                // Massive temple structure
                { x: 0, y: 550, width: 800, height: 50, type: 'stone' },
                
                // Temple base
                { x: 100, y: 450, width: 600, height: 40, type: 'stone' },
                { x: 150, y: 350, width: 500, height: 35, type: 'stone' },
                { x: 200, y: 250, width: 400, height: 35, type: 'stone' },
                { x: 250, y: 150, width: 300, height: 35, type: 'stone' },
                
                // Side chambers
                { x: 50, y: 400, width: 80, height: 25, type: 'stone' },
                { x: 670, y: 400, width: 80, height: 25, type: 'stone' },
                { x: 20, y: 300, width: 100, height: 25, type: 'stone' },
                { x: 680, y: 300, width: 100, height: 25, type: 'stone' },
                
                // Internal platforms
                { x: 300, y: 400, width: 200, height: 20, type: 'stone' },
                { x: 350, y: 300, width: 100, height: 20, type: 'stone' },
                
                // Hazard channels
                { x: 200, y: 530, width: 120, height: 20, type: 'lava' },
                { x: 480, y: 530, width: 120, height: 20, type: 'water' },
                { x: 320, y: 530, width: 160, height: 20, type: 'acid' },
                
                // Moving temple mechanisms
                { x: 180, y: 200, width: 60, height: 20, type: 'moving', moveY: true, range: 50, speed: 0.8 },
                { x: 560, y: 200, width: 60, height: 20, type: 'moving', moveY: true, range: 50, speed: 0.8 },
                { x: 300, y: 100, width: 200, height: 20, type: 'moving', moveX: true, range: 100, speed: 1.2 },
            ],
            collectibles: [
                { x: 70, y: 370, type: 'fire_gem' },
                { x: 690, y: 370, type: 'water_gem' },
                { x: 40, y: 270, type: 'fire_gem' },
                { x: 700, y: 270, type: 'water_gem' },
                { x: 320, y: 370, type: 'fire_gem' },
                { x: 420, y: 370, type: 'water_gem' },
                { x: 370, y: 270, type: 'special_gem' },
            ],
            goals: [
                { x: 320, y: 120, width: 30, height: 30, type: 'fire' },
                { x: 450, y: 120, width: 30, height: 30, type: 'water' }
            ],
            spikes: [
                { x: 150, y: 440, width: 20, height: 10 },
                { x: 630, y: 440, width: 20, height: 10 },
                { x: 250, y: 340, width: 20, height: 10 },
                { x: 530, y: 340, width: 20, height: 10 },
            ],
        }
    };
    
    static getCurrentLevel(levelNumber) {
        return this.levels[levelNumber] || this.levels[1];
    }
    
    static getTotalLevels() {
        return Object.keys(this.levels).length;
    }
}

// Player Class
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
        this.speed = 3;
        this.jumpPower = 10;
        this.onGround = false;
    }
    
    update(keys, platforms, hazards, spikes) {
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
        this.handleCollisions(platforms, hazards, spikes);
    }
    
    handleCollisions(platforms, hazards, spikes) {
        this.onGround = false;
        
        platforms.forEach(platform => {
            if (this.checkCollision(platform)) {
                // Check if it's a hazard
                if (hazards.includes(platform.type)) {
                    this.respawn();
                    return;
                }
                
                // Platform collision - land on top
                if (this.velocityY > 0 && this.y < platform.y) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.onGround = true;
                }
            }
        });
        
        // Check spike collisions
        spikes.forEach(spike => {
            if (this.checkCollision(spike)) {
                this.respawn();
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
            this.x = 50;
            this.y = 400;
        } else {
            this.x = 100;
            this.y = 400;
        }
        this.velocityX = 0;
        this.velocityY = 0;
    }
    
    render(ctx) {
        // Character body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Character details
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 8, this.y + 8, 6, 6); // Left eye
        ctx.fillRect(this.x + 16, this.y + 8, 6, 6); // Right eye
        
        // Character outline
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

// Platform Renderer Class
class PlatformRenderer {
    static drawStoneBlock(ctx, x, y, width, height) {
        // Base stone color
        ctx.fillStyle = '#8B9DC3';
        ctx.fillRect(x, y, width, height);
        
        // Draw brick pattern
        const brickWidth = 40;
        const brickHeight = 20;
        
        for (let row = 0; row < Math.ceil(height / brickHeight); row++) {
            for (let col = 0; col < Math.ceil(width / brickWidth); col++) {
                const brickX = x + col * brickWidth + (row % 2 === 1 ? brickWidth / 2 : 0);
                const brickY = y + row * brickHeight;
                
                // Skip if brick is outside platform
                if (brickX >= x + width || brickY >= y + height) continue;
                
                // Brick outline
                ctx.strokeStyle = '#6B7DA3';
                ctx.lineWidth = 1;
                ctx.strokeRect(brickX, brickY, 
                    Math.min(brickWidth, x + width - brickX), 
                    Math.min(brickHeight, y + height - brickY));
                
                // Highlight for 3D effect
                ctx.fillStyle = '#9BADD6';
                ctx.fillRect(brickX, brickY, 2, Math.min(brickHeight, y + height - brickY));
                ctx.fillRect(brickX, brickY, Math.min(brickWidth, x + width - brickX), 2);
            }
        }
        
        // Platform shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x + 2, y + height, width, 3);
    }
    
    static drawLava(ctx, x, y, width, height) {
        // Animated lava
        const time = Date.now() * 0.005;
        ctx.fillStyle = '#FF4444';
        ctx.fillRect(x, y, width, height);
        
        // Lava bubbles
        for (let i = 0; i < width / 10; i++) {
            const bubbleX = x + (i * 10) + Math.sin(time + i) * 3;
            const bubbleY = y + Math.sin(time * 2 + i) * 2;
            ctx.fillStyle = '#FF6666';
            ctx.beginPath();
            ctx.arc(bubbleX, bubbleY, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    static drawWater(ctx, x, y, width, height) {
        // Water base
        ctx.fillStyle = '#4444FF';
        ctx.fillRect(x, y, width, height);
        
        // Water waves
        const time = Date.now() * 0.003;
        ctx.beginPath();
        ctx.strokeStyle = '#6666FF';
        ctx.lineWidth = 2;
        for (let i = 0; i < width; i += 5) {
            const waveY = y + Math.sin((time + i * 0.1)) * 2;
            if (i === 0) ctx.moveTo(x + i, waveY);
            else ctx.lineTo(x + i, waveY);
        }
        ctx.stroke();
    }
    
    static drawSpike(ctx, x, y, width, height) {
        ctx.fillStyle = '#666';
        const spikeCount = Math.floor(width / 10);
        const spikeWidth = width / spikeCount;
        
        for (let i = 0; i < spikeCount; i++) {
            const spikeX = x + i * spikeWidth;
            ctx.beginPath();
            ctx.moveTo(spikeX, y + height);
            ctx.lineTo(spikeX + spikeWidth / 2, y);
            ctx.lineTo(spikeX + spikeWidth, y + height);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    static drawCollectible(ctx, x, y, type) {
        const time = Date.now() * 0.01;
        const floatY = y + Math.sin(time) * 2;
        
        if (type === 'fire_gem') {
            // Fire gem (red diamond)
            ctx.fillStyle = '#FF4444';
            ctx.beginPath();
            ctx.moveTo(x + 10, floatY);
            ctx.lineTo(x + 15, floatY + 5);
            ctx.lineTo(x + 10, floatY + 10);
            ctx.lineTo(x + 5, floatY + 5);
            ctx.closePath();
            ctx.fill();
            
            // Glow effect
            ctx.fillStyle = 'rgba(255, 68, 68, 0.3)';
            ctx.beginPath();
            ctx.arc(x + 10, floatY + 5, 12, 0, Math.PI * 2);
            ctx.fill();
        } else if (type === 'water_gem') {
            // Water gem (blue diamond)
            ctx.fillStyle = '#4444FF';
            ctx.beginPath();
            ctx.moveTo(x + 10, floatY);
            ctx.lineTo(x + 15, floatY + 5);
            ctx.lineTo(x + 10, floatY + 10);
            ctx.lineTo(x + 5, floatY + 5);
            ctx.closePath();
            ctx.fill();
            
            // Glow effect
            ctx.fillStyle = 'rgba(68, 68, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(x + 10, floatY + 5, 12, 0, Math.PI * 2);
            ctx.fill();
        } else if (type === 'special_gem') {
            // Special gem (purple diamond)
            ctx.fillStyle = '#AA44AA';
            ctx.beginPath();
            ctx.moveTo(x + 10, floatY);
            ctx.lineTo(x + 15, floatY + 5);
            ctx.lineTo(x + 10, floatY + 10);
            ctx.lineTo(x + 5, floatY + 5);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    static drawGoal(ctx, x, y, width, height, type) {
        if (type === 'fire') {
            // Fire portal
            ctx.fillStyle = '#FF6644';
            ctx.fillRect(x, y, width, height);
            ctx.fillStyle = '#FF8866';
            ctx.fillRect(x + 5, y + 5, width - 10, height - 10);
            
            // Fire symbol
            ctx.fillStyle = '#FFAA88';
            ctx.font = '20px Arial';
            ctx.fillText('🔥', x + 5, y + 25);
        } else {
            // Water portal
            ctx.fillStyle = '#4466FF';
            ctx.fillRect(x, y, width, height);
            ctx.fillStyle = '#6688FF';
            ctx.fillRect(x + 5, y + 5, width - 10, height - 10);
            
            // Water symbol
            ctx.fillStyle = '#88AAFF';
            ctx.font = '20px Arial';
            ctx.fillText('💧', x + 5, y + 25);
        }
    }
}

// Main Game Class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Game state
        this.keys = {};
        this.currentLevel = 1;
        this.levelData = LevelManager.getCurrentLevel(this.currentLevel);
        
        // Initialize players
        this.fireboy = new Player(50, 500, '#ff4444', 'fireboy');
        this.watergirl = new Player(100, 500, '#4444ff', 'watergirl');
        
        // Game elements from level data
        this.platforms = this.levelData.platforms;
        this.collectibles = [...this.levelData.collectibles];
        this.goals = this.levelData.goals;
        this.spikes = this.levelData.spikes || [];
        
        this.setupControls();
        this.gameLoop();
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
        // Update moving platforms
        this.updateMovingPlatforms();
        
        // Update players
        this.fireboy.update(this.keys, this.platforms, ['water', 'acid'], this.spikes);
        this.watergirl.update(this.keys, this.platforms, ['lava', 'acid'], this.spikes);
        
        // Check collectibles
        this.checkCollectibles();
        
        // Check win condition
        this.checkWinCondition();
    }
    
    updateMovingPlatforms() {
        this.platforms.forEach(platform => {
            if (platform.type === 'moving') {
                if (!platform.originalX) {
                    platform.originalX = platform.x;
                    platform.originalY = platform.y;
                    platform.direction = 1;
                }
                
                if (platform.moveX) {
                    platform.x += platform.speed * platform.direction;
                    if (platform.x > platform.originalX + platform.range || platform.x < platform.originalX) {
                        platform.direction *= -1;
                    }
                }
                
                if (platform.moveY) {
                    platform.y += platform.speed * platform.direction;
                    if (platform.y > platform.originalY + platform.range || platform.y < platform.originalY) {
                        platform.direction *= -1;
                    }
                }
            }
        });
    }
    
    checkCollectibles() {
        this.collectibles = this.collectibles.filter(collectible => {
            if (collectible.type === 'fire_gem' && this.checkCollision(this.fireboy, collectible)) {
                return false;
            }
            if (collectible.type === 'water_gem' && this.checkCollision(this.watergirl, collectible)) {
                return false;
            }
            if (collectible.type === 'special_gem') {
                // Special gems can be collected by either player
                if (this.checkCollision(this.fireboy, collectible) || this.checkCollision(this.watergirl, collectible)) {
                    return false;
                }
            }
            return true;
        });
    }
    
    checkWinCondition() {
        const fireboyAtGoal = this.checkCollision(this.fireboy, this.goals.find(g => g.type === 'fire'));
        const watergirlAtGoal = this.checkCollision(this.watergirl, this.goals.find(g => g.type === 'water'));
        const allGemsCollected = this.collectibles.length === 0;
        
        if (fireboyAtGoal && watergirlAtGoal && allGemsCollected) {
            this.nextLevel();
        }
    }
    
    nextLevel() {
        this.currentLevel++;
        if (this.currentLevel > LevelManager.getTotalLevels()) {
            alert('🎉 Congratulations! You completed all levels! 🎉');
            this.currentLevel = 1; // Reset to level 1
        } else {
            alert(`🎉 Level ${this.currentLevel - 1} Complete! 🎉\nNext: ${LevelManager.getCurrentLevel(this.currentLevel).name}`);
        }
        
        // Load new level
        this.levelData = LevelManager.getCurrentLevel(this.currentLevel);
        this.platforms = this.levelData.platforms;
        this.collectibles = [...this.levelData.collectibles];
        this.goals = this.levelData.goals;
        this.spikes = this.levelData.spikes || [];
        
        // Reset player positions
        this.fireboy.respawn();
        this.watergirl.respawn();
    }
    
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + (rect2.width || 20) &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + (rect2.height || 20) &&
               rect1.y + rect1.height > rect2.y;
    }
    
    render() {
        // Clear canvas with temple background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#2C3E50');
        gradient.addColorStop(1, '#1A252F');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw platforms
        this.platforms.forEach(platform => {
            switch(platform.type) {
                case 'stone':
                case 'wall':
                    PlatformRenderer.drawStoneBlock(this.ctx, platform.x, platform.y, platform.width, platform.height);
                    break;
                case 'lava':
                    PlatformRenderer.drawLava(this.ctx, platform.x, platform.y, platform.width, platform.height);
                    break;
                case 'water':
                    PlatformRenderer.drawWater(this.ctx, platform.x, platform.y, platform.width, platform.height);
                    break;
                case 'moving':
                    PlatformRenderer.drawStoneBlock(this.ctx, platform.x, platform.y, platform.width, platform.height);
                    // Add moving indicator (yellow dot)
                    this.ctx.fillStyle = '#FFFF00';
                    this.ctx.fillRect(platform.x + 5, platform.y + 5, 10, 10);
                    break;
                case 'acid':
                    this.ctx.fillStyle = '#AA44AA';
                    this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
                    break;
            }
        });
        
        // Draw spikes
        this.spikes.forEach(spike => {
            PlatformRenderer.drawSpike(this.ctx, spike.x, spike.y, spike.width, spike.height);
        });
        
        // Draw collectibles
        this.collectibles.forEach(collectible => {
            PlatformRenderer.drawCollectible(this.ctx, collectible.x, collectible.y, collectible.type);
        });
        
        // Draw goals
        this.goals.forEach(goal => {
            PlatformRenderer.drawGoal(this.ctx, goal.x, goal.y, goal.width, goal.height, goal.type);
        });
        
        // Draw UI
        this.drawUI();
        
        // Draw players
        this.fireboy.render(this.ctx);
        this.watergirl.render(this.ctx);
    }
    
    drawUI() {
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Level ${this.currentLevel}: ${this.levelData.name}`, 20, 30);
        this.ctx.fillText(`Gems: ${this.collectibles.length}`, 20, 60);
        
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Fireboy: Arrow Keys | Watergirl: WASD', 20, this.height - 20);
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when page loads
window.addEventListener('load', () => {
    new Game();
});