export function onAddRender(layerId, callback) {
    if (!(callback instanceof Function)) return false

    const layer = this.layers[layerId]
    
    return layer.set(layer.size + 1, callback)
}

export function onUpdateLayers() {
    for (const layerId in this.layers) {
        const layer = this.layers[layerId]

        layer.forEach((callback) => {
            callback()
        })
    }
}

export function onInit() {}