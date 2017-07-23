<template>
    <section class="progress-bar" ref="progressBar">
        <article class="progress-bar-wrp">
            <div class="progress" ref="progress"></div>
            <div class="btn-wrp">
                <div class="btn"></div>
            </div>
        </article>
    </section>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.progress-bar {
    display: flex;
    align-items: center;
    height: 3rem;

    &-wrp {
        position: relative;
        height: .4rem;
        background-color: rgba(0, 0, 0, .3);

        .progress {
            height: 100%;
            background-color: $color-theme;
        }

        .btn-wrp{
            position: absolute;
            height: 100%;
            // width: 3rem;
            // height: 3rem;

            .btn {
                width: 1.6rem;
                height: 1.6rem;
                box-sizing: border-box;
                border: .3rem solid $color-text;
                border-radius: 50%;
                background-color: $color-theme;
            }
        }
    }
}
</style>

