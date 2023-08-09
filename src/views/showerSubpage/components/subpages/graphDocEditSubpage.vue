<!-- 实体查询子页面 -->
<template>
    <div class="doc_edit_subpage_container">
        <div style="position: relative; width: 100%; height: auto">
            <div class="main_title">查看"{{ title }}"的关系图源代码</div>
            <div class="edit_power_reminder_1" v-if="!isLogin">
                在进行编辑操作前，您必须<button class="login_button">
                    登录账号
                </button>
            </div>
            <p class="edit_power_reminder_2">
                您可以查看与复制此页面的源代码。
            </p>
            <div
                style="
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    position: relative;
                "
            >
                <textInput_vertical
                    ref="input_ref"
                    :disabled="!isLogin"
                    :msg="text"
                    :input_font_size="input_font_size"
                    class="show_mainer"
                    :placeholder="input_place_holder"
                    :class="
                        !isLogin
                            ? 'show_mainer_height_not_login'
                            : 'show_mainer_height_login'
                    "
                ></textInput_vertical>
            </div>
            <div
                style="
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    position: relative;
                "
            >
                <linePrompt
                    :opacity="error"
                    :data_left="error"
                    :type="prompt_type"
                    class="line_reminder"
                ></linePrompt>
                <button
                    class="submit_button"
                    v-if="isLogin"
                    @click="submitClick"
                >
                    提交
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import data from "@/assets/js/data";
import textInput_vertical from "@/components/inputs/textInputVertical/textInputVertical.vue";
import store from "@/store/index.js";
import connector from "@/assets/js/connector/connector";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Code from "@/assets/js/code/code";
export default {
    props: ["title", "text", "id"],
    data() {
        return {
            is_login: false,
            input_place_holder: "",
            input_font_size: "16px",
            prompt_type: "",
            error: "",
        };
    },
    components: { textInput_vertical, linePrompt },
    mounted() {},
    methods: {
        submitClick() {
            if (!store.state.can_click_button) return;
            let mapcontent = Code.Base64.decode(this.$refs.input_ref.get());
            connector.send(
                [this.id, mapcontent],
                "setMapContent",
                this.saveTextCallback,
                this.saveTextWaiting,
                this.saveTextTimeout,
                10000
            );
        },
        saveTextCallback(msg) {
            if (msg.success) {
                console.log("传输成功");
                this.prompt_type = "success";
                this.error = "上传成功";
                this.$emit("pageReSet", this.id);
            } else {
                this.prompt_type = "error";
                this.error = "上传失败";
            }
        },
        saveTextWaiting(is_waiting) {
            if (is_waiting) {
                store.state.can_click_button = false;
                this.prompt_type = "waiting";
                this.error = "等待中";
            } else {
                store.state.can_click_button = true;
                this.prompt_type = "default";
                this.error = "";
            }
        },
        saveTextTimeout() {
            this.prompt_type = "error";
            this.error = "发送失败";
        },
    },
    computed: {
        isLogin() {
            return store.state.is_login;
        },
    },
};
</script>

<style scoped>
.doc_edit_subpage_container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
}
.main_title {
    position: relative;
    width: 100%;
    /* height: 60px; */
    color: black;
    font-size: 27px;
    font-weight: 800;
    /* border: 1px solid red; */
    line-height: 60px;
    /* background-color:red; */
}
.edit_power_reminder_1 {
    position: relative;
    width: 100%;
    /* height: 40px; */
    font-size: 15px;
    font-weight: 500;
    /* border: solid 1px red; */
    border-bottom: 1px solid black;
    line-height: 40px;
}
.edit_power_reminder_2 {
    position: relative;
    font-size: 16px;
    width: 100%;
    text-align: left;
    height: 25px;
    line-height: 25px;
}
.login_button {
    width: 85px;
    height: 30px;
    position: relative;
    background-color: rgb(216, 187, 222);
    color: white;
    font-weight: 600;
    left: 5px;
    cursor: pointer;
    border: 1px solid pink;
}
.login_button:hover {
    background-color: rgb(141, 53, 159);
}
.show_mainer {
    /* height: 70%; */
    width: 95%;
    position: relative !important;
    /* height: 74%; */
    /* min-height: 400px; */
    /* overflow: auto; */
    border: solid 2px rgb(225, 225, 225);
    font-size: 16px;
}
.show_mainer:hover {
    border: solid 2px rgb(192, 155, 201);
}
.show_mainer::-webkit-scrollbar {
    width: 12px;
    margin-right: 5px;
    background-color: var(--scrollbar-background-color);
    opacity: 0;
}
/* 滚动槽 */
.show_mainer::-webkit-scrollbar-track {
    /* visibility: hidden; */
    margin-right: 5px;
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    /* background-color: aquamarine; */
    border-radius: 10px;
}
/* 滚动条滑块 */
.show_mainer::-webkit-scrollbar-thumb {
    opacity: 0;
    margin-right: 5px;
    border-radius: 10px;
    background: var(--scrollbar-thumb-background);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
    /* transition: all 0.5 ease; */
}
.show_mainer_height_not_login {
    /* height: 66%; */
}
.show_mainer_height_login {
    /* height: 72%; */
}
.submit_button {
    width: 100px;
    height: 30px;
    position: relative;
    background-color: rgb(216, 187, 222);
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    color: white;
    border: 1px solid pink;
    margin: 20px;
    margin-bottom: 50%;
}
.submit_button:hover {
    background-color: rgb(141, 53, 159);
}
.line_reminder {
    top: -6px;
    position: absolute;
    width: 200px;
    left: 42%;
}
</style>
