export default class Storage {
    static storageKey = "moomooio_client_storage"

    static getLocalStorage() {
        return localStorage.getItem(Storage.storageKey)
    }

    constructor() {
        !this.isExist() && this._create()
    }
    
    isExist() {
        const parsed = JSON.parse(Storage.getLocalStorage())

        if (!parsed) return false

        const keys = Object.keys(parsed)

        return Boolean(keys.length)
    }

    getStorage() {
        return JSON.parse(Storage.getLocalStorage())
    }

    setStorage(value) {
        localStorage.setItem(Storage.storageKey, JSON.stringify(value))
    }

    set(key, value) {
        const storage = this.getStorage()

        storage[key] = value

        this.setStorage(storage)
    }

    get(key) {
        if (!this.isExist()) return false

        if (typeof key === 'undefined') {
            return this.getStorage()
        }

        return this.getStorage()[key]
    }

    _create() {
        localStorage.setItem(Storage.storageKey, JSON.stringify({}))
    }
}