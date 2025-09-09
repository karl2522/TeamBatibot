// Image Loader Class - Handles all character images
class ImageLoader {
    static images = {};
    static loaded = false;
    
    static loadImages() {
        const imageDefs = [
            { name: 'fireboy', srcs: ['assets/images/fireboy.png', '../assets/images/fireboy.png', './assets/images/fireboy.png'] },
            { name: 'watergirl', srcs: ['assets/images/watergirl.png', '../assets/images/watergirl.png', './assets/images/watergirl.png'] },
            { name: 'game-bg', srcs: ['assets/images/game-bg.jpg', '../assets/images/game-bg.jpg', './assets/images/game-bg.jpg'] },
            { name: 'crystal-orb', srcs: ['assets/images/crystal-orb.png', '../assets/images/crystal-orb.png', './assets/images/crystal-orb.png'] },
            { name: 'smoke-orb', srcs: ['assets/images/smoke-orb.png', '../assets/images/smoke-orb.png', './assets/images/smoke-orb.png'] },
            { name: 'gravity-orb', srcs: ['assets/images/gravity-orb.png', '../assets/images/gravity-orb.png', './assets/images/gravity-orb.png'] },
            { name: 'laser-beam', srcs: ['assets/images/laser-beam.png', '../assets/images/laser-beam.png', './assets/images/laser-beam.png'] }
        ];

        const loadOne = (def) => new Promise((resolve) => {
            const trySrc = (idx) => {
                if (idx >= def.srcs.length) {
                    console.warn(`⚠️ All sources failed for: ${def.name}`);
                    resolve();
                    return;
                }
                const img = new Image();
                img.onload = () => {
                    this.images[def.name] = img;
                    console.log(`✅ Loaded: ${def.name} from ${def.srcs[idx]}`);
                    resolve();
                };
                img.onerror = () => {
                    console.warn(`⚠️ Failed: ${def.name} at ${def.srcs[idx]} → retrying next`);
                    trySrc(idx + 1);
                };
                img.src = def.srcs[idx];
            };
            trySrc(0);
        });

        return Promise.all(imageDefs.map(loadOne)).then(() => {
            this.loaded = true;
            console.log('🎉 ImageLoader: all attempts finished.');
        });
    }
    
    static getImage(name) {
        return this.images[name];
    }
    
    static isImageLoaded(name) {
        const img = this.images[name];
        return img && img.complete && img.naturalHeight !== 0;
    }
}