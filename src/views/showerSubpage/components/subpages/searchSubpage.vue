<template>
    <div class="search_subpage_container">
        <div class="search_head">
            <div class="search_goto_page">
                <span>区间：</span>
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
                        goto_button_disable: is_waiting || all_page === 0,
                    }"
                    @click="goToPageBySetIndex"
                >
                    跳转
                </div>
            </div>
            <defaultSearch
                style="z-index: 1000"
                @search="search"
                ref="default_search"
            ></defaultSearch>
            <div class="search_amount_res">
                <span
                    >第<span style="font-weight: 600">{{ now_page }}</span
                    >页，</span
                >
                <span
                    >第<span style="font-weight: 600">{{ begin }}~{{ to }}</span
                    >条结果，共<span style="font-weight: 600">{{
                        all_search_res.length
                    }}</span
                    >条</span
                >
            </div>
        </div>
        <div class="search_body">
            <!-- 这个是宽度过短会显示 -->
            <div class="search_amount_res_">
                <span
                    >第<span style="font-weight: 600">{{ now_page }}</span
                    >页，</span
                >
                <span
                    >第<span style="font-weight: 600">{{ begin }}~{{ to }}</span
                    >条结果，共<span style="font-weight: 600">{{
                        all_search_res.length
                    }}</span
                    >条</span
                >
            </div>
            <div class="search_change_page">
                <div
                    class="change_page"
                    style="right: 30px"
                    :class="{
                        change_page_disable:
                            now_page === all_page || all_page == 0,
                    }"
                    @click="goToNextPage"
                >
                    下一页
                </div>
                <div
                    class="change_page"
                    style="left: 30px"
                    :class="{
                        change_page_disable: now_page === 1 || all_page == 0,
                    }"
                    @click="goToLastPage"
                >
                    上一页
                </div>
                <div class="search_goto_page_">
                    <span>区间：</span>
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
                            goto_button_disable: is_waiting || all_page === 0,
                        }"
                        @click="goToPageBySetIndex"
                    >
                        跳转
                    </div>
                </div>
                <linePrompt
                    class="line_prompt_search"
                    :opacity="error"
                    style="width: 260px"
                    :data_left="error"
                    :type="prompt_type"
                ></linePrompt>
            </div>
            <div class="search_res_list" ref="search_res_list">
                <searchRes
                    v-for="(element, index) in search_res"
                    :key="index"
                    :title="element.name"
                    :abstract="element.abstract"
                    :index="element.index"
                    :image="element.image"
                    :id="element.id"
                    @clickSearchRes="clickSearchRes"
                ></searchRes>
                <div class="no_search_prompt" v-if="search_res.length === 0">
                    <div class="no_search_prompt_body">
                        {{ no_search_prompt_text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import defaultSearch from "@/components/navBar/components/search/defaultSearch.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import searchRes from "@/components/searchRes/searchRes.vue";

import Checker from "@/assets/js/checker/checker";
import Connector from "@/assets/js/connector/connector";
import Code from "@/assets/js/code/code";

// import testMsg from "@/assets/js/testMsg";
import store from "@/store/index.js";
export default {
    components: {
        defaultSearch,
        linePrompt,
        searchRes,
    },
    data() {
        return {
            error: "",
            prompt_type: "waiting",
            all_search_res: [],
            search_res: [],
            page_section: "",
            page_sections: [],
            page: "",
            pages: [],
            all_page: 0,
            now_page: 1,
            is_waiting: false,
            begin: 0,
            to: 0,
            no_search_prompt_text: "当前还没有进行查询",
        };
    },
    watch: {
        page_section() {
            this.pageListInit();
        },
    },
    methods: {
        search(text) {
            console.log(text);
            // Connector.test(
            //     this.searchCallback,
            //     this.searchWaiting,
            //     this.searchCallback,
            //     2000,
            //     true,
            //     1000,
            //     testMsg.test_search_res_data
            // );
            
            Connector.send(
                [text],
                "searchNode",
                this.searchCallback,
                this.searchWaiting,
                this.searchTimeout
            );
        },
        searchCallback(msg) {
            if (msg.success) {
                console.log("success");
                if (msg.content.result.length === 0) {
                    this.now_page = 1;
                    this.all_page = 0;
                    this.begin = 0;
                    this.to = 0;
                    this.all_search_res = [];
                    this.search_res = [];
                    this.page_sections = [];
                    this.page_section = "";
                    this.page = "";
                    this.pages = [];
                    this.no_search_prompt_text = "未查到相关结果";
                    return;
                }
                let res_list = []; // 之后需要解码
                msg.content.result.forEach((element)=>{
                    let temp = element;
                    temp.name = Code.Base64.decode(temp.name);
                    temp.abstract = Code.Base64.decode(temp.abstract);
                    res_list.push(temp);
                });
                this.all_search_res = res_list;
                // 默认进入第一页
                this.now_page = 1;
                this.all_page = parseInt(this.all_search_res.length / 10);
                this.all_page =
                    this.all_search_res.length % 10 === 0
                        ? this.all_page
                        : this.all_page + 1;
                this.goToPageByIndex();
                // 生成页码选择区间
                let l = this.all_search_res.length;
                let c = parseInt(l / 10 / 10);
                let p = this.all_page % 10;
                this.page_sections = [];
                this.page_section = "";
                this.pages = [];
                this.page = "";
                for (let i = 0; i < c; i++) {
                    let ele = {
                        label: "",
                        value: "",
                        i: 0,
                    };
                    let s = "";
                    s =
                        (i * 10 + 1).toString() +
                        "~" +
                        ((i + 1) * 10).toString();
                    ele.label = s;
                    ele.value = s;
                    ele.i = i;
                    this.page_sections.push(ele);
                }
                let ele = {
                    label: "",
                    value: "",
                    i: 0,
                };
                let s = "";
                s = (c * 10 + 1).toString() + "~" + (c * 10 + p).toString();
                if (p !== 0) {
                    ele.label = s;
                    ele.value = s;
                    ele.i = c;
                }
                this.page_sections.push(ele);
                this.page_section = this.page_sections[0].value;
                this.pageListInit();
            } else {
                // 查询失败
            }
        },
        searchWaiting(is_waiting) {
            if (is_waiting) {
                this.error = "搜索中";
            } else {
                this.error = "";
                this.$refs.default_search.getMsg();
            }
        },
        searchTimeout() {},
        goToPageByIndex() {
            this.search_res = [];
            let begin = 0 + (this.now_page - 1) * 10 + 1;
            let to = 0;
            let i = 0;
            for (
                i = 0 + (this.now_page - 1) * 10;
                i < 10 + (this.now_page - 1) * 10;
                i++
            ) {
                if (i === this.all_search_res.length) break;
                this.search_res.push(this.all_search_res[i]);
            }
            to = i;
            this.begin = begin;
            this.to = to;
            this.$refs.search_res_list.scrollTop = 0;
        },
        goToNextPage() {
            if (this.all_page === 0) return;
            this.now_page =
                this.now_page + 1 > this.all_page
                    ? this.now_page
                    : this.now_page + 1;
            this.goToPageByIndex();
        },
        goToLastPage() {
            if (this.all_page === 0) return;
            this.now_page =
                this.now_page - 1 <= 0 ? this.now_page : this.now_page - 1;
            this.goToPageByIndex();
        },
        pageListInit() {
            if (this.page_section === "") return;
            this.pages = [];
            let value = this.page_section;
            let i = this.page_sections.findIndex((element) => {
                return value === element.value;
            });
            for (let j = i * 10 + 1; j <= i * 10 + 10; j++) {
                if (j > this.all_page) break;
                let ele = {
                    label: j.toString(),
                    value: j.toString(),
                    i: j,
                };
                this.pages.push(ele);
            }
            console.log(this.pages[0].value);
            this.page = this.pages[0].value;
        },
        goToPageBySetIndex() {
            if (this.all_page === 0) return;
            this.now_page = parseInt(this.page);
            this.goToPageByIndex();
        },
        clickSearchRes(id) {
            // 搜索结果被点击
            // 访问数据库拿到实体的详细信息
            // 根据title找信息（name）
            // 会直接跳转
            console.log(id);
            this.$emit("fromSearch", 1, id);
        },
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
    z-index: 1000;
}
.search_body {
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    justify-content: center;
    align-items: start;
    /* border: 1px solid red; */
    flex-direction: column;
}
.change_page {
    cursor: pointer;
    position: absolute;
    font-size: 18px;
    font-weight: 600;
    user-select: none;
    /* -webkit-text-stroke: 1px black; */
}
.change_page:hover {
    text-shadow: 0px 0px 5px #d439f3;
}
.change_page_disable {
    /* pointer-events: none; */
    cursor: not-allowed;
    color: gray;
    /* -webkit-text-stroke: 1px gray; */
}
.change_page_disable:hover {
    text-shadow: 0px 0px 0px #d439f3;
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
.goto_button_disable {
    cursor: not-allowed;
}
.goto_button_disable:hover {
    background-color: rgb(207, 159, 216);
}
.no_search_prompt {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
</style>
<style>
.selected {
    color: #8e499c !important;
}
.el-input__suffix {
    display: none !important;
}
.search_amount_res {
    position: absolute;
    width: auto;
    height: 30px;
    font-size: 18px;
    /* border: 1px solid red; */
    right: 20px;
}
.search_res_list {
    /* border: 1px solid red; */
    border-top: 2px solid #8222966f;
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    overflow-y: auto;
    overflow-x: hidden;
}
.search_amount_res_ {
    display: none;
    position: relative;
    width: 100%;
    height: 30px;
    text-align: center;
}
.search_change_page {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 30px;
}
.search_goto_page {
    /* border: 1px solid red; */
    position: absolute;
    z-index: 1001;
    left: 0;
    font-size: 15px;
}
.search_goto_page_ {
    position: relative;
    display: none;
}
.search_goto_page_ > .goto_button {
    width: 48px;
    height: 28px;
    line-height: 28px;
    margin: 5px 0px 5px 5px;
}
@media screen and (max-width: 1450px) {
    .search_amount_res {
        right: 0;
        width: 20%;
        height: 100%;
    }
    .search_amount_res > span {
        word-wrap: break-word;
        line-height: 18px;
    }
}
@media screen and (max-width: 1285px) {
    .search_goto_page {
        display: none;
    }
    .search_goto_page_ {
        display: block;
    }
    .line_prompt_search {
        display: none !important;
    }
}
@media screen and (max-width: 1130px) {
    .search_amount_res {
        display: none;
    }
    .search_res_list {
        height: calc(100% - 60px);
    }
    .search_amount_res_ {
        display: block;
    }
}
</style>
