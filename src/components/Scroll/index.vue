<template>
    <article class="m-scroll" ref="scrollHook">
        <slot></slot>
    </article>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'

    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: []
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            threshold: {
                type: Number,
                default: 50
            },
            scrollMore: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initScroll()
            })
        },
        methods: {
            initScroll() {
                this.scroll = new BScroll(this.$refs.scrollHook, {
                    probeType: this.probeType,
                    click: this.click
                })

                if (this.listenScroll) {
                    this.scroll.on('scroll', pos => {
                        this.$emit('onScroll', pos)
                    })
                }

                if (this.scrollMore) {
                    this.scroll.on('scrollEnd', () => {
                        if (this.scroll.y <= this.scroll.maxScrollY + this.threshold) {
                            this.$emit('onScrollEnd')
                        }
                    })                
                }

                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('onBeforeScroll')
                    })
                }
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            destroy() {
                this.scroll && this.scroll.destroy()
            },
            scrollToElement(el, ...args) {
                this.scroll && this.scroll.scrollToElement(el, args)
            }
        },
        watch: {
            data(newVal) {
                this.$nextTick(() => {
                    this.refresh()
                })
            },
            hasMore(newValue) {
                console.log(newValue)
            }
        }
    }
</script>

<style scoped lang="scss">
    .m-scroll {
        height: 100%;
        overflow: hidden;
    }
</style>
