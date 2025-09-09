// Main Game Class - Controls the entire game
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Show loading message
        this.showLoadingScreen();
        
        // Load images first, then start game
        ImageLoader.loadImages().then(() => {
            this.initializeGame();
        });
    }
    
    showLoadingScreen() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#2C3E50');
        gradient.addColorStop(1, '#1A252F');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🔥💧 Loading Fireboy & Watergirl...', this.width/2, this.height/2);
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Please wait while we load the characters', this.width/2, this.height/2 + 40);
        this.ctx.textAlign = 'left';
    }
    
    initializeGame() {
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
        
        console.log('🎮 Game initialized successfully!');
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
        
        // Show image loading status
        if (ImageLoader.loaded) {
            this.ctx.fillStyle = '#90EE90';
            this.ctx.font = '12px Arial';
            this.ctx.fillText('✅ Characters Loaded', 20, this.height - 40);
        }
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