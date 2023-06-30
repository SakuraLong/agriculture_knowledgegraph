<template>
    <div class="login">
        <div class="login-containr" @click="leaveLogin"></div>
    </div>
</template>
<script>
export default{
    methods:{
        leaveLogin(){
            this.$emit("leaveLogin");
        }
    }
};
</script>
<style scoped>
.login{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
}
.login-containr{
    position: relative;
    width: var(--login-width);
    height: var(--login-height);
    background-color: var(--login-background-color);
    /* border-radius: 30px; */
    box-shadow: 0px 0px 20px rgba(130, 34, 150, 0.5);
    /* border: 1px solid red; */
}
</style>
<style>

</style>