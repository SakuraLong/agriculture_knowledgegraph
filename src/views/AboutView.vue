<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>
<script>
import Code from "@/assets/js/code/code.js";
import Checker from "@/assets/js/checker/checker.js";
export default{
    mounted(){
        console.log(Code.CryptoJS.encrypt("abc"));
        let a = Code.CryptoJS.encrypt("abc");
        console.log(Code.CryptoJS.decrypt(a));
        console.log(Code.MD5.encrypt("abc"));

        let success = new Checker("a", ["no-null"]).check();
        console.log(success);
    }
};
</script>