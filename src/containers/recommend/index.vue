<template>
    <section class="recommend">
        <slider v-if="slideList.length" :slideList="slideList"></slider>
    </section>
</template>

<script type="text/ecmascript-6">
    import Slider from 'components/Slider';
    import { fetchSliderList } from 'api/recommend';
    import { ERR_OK } from 'api/config';

    export default {
        data() {
            return {
                slideList: []
            };
        },
        created() {
            this.fetchSliderList();
        },
        methods: {
            fetchSliderList() {
                fetchSliderList().then(resp => {
                    if (resp.code === ERR_OK) {
                        this.slideList = resp.data.slider;
                    }
                }).catch(err => {
                    console.warn(err);
                });
            }
        },
        components: {
            Slider
        }
    };
</script>

<style scoped lang="scss">
    .recommend {
        overflow: hidden;
    }
</style>