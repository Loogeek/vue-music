<template>
    <section class="progress-bar" ref="progressBar">
        <article class="progress-bar-wrp" ref="barWrp" @click="handleProgressClick">
            <div class="progress" ref="progress"></div>
            <div class="btn" ref="progressBtn" 
                @touchstart.prevent="handleTouchStart" 
                @touchmove.prevent="handleTouchMove" 
                @touchend="handleTouchEnd"
            >
            </div>
        </article>
    </section>
</template>

<script>
import { prefixStyle } from 'common/js/dom'

const prefixTransform = prefixStyle('transform')

export default {
    props: {
        timePercent: {
            type: Number,
            default: 0
        }
    },
    created() {
        this.touch = {
            touching: false,
            startX: 0,
            changeX: 0,
            progressWidth: 0
        }
    },
    methods: {
        handleTouchStart(e) {
            this.touch.touching = true
            this.touch.startX = e.touches[0].pageX
            this.touch.progressWidth = this.$refs.progress.offsetWidth
        },
        handleTouchMove(e) {
            const barWidth = this.$refs.barWrp.clientWidth
            const difX = e.touches[0].pageX - this.touch.startX
            this.touch.changeX = Math.min(barWidth, Math.max(0, this.touch.progressWidth + difX))
            this._moveProgressBtn(this.touch.changeX)
            this._emitNewPercent(true)
        },
        handleTouchEnd(e) {
            this.touch.touching = false
            this._emitNewPercent()
        },
        handleProgressClick(e) {
            const changeX = e.pageX - this.$refs.progress.getBoundingClientRect().left
            this._moveProgressBtn(changeX)
            this._emitNewPercent()
        },
        _moveProgressBtn(offChange) {
            this.$refs.progress.style.width = `${offChange}px`
            this.$refs.progressBtn.style[prefixTransform] = `translate3d(${offChange}px, 0, 0)`
        },
        _emitNewPercent(touchProgressBar = false) {
            const barWidth = this.$refs.barWrp.clientWidth
            const newPercent = this.$refs.progress.offsetWidth / barWidth
            this.$emit('onPercentChange', newPercent, touchProgressBar)
        }
    },
    watch: {
        timePercent(newPercent) {
            if (newPercent >= 0 && !this.touch.touching) {
                const barWidth = this.$refs.barWrp.clientWidth
                const offChange = newPercent * barWidth
                this._moveProgressBtn(offChange)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.progress-bar {
    display: flex;
    position: relative;
    align-items: center;
    height: 3rem;

    &-wrp {
        width: 100%;
        height: .4rem;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, .3);

        .progress {
            width: 0;
            height: 100%;
            border-radius: 5px;
            background-color: $color-theme;
        }

        .btn {
            position: absolute;
            top: .8rem;
            left: -.7rem;
            width: 1.4rem;
            height: 1.4rem;
            box-sizing: border-box;
            border: .3rem solid $color-text;
            border-radius: 50%;
            background-color: $color-theme;
        }
    }
}
</style>

