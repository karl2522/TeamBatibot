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