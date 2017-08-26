// whether is empty object
export const isEmptyObject = obj => {
    for (let name in obj) {
        return false
    }
    return true
}

export const formatTime = time => {
    const integerTime = time | 0
    let minutes = (integerTime / 60) | 0
    let seconds = integerTime % 60

    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds

    return `${minutes}:${seconds}`
}

export const debounce = (func, delay = 200) => {
    let timer

    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

function getRandomInc(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const shuffle = arr => {
    const _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        const t = getRandomInc(0, i)
        const l = _arr[i]
        arr[i] = _arr[t]
        _arr[t] = l
    }

    return _arr
}
