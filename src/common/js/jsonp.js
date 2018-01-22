import originJsonp from 'jsonp'
import { params } from '../../api/config'

export default function jsonp(url, data, opts) {
    const newUrl = url + (url.indexOf('?') !== -1 ? '&' : '?') + param(data)
    const newOpts = { ...params, ...opts }

    return new Promise((resolve, reject) => {
        originJsonp(newUrl, newOpts, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

export function param(data) {
    let url = ''
    Object.keys(data).map(key => {
        url += `&${key}=${encodeURI(data[key])}`
    })

    return url.substring(1)
}
