declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module 'vue-lazyload'

declare module '*.scss' {
    const content: any;
    export default content;
}

declare module '*.png' {
    const content: any;
    export default content;
}