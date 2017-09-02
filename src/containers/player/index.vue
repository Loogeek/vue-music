<template>
    <section class="music-player" v-show="playSong.playList.length > 0">
        <transition name="large-player-an" @enter="largeEnterAn" @after-enter="largeAfterEnterAn" @leave="largeLeaveAn" @after-leave="largeAfterLeaveAn">
            <article class="large-player" v-show="playSong.fullScreen">
                <header class="large-player-header">
                    <span class="back">
                        <i class="icon-back" @click="handleBack"></i>
                    </span>
                    <h2 class="songname" v-html="playSong.currentSong.songname"></h2>
                    <h3 class="singer" v-html="playSong.currentSong.singer"></h3>
                </header>
                <div class="large-player-body"
                    @touchstart.prevent="handlePlayerBodyStart" 
                    @touchmove.prevent="handlePlayerBodyMove" 
                    @touchend="handlePlayerBodyEnd"
                >
                    <div class="large-player-body-left" ref="largeCd">
                        <div class="cd-wrapper">
                            <img :src="playSong.currentSong.image" :class="['playing', { 'playing-pause': !playSong.playing } ]">
                        </div>
                        <div class="playing-lyric-wrapper">
                            <p class="lyric">{{ playingLyric }}</p>
                        </div>
                    </div>
                    <div class="large-player-body-right" ref="songLyric">
                        <scroll :data="currentLyric && currentLyric.lines"
                            ref="lyricScroll"
                            v-if="currentLyric && currentLyric.lines.length > 0"  
                        >
                            <ul class="song-lyric">
                                <li :class="['song-lyric-item', {'current': currentLyricNum === index}]" 
                                    v-for="(line, index) in currentLyric.lines" 
                                    :key="index"
                                    ref="songLyricItem"
                                >
                                    {{ line.txt }}
                                </li>
                            </ul>
                        </scroll>
                    </div>
                    <ul class="lyric-dot">
                        <li :class="['lyric-dot-item', {'active': !showLyric}]"></li>
                        <li :class="['lyric-dot-item', {'active': showLyric}]"></li>
                    </ul>
                </div>
                <footer class="large-player-footer">
                    <div class="progress">
                        <span class="progress-time progress-currentTime">{{ formatPlayTime(currentTime) }}</span>
                        <ProgressBar :timePercent="timePercent" @onPercentChange="handlePercentChange" />
                        <span class="progress-time progress-interval">{{ formatPlayTime(playSong.currentSong.interval) }}</span>
                        <audio ref="songAudio" :src="playSong.currentSong.url" @timeupdate="handleUpdateTime" @ended="handleNextSong" @canplay="handleSongCanPlay" @error="handleSongError">
                        </audio>
                    </div>
                    <nav class="operators">
                        <span class="operators-icon i-left">
                            <i :class="playMode"></i>
                        </span>
                        <span :class="['operators-icon', 'i-left', {'disable': !canPlay}]" @click="handlePrevSong">
                            <i class="icon-prev"></i>
                        </span>
                        <span :class="['operators-icon', 'i-center', {'disable': !canPlay}]" @click="handleTogglePlaying">
                            <i :class="playIcon"></i>
                        </span>
                        <span :class="['operators-icon', 'i-right', {'disable': !canPlay}]" @click="handleNextSong">
                            <i class="icon-next"></i>
                        </span>
                        <span class="operators-icon i-right">
                            <i class="icon-not-favorite"></i>
                        </span>
                    </nav>
                </footer>
                <div class="large-player-bgimg">
                    <img :src="playSong.currentSong.image">
                </div>
            </article>
        </transition>
        <transition name="mini-player-an">
            <article class="mini-player" v-show="!playSong.fullScreen" @click="handleShow">
                <div class="mini-player-img">
                    <img ref="miniCd" 
                        :src="playSong.currentSong.image" 
                        :class="['playing', { 'playing-pause': !playSong.playing } ]"
                    >
                </div>
                <div class="mini-player-content">
                    <h3 class="songname" v-html="playSong.currentSong.songname"></h3>
                    <p class="singer" v-html="playSong.currentSong.singer"></p>
                </div>
                <div class="mini-player-control">
                    <ProgressCircle :timePercent="timePercent">
                        <i :class="['icon-mini', miniPlayIcon]"
                            @click.stop="handleTogglePlaying">
                        </i>
                    </ProgressCircle>
                </div>
                <div class="mini-player-control">
                    <i class="icon-playlist"></i>
                </div>
            </article>
        </transition>
        <Modal ref="modal" 
            @onSelectConfirm="handleSelectConfirm"
            @onSelectCancel="handleSelectCancel"
        >
        </Modal>
    </section>
</template>

