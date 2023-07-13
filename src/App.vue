<template>
    <router-view></router-view>
</template>
<script>
import Storage from "@/assets/js/storage/storage.js";
export default{
    mounted(){
        this.$i18n.locale = Storage.get(0, "LANGUAGE", "zh-Hans");
    }
};
</script>
