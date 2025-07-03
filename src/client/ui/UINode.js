export default class UINode {
    constructor(selector) {
        this.node = typeof selector === 'string' ? document.querySelector(selector) : selector
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

    getAll(selector) {
        const nodes = this.node.querySelectorAll(selector)

        return [ ...nodes ].map((node) => new UINode(node))
    }

    getAttr(attribute) {
        return this.node.getAttribute(attribute)
    }

    setText(value) {
        this.node.innerHTML = value.toString()

        return this
    }

    setValue(value) {
        this.node.value = value.toString()

        return this
    }

    setStyle(styleKey, value) {
        this.node.style[styleKey] = value
    }

    setAttr(attribute, value) {
        this.node.setAttribute(attribute, value)
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

    append(content) {
        if (typeof content === 'string') {
            return this.node.insertAdjacentHTML("beforeend", content)
        }

        this.node.appendChild(content)
    }

    on(eventKey, listener) {
        this.node.addEventListener(eventKey, listener, false)
    } 
}