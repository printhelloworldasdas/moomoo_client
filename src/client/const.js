import config from "../config.json"
import protocol from "../protocol.json"
import Gui from "./gui/Gui.js"
import Input from "./input/Input.js"
import Scene from "./scene/Scene.js"
import Socket from "./socket/Socket.js"
import Storage from "./storage/Storage.js"
import Images from "./textures/Images.js"
import UI from "./ui/UI.js"

export const gameConfig = config
export const gameProtocol = protocol

export const input = new Input()
export const storage = new Storage()
export const images = new Images()
export const ui = new UI()
export const gui = new Gui()
export const socket = new Socket()
export const scene = window.scene = new Scene("#game_canvas")
export const mainContext = scene.getRenderContext()