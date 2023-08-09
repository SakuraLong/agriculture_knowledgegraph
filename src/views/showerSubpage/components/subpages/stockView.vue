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
                <stockViewList type="50"></stockViewList>
            </div>
            <div ref="son_1" class="son_subpage" style="left: 100%">
                <stockViewList type="200"></stockViewList>
            </div>
            <div ref="son_2" class="son_subpage" style="left: 200%">
                <stockViewList type="500"></stockViewList>
            </div>
        </div>
    </div>
</template>

<script>
import stockViewList from "./stockViewList.vue";
export default {
    data() {
        return {
            son_pages: [true, false, false],
            son_pages_name: ["50", "200", "500"],
        };
    },
    components:{
        stockViewList
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
