<template>
    <article class="m-scroll" ref="scrollHook">
        <slot></slot>
    </article>
</template>

<script>
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
            date: {
                type: Array,
                default: null
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll();
            }, 20);
        },
        methods: {
            _initScroll() {
                this.BScroll = new BScroll(this.$refs.scrollHook, {
                    probeType: this.probeType,
                    click: this.click
                });
            },
            refresh() {
                this.BScroll && this.BScroll.refresh();
            },
            destroy() {
                this.BScroll && this.BScroll.destroy();
            }
        },
        watch: {
            date() {
                this.refresh();
            }
        }
    };
</script>

<style lang="sass">

</style>
