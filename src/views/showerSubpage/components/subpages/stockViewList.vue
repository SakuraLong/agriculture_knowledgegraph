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
            data: null,
        };
    },
    props: ["type"],
    methods: {
        clickEle(code) {
            this.code = code;
            this.$refs.stock_map.setCode(this.code);
        },
        setData(data){
            this.data = data;
            this.$refs.stock_list.setListData(this.data);
        },
        listCallback(msg) {
            if (msg.success) {
                this.setData(msg.content.result);
            }
        },
        listWaiting(is_waiting) {},
        listTimeout() {
            console.log("超时");
        },
        show() {
            let t = "";
            if(this.type === "50"){
                t = "sz50";
            }else if(this.type === "300"){
                t = "hs300";
            }else if(this.type === "500"){
                t = "zz500";
            }
            if (this.data == null) {
                Connector.send(
                    [t],
                    "getStocklistAnswer",
                    this.listCallback,
                    this.listWaiting,
                    this.listTimeout,
                    60000
                );
            }
        },
    },
    mounted() {},
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
