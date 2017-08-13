<template>
    <section class="progress-circle">
        <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="progress-circle-background" r="50" cx="50" cy="50" fill="transparent">
            </circle>
            <circle class="progress-circle-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset">
            </circle>
        </svg>
        <slot></slot>
    </section>
</template>

<script>
export default {
    props: {
        radius: {
            type: Number,
            default: 32
        },
        timePercent: {
            type: Number,
            default: 0
        }
    },
    computed: {
        dasharray() {
            return Math.PI * 100
        },
        dashoffset() {
            return (1 - this.timePercent) * 100 * Math.PI
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.progress-circle {
    position: relative;

    circle {
        stroke-width: 8px;
        transform-origin: center;
    }

    &-background {
        transform: scale(.9);
        stroke: $color-theme-d;
    }

    &-bar {
        transform: scale(.9) rotate(-90deg);
        stroke: $color-theme;
    }
}
</style>

