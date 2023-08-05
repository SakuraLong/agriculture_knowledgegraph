<template>
    <div class="search_subpage_container">
        <div class="search_head">
            <defaultSearchVue></defaultSearchVue>
        </div>
        <div class="search_body">
            <div class="search_amount_res">
                数据200条
            </div>
            <div class="search_res_list">

            </div>
        </div>
    </div>
</template>

<script>
import defaultSearchVue from "@/components/navBar/components/search/defaultSearch.vue";
export default {
    components: {
        defaultSearchVue,
    },
};
</script>

<style scoped>
.search_subpage_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.search_head {
    position: relative;
    width: 100%;
    height: 50px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.search_body{
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    justify-content: center;
    align-items: start;
    /* border: 1px solid red; */
    flex-direction: column;
}
.search_amount_res{
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    /* border: 1px solid red; */
}
.search_res_list{
    /* border: 1px solid red; */
    position: relative;
    width: 100%;
    height: calc(100% - 20px);
}
</style>