<script>
    import createAnimation from 'create-keyframe-animation'
    import { mapGetters, mapMutations } from 'vuex'
    import ProgressBar from 'components/ProgressBar'
    import ProgressCircle from 'components/ProgressCircle'
    import { prefixStyle } from 'common/js/dom'
    import { formatTime, shuffle } from 'common/js/utils'
    import Lyric from 'lyric-parser'
    import Modal from 'components/Modal'
    import Scroll from 'components/Scroll'
    import { Base64 } from 'js-base64'
    import { ERR_OK, playMode } from 'api/config'
    import { fetchSongLyricReq } from 'api/song'

    const prefixTransform = prefixStyle('transform')
    const prefixTransition = prefixStyle('transition')

    export default {
        mouthed() {
            this.touch = {
                touching: false,
                startX: 0,
                startY: 0,
                changeX: 0
            }
        },
        data() {
            return {
                canPlay: false,
                currentTime: 0,
                timePercent: 0,
                currentLyric: '',
                playingLyric: '',
                currentLyricNum: 0,
                showLyric: false
            }
        },
        computed: {
            playIcon() {
                return this.playSong.playing ? 'icon-pause' : 'icon-play'
            },
            miniPlayIcon() {
                return this.playSong.playing ? 'icon-pause-mini' : 'icon-play-mini'
            },
            playMode() {
                const { mode } = this.playSong

                return mode === playMode.sequence ? 'icon-sequence' : mode === playMode.loop ? 'icon-loop' : 'icon-random'
            },
            ...mapGetters([
                'playSong'
            ])
        },
        methods: {
            formatPlayTime(time) {
                return formatTime(time)
            },
            largeEnterAn(el, done) {
                const { x, y, scale } = this._getPosAndScale()

                const animation = {
                    '0%': {
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                    },
                    '50%': {
                        transform: `translate3d(0, 0, 0) scale(1.1)`
                    },
                    '100%': {
                        transform: `translate3d(0, 0, 0) scale(1)`
                    }
                }
                this._createAnimation(animation, done)
            },
            largeAfterEnterAn(el) {
                createAnimation.unregisterAnimation('move')
                this.$refs.largeCd.style.animation = ''
            },
            largeLeaveAn(el, done) {
                const { x, y, scale } = this._getPosAndScale()

                const animation = {
                    '0%': {
                        transform: `translate3d(0, 0, 0) scale(1)`
                    },
                    '100%': {
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                    }
                }

                this._createAnimation(animation, done)
            },
            largeAfterLeaveAn() {
                const largeCdStyle = this.$refs.largeCd.style
                largeCdStyle.animation = ''
                largeCdStyle[prefixTransform] = ''
            },
            handleBack() {
                this.setFullScreen(false)
            },
            handleShow() {
                this.setFullScreen(true)
            },
            handlePrevSong() {
                if (this.canPlay) {
                    let index = this.playSong.currentIndex
                    index--
                    if (index === -1) {
                        index = this.playSong.playList.length - 1
                    }
                    this._stopToPlay()

                    this.setCurrentIndex(index)
                    this.canPlay = false
                }
            },
            handleNextSong() {
                if (this.canPlay) {
                    let index = this.playSong.currentIndex
                    index++
                    if (index === this.playSong.playList.length) {
                        index = 0
                    }
                    this._stopToPlay()

                    this.setCurrentIndex(index)
                    this.canPlay = false
                }
            },
            handleTogglePlaying() {
                this.setPlayingStatus(!this.playSong.playing)
                if (this.currentLyric) {
                    this.currentLyric.togglePlay()   // 暂停or播放歌词
                }
            },
            handleUpdateTime(e) {
                const { currentTime } = e.target
                this.currentTime = currentTime
                this.timePercent = currentTime / this.playSong.currentSong.interval
            },
            handleSongCanPlay() {
                this.canPlay = true
            },
            handleSongError() {
                this.canPlay = false
            },
            handlePercentChange(newPercent) {
                const currentTime = newPercent * this.playSong.currentSong.interval
                this.$refs.songAudio.currentTime = currentTime
                if (this.currentLyric) {
                    this.currentLyric.seek(currentTime * 1000)
                }
                this._stopToPlay()
            },
            handleShowPlayList() {
                this.$refs.modal.show()
            },
            handleSelectConfirm() {
                this.$refs.modal.hide()
            },
            handleSelectCancel() {
                this.$refs.modal.hide()
            },
            handleSetPlayMode() {
                const mode = (this.playSong.mode + 1) % 3
                const { sequenceList } = this.playSong
                this.setPlayMode(mode)

                if (mode === playMode.random) {
                    const playList = shuffle(sequenceList)
                    // const songId = this.playSong.currentSong.albummid
                    // this.handleResetCurrentIndex(playList)
                    // this.setPlayList(playList)
                }
            },
            handleResetCurrentIndex(playList) {
                const index = playList.findIndex(item => item.id === this.playSong.currentSong.id)
                this.setCurrentIndex(index)
            },
            handlePlayerBodyStart(e) {
                this.touch = {
                    startX: e.touches[0].pageX,
                    startY: e.touches[0].pageY,
                    offWidth: -window.innerWidth,
                    offPercent: 0
                }
            },
            handlePlayerBodyMove(e) {
                this.touch.diffX = e.touches[0].pageX - this.touch.startX
                this.touch.diffY = e.touches[0].pageY - this.touch.startY

                if (Math.abs(this.touch.diffY) > Math.abs(this.touch.diffX)) {   // 忽略垂直滚动
                    return
                } 
                
                const offLeft = this.showLyric ? -window.innerWidth : 0 
                this.touch.offWidth = Math.min(0, Math.max(-window.innerWidth, offLeft + this.touch.diffX))
                this.touch.offPercent = Math.abs(this.touch.offWidth / window.innerWidth)

                this.$refs.songLyric.style[prefixTransform] = `translate3d(${this.touch.offWidth}px, 0, 0)`
                this.$refs.largeCd.style.opacity = 1 - this.touch.offPercent
            },
            handlePlayerBodyEnd(e) {
                if (Math.abs(this.touch.diffY) > Math.abs(this.touch.diffX)) {   // 忽略垂直滚动
                    return
                } 

                const offPercent = this.touch.offPercent
                const time = 300
                let offWidth
                let cdOpacity
                
                if (this.showLyric) {
                    if (offPercent > 0.9) {
                        offWidth = -window.innerWidth
                        cdOpacity = 0
                        this.showLyric = true                        
                    } else {
                        offWidth = 0
                        cdOpacity = 1                        
                        this.showLyric = false                        
                    }
                } else {
                    if (offPercent > 0.1) {
                        offWidth = -window.innerWidth
                        cdOpacity = 0
                        this.showLyric = true
                    } else {
                        offWidth = 0
                        cdOpacity = 1                        
                        this.showLyric = false
                    }                    
                }

                const songLyricStyle = this.$refs.songLyric.style
                const cdStyle =  this.$refs.largeCd.style
                songLyricStyle[prefixTransition] = `${time}ms`
                songLyricStyle[prefixTransform] = `translate3d(${offWidth}px, 0, 0)`
                cdStyle[prefixTransition] = `${time}ms`
                cdStyle.opacity = cdOpacity
            },
            _stopToPlay() {
                if (!this.playSong.playing) {
                    this.handleTogglePlaying()
                }
            },
            _createAnimation(animation, done) {
                createAnimation.registerAnimation({
                    name: 'move',
                    animation,
                    presets: {
                        duration: 400,
                        easing: 'linear'
                    }
                })

                createAnimation.runAnimation(this.$refs.largeCd, 'move', done)
            },
            _getPosAndScale() {
                const SINGER_NAME_HEIGHT = 40          // 顶部歌曲栏高度
                const SINGER_NAME_MAR_BOTTOM = 25      // 歌曲栏下边距
                const MINI_CD_WIDTH = 40
                const MINI_CD_PADDING_LEFT = 20
                const MINI_CD_PADDING_TOP = 10
                const LARGE_CD_WIDTH = window.innerWidth * 0.8

                const x = -(window.innerWidth / 2 - MINI_CD_WIDTH / 2 - MINI_CD_PADDING_LEFT)
                const y = window.innerHeight - LARGE_CD_WIDTH / 2 - SINGER_NAME_HEIGHT - SINGER_NAME_MAR_BOTTOM - MINI_CD_WIDTH / 2 - MINI_CD_PADDING_TOP
                const scale = MINI_CD_WIDTH / LARGE_CD_WIDTH

                return { x, y, scale }
            },
            handlerSongLyric({lineNum, txt}) {
                const lyricLen = this.currentLyric.lines.length
                this.currentLyricNum = lineNum
                this.playingLyric = txt
                if (lineNum > 6) {
                    const el = this.$refs.songLyricItem[lineNum - 6]
                    this.$refs.lyricScroll.scrollToElement(el, 1000)
                }
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setPlayingStatus: 'SET_PLAYING_STATUS',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayMode: 'SET_PLAY_MODE',
                setPlayList: 'SET_PLAY_LIST',
                setSongLyric: 'SET_SONG_LYRIC'
            })
        },
        watch: {
            playSong(newSong, oldSong) {
                const { currentSong } = newSong
                if (currentSong.id !== oldSong.currentSong.id) {
                    if (this.currentLyric) {    // 切换歌曲时需要清除之前歌词数据
                        this.currentLyricNum = 0
                        this.currentLyric.stop()
                        this.currentLyric = ''
                    }
                    fetchSongLyricReq(currentSong.songmid).then(resp => {
                        if (resp.code === ERR_OK) {
                            const lyric = Base64.decode(resp.lyric)
                            this.setSongLyric(lyric)
                            this.currentLyric = new Lyric(lyric, this.handlerSongLyric)
                            if (newSong.playing) {
                                this.currentLyric.play()
                            }
                        } else {
                            console.warn('fetch song lyric error:', resp.message)
                        }
                    })
                }

                const audio = this.$refs.songAudio
                this.$nextTick(() => {
                    newSong.playing ? audio.play() : audio.pause()
                })
            }
        },
        components: {
            ProgressBar,
            ProgressCircle,
            Modal,
            Scroll
        }
    }
</script>

<style lang="scss" scoped>
    @import './style';
</style>

