// Level Manager Class - All level data
class LevelManager {
    static levels = {
        1: {
            name: "Temple Entrance",
            platforms: [
                // Main ground platforms (stone texture)
                { x: 0, y: 550, width: 200, height: 50, type: 'stone' },
                { x: 250, y: 550, width: 300, height: 50, type: 'stone' },
                { x: 600, y: 550, width: 200, height: 50, type: 'stone' },
                // Extended right-side ground to match 1200px world width
                { x: 800, y: 550, width: 400, height: 50, type: 'stone' },
                
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
                { x: 1180, y: 0, width: 20, height: 600, type: 'wall' },
                // Bottom frame (collidable floor) spanning entire width
                { x: 0, y: 580, width: 1200, height: 20, type: 'stone' },
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