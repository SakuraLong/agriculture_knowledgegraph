<template>
    <div class="stock_view_list_container">
        <div class="view_list">
            <stockList @clickEle="clickEle" ref="stock_list"></stockList>
        </div>
        <div class="view_map">
            <stockMap ref="stock_map"></stockMap>
        </div>
    </div>
</template>

<script>
import stockList from "@/components/stockList/stockList.vue";
import stockMap from "./stockMap.vue";
import Connector from "@/assets/js/connector/connector";
export default {
    components: {
        stockList,
        stockMap,
    },
    data() {
        return {
            code: "",
            data:[],
        };
    },
    props: ["type"],
    methods: {
        clickEle(code) {
            this.code = code;
            this.$refs.stock_map.setCode(this.code);
        },
        listCallback(msg) {
            if(msg.success){
                if(this.type === "50"){
                    this.data = msg.content.sz50;
                }else if(this.type === "300"){
                    this.data = msg.content.hs300;
                }else if(this.type === "500"){
                    this.data = msg.content.zz500;
                }
                this.$refs.stock_list.setListData(this.data);
            }
        },
        listWaiting(is_waiting) {},
        listTimeout() {
            console.log("超时");
        },
    },
    mounted() {
        Connector.send(
            [""],
            "getstocklistAnswer",
            this.listCallback,
            this.listWaiting,
            this.listTimeout
        );
    },
};
</script>

<style scoped>
.stock_view_list_container {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
}
.view_list,
.view_map {
    position: relative;
    right: 0;
    float: left;
    /* border: 1px solid red; */
    height: 100%;
}
.view_list {
    left: 0;
    width: 498px;
    border-right: 1px solid #822296;
    border-left: 1px solid #822296;
}
.view_map {
    width: calc(100% - 500px) !important;
}
</style>
