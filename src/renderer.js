// Platform Renderer Class - All visual rendering
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
        } else if (type === 'crystal_orb') {
            // Crystal orb power-up
            const img = ImageLoader.getImage('crystal-orb');
            if (img && img.complete && img.naturalWidth) {
                ctx.drawImage(img, x, floatY, 20, 20);
            } else {
                // Fallback: glowing circle
                ctx.fillStyle = '#88e0ff';
                ctx.beginPath();
                ctx.arc(x + 10, floatY + 10, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = 'rgba(136,224,255,0.35)';
                ctx.beginPath();
                ctx.arc(x + 10, floatY + 10, 14, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (type === 'smoke_orb') {
            // Smoke orb (semi-transparent gray)
            const img = ImageLoader.getImage('smoke-orb');
            if (img && img.complete && img.naturalWidth) {
                ctx.globalAlpha = 0.85;
                ctx.drawImage(img, x, floatY, 20, 20);
                ctx.globalAlpha = 1;
            } else {
                ctx.fillStyle = 'rgba(160,160,160,0.7)';
                ctx.beginPath();
                ctx.arc(x + 10, floatY + 10, 8, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (type === 'gravity_orb') {
            // Gravity orb (green with arrow)
            const img = ImageLoader.getImage('gravity-orb');
            if (img && img.complete && img.naturalWidth) {
                ctx.drawImage(img, x, floatY, 20, 20);
            } else {
                ctx.fillStyle = '#5cff7a';
                ctx.beginPath();
                ctx.arc(x + 10, floatY + 10, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#1b7a2c';
                ctx.fillRect(x + 8, floatY + 6, 4, 8);
                ctx.beginPath();
                ctx.moveTo(x + 10, floatY + 4);
                ctx.lineTo(x + 6, floatY + 8);
                ctx.lineTo(x + 14, floatY + 8);
                ctx.closePath();
                ctx.fill();
            }
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

    static drawLaser(ctx, laser, isActive) {
        ctx.save();
        const img = ImageLoader.getImage('laser-beam');
        if (isActive) {
            ctx.globalAlpha = 0.95;
            ctx.fillStyle = '#ff2a2a';
        } else {
            ctx.globalAlpha = 0.25;
            ctx.fillStyle = '#a33';
        }
        if (img && img.complete && img.naturalWidth) {
            if (laser.orientation === 'horizontal') {
                const tiles = Math.ceil(laser.width / 64);
                for (let i = 0; i < tiles; i++) {
                    const dw = Math.min(64, laser.width - i * 64);
                    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, laser.x + i * 64, laser.y, dw, laser.height);
                }
            } else {
                const tiles = Math.ceil(laser.height / 64);
                for (let i = 0; i < tiles; i++) {
                    const dh = Math.min(64, laser.height - i * 64);
                    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, laser.x, laser.y + i * 64, laser.width, dh);
                }
            }
        } else {
            ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
        }
        ctx.restore();
    }

    static drawElementInteraction(ctx, player, platform) {
        // Visual splash/glow line at the liquid surface where player intersects
        ctx.save();
        const cx = player.x + player.width / 2;
        const topY = platform.y;
        const isLava = platform.type === 'lava';
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = isLava ? 'rgba(255,80,30,0.35)' : 'rgba(80,120,255,0.35)';
        ctx.beginPath();
        ctx.ellipse(cx, topY, 18, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = isLava ? '#ffb199' : '#b1c9ff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(player.x, topY);
        ctx.lineTo(player.x + player.width, topY);
        ctx.stroke();
        ctx.restore();
    }
}

// Background Renderer - Procedural underground cave with glowing crystals
class BackgroundRenderer {
    static _cache = new Map();

    static drawCaveBackground(ctx, width, height, timeSec = (Date.now() / 1000)) {
        ctx.save();

        // Base gradient sky for cavern
        const base = ctx.createLinearGradient(0, 0, 0, height);
        base.addColorStop(0, '#121a23');
        base.addColorStop(0.5, '#0f1a22');
        base.addColorStop(1, '#0a1117');
        ctx.fillStyle = base;
        ctx.fillRect(0, 0, width, height);

        // Distant parallax cave arches
        const t = timeSec;
        this.#drawCaveLayer(ctx, width, height, 0.15, 0.08, t * 8);
        this.#drawCaveLayer(ctx, width, height, 0.25, 0.12, -t * 10);
        this.#drawCaveLayer(ctx, width, height, 0.4, 0.18, t * 14);

        // Subtle wall texture (seeded speckles) to avoid flicker
        this.#drawSpeckles(ctx, width, height, 1200, 'rgba(255,255,255,0.03)');
        this.#drawSpeckles(ctx, width, height, 800, 'rgba(0,0,0,0.04)');

        // Crystal clusters with soft glow
        this.#drawCrystals(ctx, width, height, t);

        // Soft vignette to keep focus on center
        const vignette = ctx.createRadialGradient(width * 0.5, height * 0.6, Math.min(width, height) * 0.2, width * 0.5, height * 0.6, Math.max(width, height) * 0.8);
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.35)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);

        ctx.restore();
    }

    static #getSeededRandom(seed) {
        let s = seed >>> 0;
        return function() {
            s = (s * 1664525 + 1013904223) >>> 0;
            return s / 4294967296;
        };
    }

    static #getLayout(width, height) {
        const key = `${width}x${height}`;
        if (this._cache.has(key)) return this._cache.get(key);

        const rand = this.#getSeededRandom(1337 + width * 31 + height * 17);

        // Crystals
        const crystalCount = Math.max(6, Math.floor(width / 140));
        const crystals = [];
        for (let i = 0; i < crystalCount; i++) {
            const x = 30 + rand() * (width - 60);
            const y = 140 + rand() * (height - 220);
            const scale = 0.6 + rand() * 0.9;
            const hue = [185, 200, 250, 275][Math.floor(rand() * 4)];
            const pulse = 0.6 + rand() * 1.2;
            crystals.push({ x, y, scale, hue, pulse });
        }

        // Speckle points
        const speckleRand = this.#getSeededRandom(9001 + width * 13 + height * 7);
        const speckles = new Array(600).fill(0).map(() => ({
            x: speckleRand() * width,
            y: speckleRand() * height,
            r: 0.3 + speckleRand() * 0.9
        }));

        const layout = { crystals, speckles };
        this._cache.set(key, layout);
        return layout;
    }

    static #drawSpeckles(ctx, width, height, density, color) {
        const { speckles } = this.#getLayout(width, height);
        ctx.save();
        ctx.fillStyle = color;
        for (let i = 0; i < Math.min(density, speckles.length); i++) {
            const p = speckles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    static #drawCaveLayer(ctx, width, height, depthAlpha, frequency, offsetX) {
        const layerHeight = height * 0.7;
        const baseY = height * 0.28 + depthAlpha * 60;
        const color = `rgba(20, 35, 50, ${0.35 + depthAlpha})`;
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, height);

        const segments = 16;
        for (let i = 0; i <= segments; i++) {
            const x = (i / segments) * width;
            const n = Math.sin((i * frequency) + offsetX * 0.01) + Math.sin((i * frequency * 0.7) - offsetX * 0.012) * 0.6;
            const y = baseY + n * (30 + depthAlpha * 60);
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();

        // Hanging stalactites
        ctx.globalAlpha = 0.25 + depthAlpha * 0.4;
        for (let i = 0; i < 10; i++) {
            const x = ((i + 0.2) / 10) * width + Math.sin((i + offsetX) * 0.2) * 10;
            const tipY = baseY - (20 + depthAlpha * 40) - (i % 2 === 0 ? 10 : 0);
            const base = baseY + 4;
            ctx.beginPath();
            ctx.moveTo(x - 6, base);
            ctx.lineTo(x, tipY);
            ctx.lineTo(x + 6, base);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }

    static #drawCrystals(ctx, width, height, t) {
        const { crystals } = this.#getLayout(width, height);
        ctx.save();
        crystals.forEach(c => {
            const pulse = 0.75 + Math.sin(t * c.pulse + (c.x + c.y) * 0.01) * 0.25;
            const glowRadius = 28 * c.scale * pulse;

            // Glow (additive)
            ctx.globalCompositeOperation = 'lighter';
            const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, glowRadius);
            grad.addColorStop(0, `hsla(${c.hue}, 80%, 70%, 0.55)`);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(c.x, c.y, glowRadius, 0, Math.PI * 2);
            ctx.fill();

            // Crystal body (simple shard cluster)
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = `hsla(${c.hue}, 60%, 60%, 0.9)`;
            ctx.strokeStyle = `hsla(${c.hue}, 70%, 80%, 0.8)`;
            ctx.lineWidth = 1;

            const shardCount = 3 + Math.floor(c.scale * 3);
            for (let i = 0; i < shardCount; i++) {
                const ang = (-Math.PI / 2) + (i - (shardCount - 1) / 2) * 0.35;
                const len = 20 * c.scale * (1 + i * 0.2);
                const w = 6 * c.scale * (1 + (i % 2) * 0.3);
                const x1 = c.x + Math.cos(ang - 0.2) * (w * 0.5);
                const y1 = c.y + Math.sin(ang - 0.2) * (w * 0.5);
                const x2 = c.x + Math.cos(ang + 0.2) * (w * 0.5);
                const y2 = c.y + Math.sin(ang + 0.2) * (w * 0.5);
                const tipX = c.x + Math.cos(ang) * len;
                const tipY = c.y + Math.sin(ang) * len;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(tipX, tipY);
                ctx.lineTo(x2, y2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            // Ground reflection glow
            const floorY = Math.min(height - 40, c.y + 60);
            const reflect = ctx.createRadialGradient(c.x, floorY, 2, c.x, floorY, 38 * c.scale);
            reflect.addColorStop(0, `hsla(${c.hue}, 70%, 65%, 0.18)`);
            reflect.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = reflect;
            ctx.beginPath();
            ctx.ellipse(c.x, floorY, 36 * c.scale, 10 * c.scale, 0, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }
}