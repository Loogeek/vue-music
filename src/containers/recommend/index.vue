<template>
    <section class="recommend">
        <slider></slider>
    </section>
</template>

<script type="text/ecmascript-6">
    import Slider from 'components/slider';
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
                        console.log(11, this.slideList);
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

</style>