// Main Game Class - Controls the entire game with FIXED moving platform physics
class Game {
    constructor(options = {}) {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        // Base world size (game logic coordinates)
        this.baseWidth = 1200; // expanded logical width to let walls touch edges at widescreen
        this.baseHeight = 600;

        // Resize canvas to fill viewport while scaling world to full width
        const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
        const resize = () => {
            const cssWidth = window.innerWidth;
            const cssHeight = window.innerHeight;
            this.canvas.style.width = cssWidth + 'px';
            this.canvas.style.height = cssHeight + 'px';
            this.canvas.width = Math.floor(cssWidth * dpr);
            this.canvas.height = Math.floor(cssHeight * dpr);
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.dpr = dpr;

            // Scale world to full browser width (no horizontal gaps) and center vertically
            this.renderScale = cssWidth / this.baseWidth;
            const scaledWorldWidth = this.baseWidth * this.renderScale;
            const scaledWorldHeight = this.baseHeight * this.renderScale;
            this.offsetX = 0;
            this.offsetY = Math.max(0, (cssHeight - scaledWorldHeight) / 2);

            // Reset device pixel ratio transform; world transform applied per-frame
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        // Share world size with Player bounds logic
        Player.worldWidth = this.baseWidth;
        Player.worldHeight = this.baseHeight;
        
        // Show loading message
        this.showLoadingScreen();
        
        // Load images first, then start game
        ImageLoader.loadImages().then(() => {
            this.initializeGame(options);
        });
    }
    
    showLoadingScreen() {
        this.drawBackgroundImage();
        
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = "24px 'New Rocker', Arial";
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🔥💧 Loading Fireboy & Watergirl...', this.width/2, this.height/2);
        this.ctx.font = "16px 'New Rocker', Arial";
        this.ctx.fillText('Please wait while we load the characters', this.width/2, this.height/2 + 40);
        this.ctx.textAlign = 'left';
    }
    
    initializeGame(options = {}) {
        // Game state
        this.keys = {};
        this.currentLevel = options.startLevel || 1;
        this.levelData = LevelManager.getCurrentLevel(this.currentLevel);
        
        // Initialize players
        this.fireboy = new Player(50, 500, '#ff4444', 'fireboy');
        this.watergirl = new Player(100, 500, '#4444ff', 'watergirl');
        
        // Game elements from level data
        this.platforms = this.levelData.platforms;
        this.collectibles = [...this.levelData.collectibles];
        this.goals = this.levelData.goals;
        this.spikes = this.levelData.spikes || [];
        this.lasers = this.levelData.lasers || [];

        // Power-up state
        this.immunityUntil = { fireboy: 0, watergirl: 0 };
        this.smokeUntil = { fireboy: 0, watergirl: 0 };
        this.gravityFlippedUntil = { fireboy: 0, watergirl: 0 };
        
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
        // Store platform movements BEFORE updating them
        const platformMovements = new Map();
        
        // Calculate how much each moving platform will move
        this.platforms.forEach((platform, index) => {
            if (platform.type === 'moving') {
                const oldX = platform.x;
                const oldY = platform.y;
                
                // Store the old position
                platformMovements.set(index, { oldX, oldY });
            }
        });
        
        // Update moving platforms
        this.updateMovingPlatforms();

        // Update lasers active state based on timers
        const now = performance.now();
        this.lasers.forEach(l => {
            if (!l.__start) l.__start = now + (l.phaseMs || 0);
            const cycle = (l.onMs || 1000) + (l.offMs || 1000);
            const t = (now - l.__start) % cycle;
            l.__active = t < (l.onMs || 1000);
        });
        
        // Calculate movement deltas and move players on platforms
        this.platforms.forEach((platform, index) => {
            if (platform.type === 'moving' && platformMovements.has(index)) {
                const { oldX, oldY } = platformMovements.get(index);
                const deltaX = platform.x - oldX;
                const deltaY = platform.y - oldY;
                
                // Move players that are standing on this platform
                this.movePlayersOnPlatform(platform, deltaX, deltaY);
            }
        });
        
        // Update players
        const hazardsForFire = this.isImmune('fireboy') ? [] : ['water', 'acid'];
        const hazardsForWater = this.isImmune('watergirl') ? [] : ['lava', 'acid'];
        const allowPhaseFire = this.isSmoked('fireboy');
        const allowPhaseWater = this.isSmoked('watergirl');
        const spikesForFire = (this.isImmune('fireboy') || allowPhaseFire) ? [] : this.spikes;
        const spikesForWater = (this.isImmune('watergirl') || allowPhaseWater) ? [] : this.spikes;
        this.fireboy.update(this.keys, this.getPhasePlatforms('fireboy'), hazardsForFire, spikesForFire, this.isGravityFlipped('fireboy'));
        this.watergirl.update(this.keys, this.getPhasePlatforms('watergirl'), hazardsForWater, spikesForWater, this.isGravityFlipped('watergirl'));

        // Laser collisions (skip if immune)
        this.lasers.forEach(l => {
            if (!l.__active) return;
            if (!this.isImmune('fireboy') && !this.isCrystalShielded() && this.checkCollision(this.fireboy, l)) this.fireboy.respawn();
            if (!this.isImmune('watergirl') && !this.isCrystalShielded() && this.checkCollision(this.watergirl, l)) this.watergirl.respawn();
        });
        
        // Check collectibles
        this.checkCollectibles();
        
        // Check win condition
        this.checkWinCondition();
    }
    
    // NEW: Move players that are standing on a moving platform
    movePlayersOnPlatform(platform, deltaX, deltaY) {
        // Check if fireboy is on this platform
        if (this.isPlayerOnPlatform(this.fireboy, platform)) {
            this.fireboy.x += deltaX;
            this.fireboy.y += deltaY;
        }
        
        // Check if watergirl is on this platform
        if (this.isPlayerOnPlatform(this.watergirl, platform)) {
            this.watergirl.x += deltaX;
            this.watergirl.y += deltaY;
        }
    }
    
    // NEW: Check if a player is standing on top of a platform
    isPlayerOnPlatform(player, platform) {
        const tolerance = 5; // Allow some margin for error
        
        // Check if player is horizontally overlapping with platform
        const horizontalOverlap = player.x < platform.x + platform.width && 
                                 player.x + player.width > platform.x;
        
        // Check if player is standing on top of platform (within tolerance)
        const standingOnTop = player.y + player.height >= platform.y - tolerance && 
                             player.y + player.height <= platform.y + tolerance;
        
        // Player must be on ground and overlapping horizontally
        return horizontalOverlap && standingOnTop && player.onGround;
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
            if (collectible.type === 'crystal_orb') {
                const orbHit = this.checkCollision(this.fireboy, collectible) || this.checkCollision(this.watergirl, collectible);
                if (orbHit) {
                    const now = performance.now();
                    const duration = 6000; // 6 seconds of immunity
                    this.immunityUntil.fireboy = Math.max(this.immunityUntil.fireboy, now + duration);
                    this.immunityUntil.watergirl = Math.max(this.immunityUntil.watergirl, now + duration);
                    return false;
                }
            }
            if (collectible.type === 'smoke_orb') {
                const orbHit = this.checkCollision(this.fireboy, collectible) || this.checkCollision(this.watergirl, collectible);
                if (orbHit) {
                    const now = performance.now();
                    const duration = 6000; // 6 seconds of phasing
                    this.smokeUntil.fireboy = Math.max(this.smokeUntil.fireboy, now + duration);
                    this.smokeUntil.watergirl = Math.max(this.smokeUntil.watergirl, now + duration);
                    return false;
                }
            }
            if (collectible.type === 'gravity_orb') {
                const orbHit = this.checkCollision(this.fireboy, collectible) || this.checkCollision(this.watergirl, collectible);
                if (orbHit) {
                    const now = performance.now();
                    const duration = 5000; // 5 seconds of inverted gravity
                    this.gravityFlippedUntil.fireboy = Math.max(this.gravityFlippedUntil.fireboy, now + duration);
                    this.gravityFlippedUntil.watergirl = Math.max(this.gravityFlippedUntil.watergirl, now + duration);
                    return false;
                }
            }
            return true;
        });
    }

    isImmune(playerType) {
        return performance.now() < (this.immunityUntil[playerType] || 0);
    }

    isSmoked(playerType) {
        return performance.now() < (this.smokeUntil[playerType] || 0);
    }

    isGravityFlipped(playerType) {
        return performance.now() < (this.gravityFlippedUntil[playerType] || 0);
    }

    isCrystalShielded() {
        // Crystal orb immunity covers lasers as a global shield
        return this.isImmune('fireboy') || this.isImmune('watergirl');
    }

    getPhasePlatforms(playerType) {
        if (!this.isSmoked(playerType)) return this.platforms;
        // While smoked, allow passing through walls and spikes by ignoring walls for collision
        return this.platforms.filter(p => p.type !== 'wall');
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
        this.lasers = this.levelData.lasers || [];
        
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
        // Draw image background (cover)
        this.drawBackgroundImage();
        
        // Apply world transform (scale to full width and center vertically)
        this.ctx.save();
        this.ctx.translate(this.offsetX || 0, this.offsetY || 0);
        this.ctx.scale(this.renderScale || 1, this.renderScale || 1);

        // Draw world edge frame behind platforms
        this.drawWorldFrame();

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
                    
                    // Add directional arrow to show movement
                    this.ctx.fillStyle = '#FF0000';
                    this.ctx.font = '12px Arial';
                    if (platform.moveX) {
                        this.ctx.fillText(platform.direction > 0 ? '→' : '←', platform.x + platform.width/2 - 6, platform.y + platform.height/2 + 4);
                    }
                    if (platform.moveY) {
                        this.ctx.fillText(platform.direction > 0 ? '↓' : '↑', platform.x + platform.width/2 - 6, platform.y + platform.height/2 + 4);
                    }
                    break;
                case 'acid':
                    this.ctx.fillStyle = '#AA44AA';
                    this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
                    break;
            }
        });

        // Draw lasers
        this.lasers.forEach(l => PlatformRenderer.drawLaser(this.ctx, l, !!l.__active));
        
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
        
        // Draw players
        this.fireboy.render(this.ctx);
        this.watergirl.render(this.ctx);

        // Liquid interaction visuals
        const renderSplash = (player, type) => {
            this.platforms.forEach(p => {
                if (p.type !== type) return;
                const intersects = player.x + player.width > p.x && player.x < p.x + p.width && player.y + player.height > p.y && player.y < p.y + p.height;
                if (intersects) PlatformRenderer.drawElementInteraction(this.ctx, player, p);
            });
        };
        renderSplash(this.fireboy, 'lava');
        renderSplash(this.watergirl, 'water');

        // Draw UI within world space so it scales consistently
        this.drawUI();

        this.ctx.restore();

        // Fill edge columns so side grids reach the page edges even with vertical letterboxing
        this.drawEdgeColumns();
    }
    
    drawUI() {
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = "20px 'New Rocker', Arial";
        this.ctx.fillText(`Level ${this.currentLevel}: ${this.levelData.name}`, 20, 30);
        this.ctx.fillText(`Gems: ${this.collectibles.length}`, 20, 60);
        if (this.isImmune('fireboy') || this.isImmune('watergirl')) {
            const remain = Math.ceil(Math.max(this.immunityUntil.fireboy, this.immunityUntil.watergirl) - performance.now()) / 1000;
            this.ctx.fillText(`Crystal Orb: ${Math.max(0, remain).toFixed(1)}s`, 20, 90);
        }
        
        this.ctx.font = "14px 'New Rocker', Arial";
        this.ctx.fillText('Fireboy: Arrow Keys | Watergirl: WASD', 20, this.baseHeight - 20);
        
        // Show image loading status
        if (ImageLoader.loaded) {
            this.ctx.fillStyle = '#90EE90';
            this.ctx.font = "12px 'New Rocker', Arial";
            this.ctx.fillText('✅ Characters Loaded', 20, this.baseHeight - 40);
        }
    }

    drawEdgeColumns() {
        const cssWidth = this.canvas.width / (this.dpr || 1);
        const cssHeight = this.canvas.height / (this.dpr || 1);
        const worldWidth = this.baseWidth * (this.renderScale || 1);
        const worldHeight = this.baseHeight * (this.renderScale || 1);
        const ox = this.offsetX || 0;
        const oy = this.offsetY || 0;

        // Top band
        if (oy > 0) {
            PlatformRenderer.drawStoneBlock(this.ctx, 0, 0, cssWidth, oy);
        }
        // Bottom band
        const bottomY = oy + worldHeight;
        if (bottomY < cssHeight) {
            PlatformRenderer.drawStoneBlock(this.ctx, 0, bottomY, cssWidth, cssHeight - bottomY);
        }
        // Left band
        if (ox > 0) {
            PlatformRenderer.drawStoneBlock(this.ctx, 0, 0, ox, cssHeight);
        }
        // Right band
        const rightX = ox + worldWidth;
        if (rightX < cssWidth) {
            PlatformRenderer.drawStoneBlock(this.ctx, rightX, 0, cssWidth - rightX, cssHeight);
        }
    }

    drawWorldFrame() {
        // Render a continuous stone frame inside world space so edges always look complete
        const wallThickness = 20;
        const floorHeight = 50;
        PlatformRenderer.drawStoneBlock(this.ctx, 0, 0, wallThickness, this.baseHeight);
        PlatformRenderer.drawStoneBlock(this.ctx, this.baseWidth - wallThickness, 0, wallThickness, this.baseHeight);
        PlatformRenderer.drawStoneBlock(this.ctx, 0, this.baseHeight - floorHeight, this.baseWidth, floorHeight);
    }

    drawBackgroundImage() {
        const img = ImageLoader.getImage('game-bg');
        if (img && img.complete && img.naturalWidth) {
            const cw = this.width;
            const ch = this.height;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            const cover = Math.max(cw / iw, ch / ih);
            const dw = iw * cover;
            const dh = ih * cover;
            const dx = (cw - dw) / 2;
            const dy = (ch - dh) / 2;
            this.ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
        } else {
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
            gradient.addColorStop(0, '#2C3E50');
            gradient.addColorStop(1, '#1A252F');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Export a start function so menu can control when to start
window.startGame = function(startLevel = 1) {
    new Game({ startLevel });
};