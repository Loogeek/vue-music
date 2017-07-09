<template>
    <transition name="slide">
        <section class="singer-detail">
            <ul class="song-list">
                <li class="song-list-item" v-for="(item, index) in songList" :key="index"></li>
            </ul>
        </section>
    </transition>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        mounted() {
            const singerId = this.$route.params.id;
 
            if (singerId) {
                this.fetchSingerDetail(singerId);
            } else {
                this.$route.back();
            }
        },
        computed: {
            ...mapGetters([
                'songList'
            ])
        },
        methods: {
            ...mapActions([
                'fetchSingerDetail'
            ])
        }
    };
</script>

<style lang="scss" scoped>
    .slide-enter-active, .slider-leave-active {
        transition: all .3s linear;
    }

    .slide-enter, .slide-leave-to {
        transform: translateX(100%);
    }

    .singer-detail {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background-color: #222;
    }
</style>
