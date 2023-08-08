<template>
    <div class="overview_subpage">
        <div class="overview_head">
            <span>类型：</span>
            <el-select
                v-model="type_selected"
                placeholder=""
                style="width: 80px; font-size: 15px"
                :disabled="is_waiting"
            >
                <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                />
            </el-select>
            <div
                class="goto_button"
                :class="{
                    goto_button_disabled: is_waiting,
                }"
                @click="changeSearchType"
            >
                检索
            </div>
            <span>&nbsp;区间：</span>
            <el-select
                v-model="page_section"
                placeholder=""
                style="width: 80px; font-size: 15px"
                :disabled="is_waiting || all_page === 0"
            >
                <el-option
                    v-for="item in page_sections"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                />
            </el-select>
            <span>&nbsp;页码：</span>
            <el-select
                v-model="page"
                placeholder=""
                style="width: 80px; font-size: 15px"
                :disabled="is_waiting || all_page === 0"
            >
                <el-option
                    v-for="item in pages"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                />
            </el-select>
            <div
                class="goto_button"
                :class="{
                    goto_button_disabled: is_waiting || all_page === 0,
                }"
                @click="goToPageBySetIndex"
            >
                跳转
            </div>
            <div class="page_msg">
                <span>第{{ now_page }}页</span>
                &nbsp;&nbsp;
                <span>共有{{ all_page }}页</span>
                <br>
                <span>共有{{ all_amount }}条记录</span>
            </div>
        </div>
        <div class="overview_list">
            <overviewList
                v-for="(item, index) in data_for_overview"
                :key="index"
                :data="item"
            ></overviewList>
        </div>
    </div>
</template>

<script>
import overviewList from "@/components/overview/overviewList.vue";
import testMsg from "@/assets/js/testMsg";
export default {
    components: {
        overviewList,
    },
    data() {
        return {
            data_list: [
                {
                    name: "平安银行",
                },
            ],
            data_for_overview: [],
            type_selected: "",
            types: [
                {
                    label: "公司",
                    value: "公司",
                },
                {
                    label: "个人",
                    value: "个人",
                },
                {
                    label: "产业",
                    value: "产业",
                },
                {
                    label: "产品",
                    value: "产品",
                },
            ],
            page_section:"",
            page_sections:[],
            page: "",
            pages: [],
            now_page: 0,
            all_page: 0,
            now_type: "",
            all_amount: 0
        };
    },
    methods: {
        dataToUse(data_list) {
            const amount = 80;
            this.data_list = data_list;
            let l = this.data_list.length;
            let i = parseInt(l / 80);
            let j = l % 80;
            i = j !== 0 ? i + 1 : i;
            console.log(i);
            console.log(j);
            this.data_for_overview = [];
            for (let a = 0; a < i; a++) {
                let temp = [];
                if (a !== i - 1 || j === 0) {
                    for (let b = 0; b < amount; b++) {
                        temp.push(this.data_list[a * amount + b]);
                    }
                } else {
                    for (let b = 0; b < j; b++) {
                        temp.push(this.data_list[a * amount + b]);
                    }
                }
                this.data_for_overview.push(temp);
            }
            console.log(this.data_for_overview);
        },
        goToPageBySetIndex(){

        },
        changeSearchType(){
            if(this.type_selected === this.now_type){
                return;
            }
            // 检索
            // 目录初始化
            this.all_page = 0;
            this.now_page = 0;
            this.page = "";
            this.pages = [];
            this.page_section = "";
            this.page_sections = [];
        },
        overviewCallback(msg){

        },
        overviewWaiting(is_waiting){

        },
        
    },
    mounted() {
        this.dataToUse(testMsg.test_overview_list);
    },
};
</script>

<style scoped>
.overview_subpage {
    position: relative;
    width: 100%;
    height: 100%;
}
.overview_head {
    position: relative;
    width: 100%;
    height: 50px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
}
.overview_list {
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    border: 1px solid red;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    justify-content: center;
}
.page_msg {
    position: absolute;
    top: 0;
    right: 20px;
    width: auto;
    height: 100%;
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
}
.goto_button {
    user-select: none;
    cursor: pointer;
    position: relative;
    width: 60px;
    height: 35px;
    font-size: 16px;
    font-weight: 600;
    background-color: rgb(207, 159, 216);
    color: white;
    line-height: 35px;
    text-align: center;
    border-radius: 10px;
    margin-left: 10px;
    float: right;
}
.goto_button:hover {
    background-color: rgb(204, 121, 221);
}
.goto_button_disabled {
    cursor: not-allowed !important;
}
.goto_button_disabled:hover {
    background-color: rgb(207, 159, 216);
}
</style>
