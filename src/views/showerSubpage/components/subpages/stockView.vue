<template>
    <div class="stock_view_container">
        <div class="select_head">
            <div
                v-for="(item, index) in son_pages_name"
                :key="index"
                class="page_nav"
                :class="{ page_nav_selected: son_pages[index] }"
                @click="clickNav(index)"
            >
                {{ item }}
            </div>
        </div>
        <div class="stock_view_body">
            <div ref="son_0" class="son_subpage">
                <stockViewList ref="list_0" type="50"></stockViewList>
            </div>
            <div ref="son_1" class="son_subpage" style="left: 100%">
                <stockViewList ref="list_1" type="300"></stockViewList>
            </div>
            <div ref="son_2" class="son_subpage" style="left: 200%">
                <stockViewList ref="list_2" type="500"></stockViewList>
            </div>
        </div>
    </div>
</template>

<script>
import stockViewList from "./stockViewList.vue";
import Connector from "@/assets/js/connector/connector";
export default {
    data() {
        return {
            son_pages: [true, false, false],
            son_pages_name: ["上证50", "沪深300", "中证500"],
        };
    },
    components: {
        stockViewList,
    },
    methods: {
        clickNav(index) {
            // if (!store.state.can_click_button) return;
            this.son_pages = [false, false, false];
            this.son_pages[index] = true;
            this.son_pages.forEach((element, i) => {
                this.$refs["son_" + i.toString()].style.left =
                    (i * 100 - index * 100).toString() + "%";
            });
        },
        listCallback(msg) {
            if (msg.success) {
                this.list_0.setData(msg.content.sz50);
                this.list_1.setData(msg.content.hs300);
                this.list_2.setData(msg.content.zz500);
            }
        },
        listWaiting(is_waiting) {},
        listTimeout() {
            console.log("超时");
        },
        show() {
            if (this.data == null) {
                Connector.send(
                    [""],
                    "getStocklistAnswer",
                    this.listCallback,
                    this.listWaiting,
                    this.listTimeout,
                    10000
                );
            }
        },
    },
    mounted() {
        this.show();
    },
};
</script>

<style scoped>
.stock_view_container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: white;
}
.select_head {
    user-select: none;
    position: relative;
    display: flex;
    border-bottom: 2px solid #8222966f;
    width: 100%;
    height: 30px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 600;
}
.page_nav {
    cursor: pointer;
    padding: 0px 10px 0px 10px;
    border-left: 1px solid #822296;
    border-right: 1px solid #822296;
    color: rgba(0, 0, 0, 0.679);
    font-size: 17px;
    transition: all 0.1s linear;
}
.page_nav_selected {
    transition: all 0.1s linear;
    color: #822296;
}
.stock_view_body {
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    /* border: 1px solid red; */
    overflow: hidden;
}
.son_subpage {
    position: absolute;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-out;
    /* border: 1px solid red; */
}
</style>
