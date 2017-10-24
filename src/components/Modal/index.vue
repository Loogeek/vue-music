<template>
    <transition :name="`Modal-fade-${type}`">
        <article :class="['Modal', className]" v-if="showModal" @click.stop="handleCancel">
            <div :class="['Modal-container-wrp', type]">
                <div class="Modal-container">
                    <header class="Modal-header" v-if="title">
                        <h3 class="Modal-header-title">{{ title }}</h3>
                    </header>
                    <div class="Modal-content">
                        <p class="Modal-content-text" v-if="type === 'small'">
                            {{ contentText }}
                        </p>
                        <slot></slot>
                    </div>
                    <footer :class="['Modal-footer', type]">
                        <span class="Modal-footer-btn Modal-footer-cancel"
                            @click="handleCancel">
                            {{ cancelText }}
                        </span>
                        <span class="Modal-footer-btn Modal-footer-confirm"
                            v-if="confirmText"
                            @click="handleConfirm">
                            {{ confirmText }}
                        </span>
                    </footer>
                </div>
            </div>
        </article>
    </transition>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'small'
            },
            title: {
                type: String,
                default: '提示'
            },
            contentText: {
                type: String,
                default: ''
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            confirmText: {
                type: String,
                default: '确定'
            },
            className: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                showModal: false
            }
        },
        methods: {
            show() {
                this.showModal = true
            },
            hide() {
                this.showModal = false
            },
            handleConfirm() {
                this.$emit('onSelectConfirm')
            },
            handleCancel() {
                this.$emit('onSelectCancel')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~common/scss/variable';

    .Modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 5000;
        background-color: $color-background-d;
        opacity: 1;

        &-container-wrp {
            position: absolute;
            z-index: 5100;

            &.small {                
                width: 80%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            &.bottom {
                position: fixed;
                width: 100%;
                left: 0;
                bottom: 0;

                .Modal-content {
                    position: relative;
                }
            }
        }

        &-container {
            border-radius: 1rem;
            background-color: $color-highlight-background;
        }

        &-header {
            padding: 2rem 0 0 0;
            height: auto;
            line-height: 1.5;

            &-title {
                font-size: $font-size-large;
                color: $color-theme;
                text-align: center;
            }
        }

        &-content {
            padding: 1.5rem;
            text-align: center;
            line-height: 1.8;

            &-text {
                color: $color-text;
                font-size: $font-size-medium;
                color: $color-text-l;
            }
        }

        &-footer {
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px solid $color-background-d;

            &-btn {
                flex: 1;
                line-height: 2.2rem;
                text-align: center;
                padding: 1rem 0;
                font-size: $font-size-medium-x;
                color: $color-text-d;
            }

            &-confirm {
                border-left: 1px solid $color-background-d;
                color: $color-theme;
            }

            &.bottom {
                .Modal-footer {
                    line-height: 5rem;
                    background-color: $color-background;
                    font-size: $font-size-medium-x;
                    color: $color-text-l;
                }
            }
        }

        &-fade-small-enter-active, 
        &-fade-leave-active {
            transition: all .3s linear;
        }

        &-fade-small-enter-active {
            .Modal-container {
                animation: fade-scale-enter .3s;
            }

            @keyframes fade-scale-enter {
                0% {
                    transform: scale(0);
                }
                50% {
                    transform: scale(1.1);
                }
                100% {
                    transform: scale(1);
                }
            }
        }

        &-fade-small-leave-active {
            .Modal-container {
                animation: fade-scale-leave .3s;
            }

            @keyframes fade-scale-leave {
                0% {
                    transform: scale(1);
                }
                100% {
                    transform: scale(0);
                }
            }
        }

        &-fade-small-enter, &-fade-leave-to {
            opacity: 0;
        }

        // 底部弹窗过渡动画
        &-fade-bottom-enter-active,
        &-fade-bottom-leave-active {
            transition: all .3s linear;

            .Modal-container-wrp {
                &.bottom {
                    transition: all .3s linear;
                }
            }
        }

        &-fade-bottom-enter,
        &-fade-bottom-leave-to {
            .Modal {
                opacity: 0;
            }

            .Modal-container-wrp {
                &.bottom {
                    transform: translate3d(0, 100%, 0);
                }
            }
        }
    }
</style>
