import images_map from "./textures/images_map.json"
import { images, scene, socket, ui } from "./const.js"
import initUIEvents from "./ui/initUIEvents.js"
import Renderer from "./render/Renderer.js"
import "./events/initEvents.js"

ui.cardsContainer.hide()
ui.loadingText.toLoading().show()

scene.emit("init")

Renderer.onFrame(scene.renderer.update.bind(scene.renderer))

images.loadImages(images_map).then(() => {
    initUIEvents()
    ui.loadingText.toConnecting()

    socket.connect().then(() => {
        ui.loadingText.toLoading().hide()
        ui.cardsContainer.show()
    })
})