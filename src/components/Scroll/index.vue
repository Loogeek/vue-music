<template>
    <article class="m-scroll" ref="scrollHook">
        <slot></slot>
    </article>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';

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
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initScroll();
            });
        },
        methods: {
            initScroll() {
                this.scroll = new BScroll(this.$refs.scrollHook, {
                    probeType: this.probeType,
                    click: this.click
                });
            },
            enable() {
                this.scroll && this.scroll.enable();                
            },
            disable() {
                this.scroll && this.scroll.disable();                
            },            
            refresh() {
                this.scroll && this.scroll.refresh();
            },
            destroy() {
                this.scroll && this.scroll.destroy();                
            },
            scrollToElement(el, ...args) {
                this.scroll && this.scroll.scrollToElement(el, args);
            }
        },
        watch: {
            data() {
                this.$nextTick(() => {
                    this.refresh();
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    .m-scroll {
        height: 100%;
        overflow: hidden;
    }
</style>
