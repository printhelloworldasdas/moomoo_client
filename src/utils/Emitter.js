export default class Emitter {
    constructor() {
        this._events = new Map()
    }

    has(eventName) {
        return this._events.has(eventName)
    }

    on(eventName, listener) {
        const listeners = this._events.get(eventName)

        if (!listeners) {
            return this._events.set(eventName, [ listener ])
        }

        listeners.push(listener)
    }

    emit(eventName, ...args) {
        if (!this._events.has(eventName)) return false

        this._events.get(eventName).forEach((listener) => {
            listener(...args)
        })
    }
}