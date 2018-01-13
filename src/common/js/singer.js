import { fetchVKey } from 'api/song'
import { getUid } from './uid'
import { ERR_OK } from 'api/config'

export class Singer {
  constructor(id, name) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

let urlMap = {}

export class CreateSong {
  constructor(props) {
    this.id = props.songid
    this.albumname = props.albumname
    this.songmid = props.songmid
    this.albummid = props.albummid
    this.songname = props.songname
    this.singer = filterSinger(props.singer)
    this.interval = props.interval
    this.filename = `C400${this.songmid}.m4a`
    this.image = props.albummid ?
      `https://y.gtimg.cn/music/photo_new/T002R300x300M000${props.albummid}.jpg?max_age = 2592000` :
      ''

    if (urlMap[this.id]) {
        this.url = urlMap[this.id]
    } else {
        this._genUrl()
    }
    // this.url = `http://ws.stream.qqmusic.qq.com/${props.songid}.m4a?fromtag=46`
  }

    _genUrl() {
        if (this.url) return
        fetchVKey(this.songmid, this.filename).then(res => {
            if (res.code === ERR_OK) {
                const vkey = res.data.items[0].vkey
                this.url = `http://dl.stream.qqmusic.qq.com/${this.filename}?vkey=${vkey}&guid=${getUid()}&uin=0&fromtag=66`
                urlMap[this.id] = this.url
            }
        })
    }
}

function filterSinger(singer) {
  if (!singer) return ''

  const retSinger = singer.map(item => item.name)

  return retSinger.join('/')
}
