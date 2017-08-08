export class Singer {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    }
}

export class CreateSong {
    constructor(props) {
        this.albumname = props.albumname
        this.albummid = props.albummid
        this.songname = props.songname
        this.singer = filterSinger(props.singer)
        this.interval = props.interval
        this.image = props.albummid
            ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${props.albummid}.jpg?max_age = 2592000`
            : ''
        this.url = `http://ws.stream.qqmusic.qq.com/${props.songid}.m4a?fromtag=46`
    }
}

function filterSinger(singer) {
    if (!singer) return ''

    const retSinger = singer.map(item => item.name)

    return retSinger.join('/')
}
