<template>
    <ul class="switches">
        <li class="switches-item"
            v-for="(item, index) in switches"
            :class="{'active': currentIndex === index}"
            @click="handleSwitchItem(index)"
        >
            <span>{{ item.name }}</span>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            switches: {
                type: Array,
                default: []
            },
            currentIndex: {
                type: Number,
                default: 0
            }
        },
        methods: {
            handleSwitchItem(index) {
                this.$emit('onChangeSwitch', index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~common/scss/variable";

    .switches {
        display: flex;
        align-items: center;
        width: 240px;
        margin: 0 auto;
        border: 1px solid $color-highlight-background;
        border-radius: 5px;

        &-item {
            flex: 1;
            padding: 8px;
            text-align: center;
            font-size: $font-size-medium;
            color: $color-text-d;

            &.active {
                background-color: $color-highlight-background;
                color: $color-text;
            }
        }
    }
</style>