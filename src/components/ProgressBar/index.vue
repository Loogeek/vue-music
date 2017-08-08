<template>
    <section class="progress-bar" ref="progressBar">
        <article class="progress-bar-wrp" ref="barWrp">
            <div class="progress" ref="progress"></div>
            <div class="btn" ref="progressBtn" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
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
        this.touches = {
            startX: 0,
            changeX: 0
        }
    },
    methods: {
        handleTouchStart(e) {
            this.touches.startX = e.touches[0].pageX
        },
        handleTouchMove(e) {
            this.touches.changeX = e.touches[0].pageX - this.touches.startX
            console.log(e.touches[0].pageX, this.touches.startX)
            this.moveProgressBtn(this.touches.changeX)
        },
        handleleTouchEnd(e) {

        },
        moveProgressBtn(offChange) {
            this.$refs.progress.style.width = `${offChange}px`
            this.$refs.progressBtn.style[prefixTransform] = `translate3d(${offChange}px, 0, 0)`
        }
    },
    watch: {
        timePercent(newPercent) {
            const offChange = newPercent * this.$refs.barWrp.clientWidth
            this.moveProgressBtn(offChange)
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

