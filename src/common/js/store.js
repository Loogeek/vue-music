const store = {
    storage: window.localStorage,
    session: {
        storage: window.sessionStorage
    }
}

const api = {
    get(key) {
        if (this.disabled) return

        return deserialize(this.storage.getItem(key))
    },
    set(key, val) {
        if (this.disabled) return

        if (val === undefined) {
            this.storage.remove(key)
        }

        this.storage.setItem(key, serialize(val))
    },
    remove(key) {
        if (this.disabled) return

        this.storage.removeItem(key)
    },
    has(key) {
        if (this.disabled) return

        return this.get(key) !== undefined
    },
    clear() {
        if (this.disabled) return

        this.storage.clear()
    },
    getAll() {
        if (this.disabled) return null

        let ret = {}

        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i)
            const val = this.get(key)
            ret[key] = val
        }
        return ret
    }
}

Object.assign(store, api)

Object.assign(store.session, api)

function serialize(val) {
    return JSON.stringify(val)
}

function deserialize(val) {
    if (typeof val !== 'string') {
        return undefined
    }

    try {
        return JSON.parse(val)
    } catch (e) {
        return val || undefined
    }
}

try {
    const testKey = '__testKey__'
    store.set(testKey, testKey)
    if (store.get(testKey) !== testKey) {
        store.disabled = true
    }
    store.remove(testKey)
} catch (error) {
    store.disabled = true
}

export default store
