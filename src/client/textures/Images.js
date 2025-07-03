export default class Images extends Map {
    constructor() {
        super()
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image()

            image.onload = resolve.bind(null, image)
            image.onabort = reject
            image.onerror = reject

            image.src = `./assets/images${src}.png`
        })
    }

    async loadImages(images_map) {
        await this._loadFailedLoadImage()

        return new Promise(async (resolve) => {
            images_map = Object.entries(images_map)

            for (const imageArray of images_map) {
                await this.loadImage(imageArray[1]).then((image) => {
                    image.isLoaded = true

                    this.set(imageArray[0], image)
                }).catch(() => {
                    this.set(imageArray[0], this.get("failed_load"))
                })
            }

            resolve()
        })
    }

    _loadFailedLoadImage() {
        return new Promise(async (resolve) => {
            if (this.has("failed_load")) return resolve()

            await this.loadImage("/failed_load").then((failedLoadImage) => {
                failedLoadImage.isLoaded = false
                failedLoadImage.isFailedLoad = true

                resolve(this.set("failed_load", failedLoadImage))
            })
        })
    }
}