export default class GuiNode {
    constructor(selector) {
        this.node = document.querySelector(selector)
    }

    get classes() {
        return this.node.classList
    }

    get isHidden() {
        return this.hasClass("hidden")
    }

    get value() {
        return this.node.value
    }

    setText(value) {
        this.node.innerHTML = value.toString()

        return this
    }

    setValue(value) {
        this.node.value = value.toString()

        return this
    }

    hasClass(className) {
        return this.classes.contains(className)
    }

    addClass(className) {
        this.classes.add(className)

        return this
    }

    removeClass(className) {
        this.classes.remove(className)

        return this
    }

    toggleClass(className) {
        this.classes.toggle(className)

        return this
    }

    hide() {
        this.addClass("hidden")

        return this
    }

    show() {
        this.removeClass("hidden")

        return this
    }

    toggle() {
        this.toggleClass("hidden")

        return this
    }

    on(eventKey, listener) {
        this.node.addEventListener(eventKey, listener, false)
    } 
}