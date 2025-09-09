// Level Manager Class - All level data
class LevelManager {
    static levels = {
        1: {
            name: "Easy - Training Grounds",
            platforms: [
                // Ground (grid-aligned 40px multiples)
                { x: 0, y: 550, width: 240, height: 50, type: 'stone' },
                // Lava pool gap
                { x: 240, y: 550, width: 0, height: 0, type: 'stone' },
                { x: 400, y: 550, width: 160, height: 50, type: 'stone' },
                // Water pool gap
                { x: 560, y: 550, width: 0, height: 0, type: 'stone' },
                { x: 720, y: 550, width: 260, height: 50, type: 'stone' },
                { x: 1020, y: 550, width: 180, height: 50, type: 'stone' },

                // Pools (20px deep so characters visually sink slightly)
                { x: 240, y: 530, width: 160, height: 20, type: 'lava' },
                { x: 560, y: 530, width: 160, height: 20, type: 'water' },

                // Simple steps and islands
                { x: 80, y: 470, width: 120, height: 30, type: 'stone' },
                { x: 360, y: 460, width: 120, height: 30, type: 'stone' },
                { x: 640, y: 460, width: 120, height: 30, type: 'stone' },
                { x: 900, y: 420, width: 140, height: 30, type: 'stone' },
                { x: 1080, y: 360, width: 80, height: 30, type: 'stone' },

                // Moving platforms (timed)
                { x: 480, y: 420, width: 80, height: 20, type: 'moving', moveX: true, range: 120, speed: 1.2 },
                { x: 840, y: 320, width: 80, height: 20, type: 'moving', moveY: true, range: 100, speed: 1 },

                // Boundary walls and bottom frame
                { x: 0, y: 0, width: 20, height: 600, type: 'wall' },
                { x: 1180, y: 0, width: 20, height: 600, type: 'wall' },
                { x: 0, y: 580, width: 1200, height: 20, type: 'stone' },
            ],
            collectibles: [
                { x: 120, y: 440, type: 'fire_gem' },
                { x: 380, y: 430, type: 'water_gem' },
                // Crystal orb power-up moved near left lava (circled spot)
                { x: 300, y: 480, type: 'crystal_orb' },
            ],
            goals: [
                { x: 1085, y: 330, width: 30, height: 30, type: 'fire' },
                { x: 1130, y: 330, width: 30, height: 30, type: 'water' }
            ],
            spikes: [
                { x: 720, y: 540, width: 40, height: 10 },
                { x: 980, y: 540, width: 40, height: 10 },
            ],
            lasers: [
                // Horizontal laser over the center corridor
                { x: 440, y: 500, width: 240, height: 6, orientation: 'horizontal', onMs: 900, offMs: 700, phaseMs: 0 }
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