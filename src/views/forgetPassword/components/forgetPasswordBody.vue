<template>
    <div class="forget_password_container">
        <div class="body">
            <forgetEmailInput></forgetEmailInput>
            <forgetPasswordsInput></forgetPasswordsInput>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
import forgetEmailInput from "./inputs/forgetEmailInput.vue";
import forgetPasswordsInput from "./inputs/forgetPasswordsInput.vue";
export default {
    components:{
        forgetEmailInput,
        forgetPasswordsInput
    }
};
</script>

<style scoped>
.forget_password_container{
    width: 100%;
    height: 100%;
    position: relative;
}
.body{
    width: 100%;
    height: 80%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid red;
}
</style>
