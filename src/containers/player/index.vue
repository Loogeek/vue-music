<template>
    <section class="music-player">
        <article class="music-player-larger">
            <header class="larger-title">
                <span class="back">
                    <i class="icon-back"></i>
                </span>
                <h2 class="title"></h2>
                <h3 class="subtitle"></h3>
            </header>
            <div class="larger-body">
                <div class="larger-body-left">

                </div>
                <div class="larger-body-right"></div>
            </div>
            <div class="bg-image">
                <img src="" alt="">
            </div>
        </article>
        <article class="music-player-mini"></article>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'playSong'
            ])
        }
    };
</script>

<style lang="scss" scoped>

</style>

