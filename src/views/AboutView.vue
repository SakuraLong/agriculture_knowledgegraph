<template>
    <div class="about">
        <h1 :style="{color: color_ }">This is an about page</h1>
    </div>
</template>
<script>
import Code from "@/assets/js/code/code.js";
import Checker from "@/assets/js/checker/checker.js";
import Connector from "@/assets/js/connector/connector.js";
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
    }
};
</script>