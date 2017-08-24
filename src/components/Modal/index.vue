<template>
    <transition name="Modal-fade">
        <article :class="['Modal', className]" v-if="showModal" @click="handleCancel">
            <div class="Modal-container-wrp">
                <div class="Modal-container">
                    <header class="Modal-header">
                        <h3 class="Modal-header-title">{{ title }}</h3>
                    </header>
                    <div class="Modal-content">
                        <p class="Modal-content-text">{{ contentText }}</p>
                    </div>
                    <footer class="Modal-footer">
                        <span class="Modal-footer-btn Modal-footer-cancel"
                            @click="handleCancel">
                            {{ cancelText }}
                        </span>
                        <span class="Modal-footer-btn Modal-footer-confirm"
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
                default: ''
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
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            z-index: 5100;
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
        }

        &-fade-enter-active, &-fade-leave-active {
            transition: all .3s linear;
        }

        &-fade-enter-active {
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

        &-fade-leave-active {
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

        &-fade-enter, &-fade-leave-to {
            opacity: 0;
        }
    }
</style>
