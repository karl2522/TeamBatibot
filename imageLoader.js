// Image Loader Class - Handles all character images
class ImageLoader {
    static images = {};
    static loaded = false;
    
    static loadImages() {
        return new Promise((resolve) => {
            const imagesToLoad = [
                { name: 'fireboy', src: 'fireboy.png' },
                { name: 'watergirl', src: 'watergirl.png' }
            ];
            
            let loadedCount = 0;
            
            imagesToLoad.forEach(imageData => {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    console.log(`✅ Loaded: ${imageData.name}`);
                    if (loadedCount === imagesToLoad.length) {
                        this.loaded = true;
                        console.log('🎉 All images loaded successfully!');
                        resolve();
                    }
                };
                img.onerror = () => {
                    console.warn(`⚠️ Failed to load: ${imageData.name}`);
                    loadedCount++;
                    if (loadedCount === imagesToLoad.length) {
                        this.loaded = true;
                        resolve();
                    }
                };
                img.src = imageData.src;
                this.images[imageData.name] = img;
            });
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