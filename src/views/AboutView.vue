<template>
    <div class="about">
        <h1 :style="{color: color_ }">This is an about page</h1>
    </div>
</template>
<script>
import Code from "@/assets/js/code/code.js";
import Checker from "@/assets/js/checker/checker.js";
import Connector from "@/assets/js/connector/connector.js";
import Storage from "@/assets/js/storage/storage.js";
export default{
    data(){
        return {
            color_:"red",
        };
    },
    methods:{
        test(){
            console.log(999999999);
            this.color_ = "blue";
        }
    },
    mounted(){
        console.log(Code.CryptoJS.encrypt("abc"));
        let a = Code.CryptoJS.encrypt("abc");
        console.log(Code.CryptoJS.decrypt(a));
        console.log(Code.MD5.encrypt("abc"));

        let success = new Checker("a", ["no-null"]).check();
        console.log(success);
        let b = Connector.send([1, 2, 3], "register", null, null, this.test);
        console.log("api:" + b);

        Storage.set(0, "test", 1);
        Storage.del(0, "test");
    }
};
</script>
<style scoped>
.about{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 128, 255, 0.5);
}
</style>