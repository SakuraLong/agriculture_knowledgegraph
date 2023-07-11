<template>
    <div class="preference">
        <themeManager></themeManager>
    </div>
</template>

<script>
import themeManager from "./themeManager/themeManager.vue";
export default {
    components:{
        themeManager
    }
};
</script>

<style scoped>
.preference{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding-top: 50px;
}
</style>
