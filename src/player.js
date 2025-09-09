// Player Class with FIXED collision detection for jumping under platforms
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
        this.speed = 2;
        this.jumpPower = 12;
        this.gravity = 0.6;
        this.maxFallSpeed = 12;
        this.onGround = false;
        this.facingDirection = 1; // 1 = right, -1 = left
        this.walkAnimation = 0;
        this.jumpAnimation = 0;
    }
    
    update(keys, platforms, hazards, spikes) {
        // Store previous position for collision checking
        const prevX = this.x;
        const prevY = this.y;
        
        // Movement controls with acceleration
        if (this.type === 'fireboy') {
            if (keys['arrowleft']) {
                this.velocityX = Math.max(this.velocityX - 0.5, -this.speed);
                this.facingDirection = -1;
                this.walkAnimation += 0.2;
            } else if (keys['arrowright']) {
                this.velocityX = Math.min(this.velocityX + 0.5, this.speed);
                this.facingDirection = 1;
                this.walkAnimation += 0.2;
            } else {
                this.velocityX *= 0.85;
                this.walkAnimation = 0;
            }
            
            if (keys['arrowup'] && this.onGround) {
                this.velocityY = -this.jumpPower;
                this.onGround = false;
                this.jumpAnimation = 0;
            }
        } else {
            if (keys['a']) {
                this.velocityX = Math.max(this.velocityX - 0.5, -this.speed);
                this.facingDirection = -1;
                this.walkAnimation += 0.2;
            } else if (keys['d']) {
                this.velocityX = Math.min(this.velocityX + 0.5, this.speed);
                this.facingDirection = 1;
                this.walkAnimation += 0.2;
            } else {
                this.velocityX *= 0.85;
                this.walkAnimation = 0;
            }
            
            if (keys['w'] && this.onGround) {
                this.velocityY = -this.jumpPower;
                this.onGround = false;
                this.jumpAnimation = 0;
            }
        }
        
        // Apply realistic gravity
        if (!this.onGround) {
            this.velocityY += this.gravity;
            this.jumpAnimation += 0.1;
            
            if (this.velocityY > this.maxFallSpeed) {
                this.velocityY = this.maxFallSpeed;
            }
        }
        
        // Update position step by step for better collision detection
        this.x += this.velocityX;
        this.handleHorizontalCollisions(platforms, hazards, spikes, prevX);
        
        this.y += this.velocityY;
        this.handleVerticalCollisions(platforms, hazards, spikes, prevY);
    }
    
    handleHorizontalCollisions(platforms, hazards, spikes, prevX) {
        platforms.forEach(platform => {
            if (this.checkCollision(platform)) {
                if (hazards.includes(platform.type)) {
                    this.respawn();
                    return;
                }
                
                // Hitting platform from left (moving right)
                if (this.velocityX > 0 && prevX + this.width <= platform.x) {
                    this.x = platform.x - this.width;
                    this.velocityX = 0;
                }
                // Hitting platform from right (moving left)
                else if (this.velocityX < 0 && prevX >= platform.x + platform.width) {
                    this.x = platform.x + platform.width;
                    this.velocityX = 0;
                }
            }
        });
        
        // Keep player in horizontal bounds
        const worldWidth = Player.worldWidth || 800;
        if (this.x < 0) {
            this.x = 0;
            this.velocityX = 0;
        }
        if (this.x + this.width > worldWidth) {
            this.x = worldWidth - this.width;
            this.velocityX = 0;
        }
    }
    
    handleVerticalCollisions(platforms, hazards, spikes, prevY) {
        this.onGround = false;
        
        platforms.forEach(platform => {
            if (this.checkCollision(platform)) {
                if (hazards.includes(platform.type)) {
                    this.respawn();
                    return;
                }
                
                // Landing on top of platform (falling down)
                if (this.velocityY > 0 && prevY + this.height <= platform.y + 5) { // Added 5px tolerance
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.onGround = true;
                    this.jumpAnimation = 0;
                }
                // Hitting platform from below (jumping up)
                else if (this.velocityY < 0 && prevY >= platform.y + platform.height - 5) { // Added 5px tolerance
                    this.y = platform.y + platform.height;
                    this.velocityY = 0; // Stop upward movement
                }
            }
        });
        
        // Check spike collisions
        spikes.forEach(spike => {
            if (this.checkCollision(spike)) {
                this.respawn();
            }
        });
        
        // Keep player in vertical bounds
        const worldHeight = Player.worldHeight || 600;
        if (this.y > worldHeight) {
            this.respawn();
        }
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
        this.onGround = true;
        this.jumpAnimation = 0;
    }
    
    render(ctx) {
        // Simple bounce effect
        const bounceOffset = Math.abs(this.velocityX) > 0.5 && this.onGround ? Math.sin(this.walkAnimation) * 1 : 0;
        
        if (ImageLoader.loaded && ImageLoader.isImageLoaded(this.type)) {
            // Get the appropriate image
            const image = ImageLoader.getImage(this.type);
            
            if (image) {
                ctx.save();
                
                // Simple directional flipping without complex transforms
                if (this.facingDirection === -1) {
                    // Flip horizontally for left direction
                    ctx.translate(this.x + this.width, this.y + bounceOffset);
                    ctx.scale(-1, 1);
                    ctx.drawImage(image, 0, 0, this.width, this.height);
                } else {
                    // Normal direction (right)
                    ctx.drawImage(image, this.x, this.y + bounceOffset, this.width, this.height);
                }
                
                ctx.restore();
                
                // Simple glow effect
                ctx.save();
                if (this.type === 'fireboy') {
                    ctx.shadowColor = 'rgba(255, 100, 68, 0.5)';
                } else {
                    ctx.shadowColor = 'rgba(68, 100, 255, 0.5)';
                }
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                
                // Reset shadow for other elements
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.restore();
            } else {
                // Fallback if image fails
                this.renderFallback(ctx);
            }
        } else {
            // Fallback rendering - always works
            this.renderFallback(ctx);
        }
    }
    
    renderFallback(ctx) {
        // Simple working fallback
        const bounceOffset = Math.abs(this.velocityX) > 0.5 && this.onGround ? Math.sin(this.walkAnimation) * 1 : 0;
        
        // Character body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y + bounceOffset, this.width, this.height);
        
        // Character details
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 8, this.y + 8 + bounceOffset, 6, 6); // Left eye
        ctx.fillRect(this.x + 16, this.y + 8 + bounceOffset, 6, 6); // Right eye
        
        // Character outline
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y + bounceOffset, this.width, this.height);
        
        // Direction indicator
        ctx.fillStyle = '#FFD700';
        if (this.facingDirection === 1) {
            // Arrow pointing right
            ctx.fillRect(this.x + 22, this.y + 20 + bounceOffset, 6, 2);
        } else {
            // Arrow pointing left
            ctx.fillRect(this.x + 2, this.y + 20 + bounceOffset, 6, 2);
        }
        
        // Character name for debugging
        ctx.fillStyle = '#FFF';
        ctx.font = '10px Arial';
        ctx.fillText(this.type === 'fireboy' ? 'F' : 'W', this.x + 12, this.y - 5);
        
        // Debug: Show if on ground
        if (this.onGround) {
            ctx.fillStyle = '#00FF00';
            ctx.fillRect(this.x + this.width - 5, this.y - 5, 5, 5);
        }
    }
}