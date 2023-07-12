<template>
    <div class="main_bar">
        <mainBarElement content="首页" :type=index_arr[0] @click="clickElement(0)"></mainBarElement>
        <mainBarElement content="功能" :type=index_arr[1] @click="clickElement(1)"></mainBarElement>
        <mainBarElement content="其他" :type=index_arr[2] @click="clickElement(2)"></mainBarElement>
    </div>
</template>
<script>
import mainBarElement from "./component/mainBarElement.vue";
export default {
    data(){
        return{
            index_arr:[true, false, false]
        };
    },
    components:{
        mainBarElement
    },
    methods:{
        clickElement(index){
            this.index_arr.forEach((element, index_) => {
                this.index_arr[index_] = false;
            });
            this.index_arr[index] = true;
            let data = {
                is_main:this.index_arr[0],
                is_func:this.index_arr[1],
                is_other:this.index_arr[2]
            };
            this.$emit("updatePage", data);
        }
    }
};
</script>

<style scoped>
.main_bar{
    position: relative;
    border: 1px solid red;
    width: 100%;
}
</style>
