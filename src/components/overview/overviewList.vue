<template>
    <div class="overview_list">
        <overviewEle v-for="(item, index) in data" :key="index" :data="item.name"></overviewEle>
    </div>
</template>

<script>
import overviewEle from "./overviewEle.vue";
export default {
    props:["data"],
    components:{
        overviewEle
    },
};
</script>

<style scoped>
.overview_list {
    display: block !important;
    width: 200px !important;
    height: 2000px !important;
    margin: 20px 0px 50px 0px;
}
</style>
