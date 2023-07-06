<template>
    <div class="verify">
        <transition name="opacity400">
            <div class="container">
                <h1 :style="{ color: color_ }" v-if="show">This is an about page</h1>
            </div>
        </transition>
    </div>
</template>
<script>
import Code from "@/assets/js/code/code.js";
import Checker from "@/assets/js/checker/checker.js";
import Connector from "@/assets/js/connector/connector.js";
import Storage from "@/assets/js/storage/storage.js";
export default {
    data() {
        return {
            show:false,
            code: "",
        };
    },
    methods: {
        test() {
            console.log(999999999);
            this.color_ = "blue";
        },
    },
    mounted() {
        this.code = this.$route.params.code.toString();
        let str = "asasas";
        let a = Code.CryptoJS.encrypt(str);
        setTimeout(()=>{this.show = true;},500);
    },
};
</script>
<style scoped>
.verify,.container {
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 128, 255, 0.5); */
}
.container{

}
</style>
