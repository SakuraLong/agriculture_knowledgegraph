<!-- 实体查询子页面 -->
<template>
    <div class="doc_edit_subpage_container">
        <div class="main_title">查看"{{ title }}"的源代码</div>

        <div class="edit_power_reminder_1" v-if="!is_login">
            在进行编辑操作前，您必须<button class="login_button">
                登录账号
            </button>
        </div>
        <p class="edit_power_reminder_2">您可以查看与复制此页面的源代码。</p>
        <textInput
            :disabled="!is_login"
            :msg="text"
            :input_font_size="input_font_size"
            class="show_mainer"
            :placeholder="input_place_holder"
            :class="
                !is_login
                    ? 'show_mainer_height_not_login'
                    : 'show_mainer_height_login'
            "
        ></textInput>
        <button class="submit_button">提交</button>
    </div>
</template>
<script>
import data from "@/assets/js/data";
import textInput from "@/components/inputs/textInput/textInput.vue";
export default {
    props: ["title"],
    data() {
        return {
            is_login: false,
            text: data.default_ency,
            input_place_holder: "",
            input_font_size: "16px",
        };
    },
    components: { textInput },
    mounted() {},
    methods: {},
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
}
.main_title {
    position: relative;
    width: 100%;
    height: 8%;
    color: black;
    font-size: 27px;
    font-weight: 800;
    /* background-color:red; */
}
.edit_power_reminder_1 {
    position: relative;
    width: 100%;
    height: 6%;
    font-size: 15px;
    font-weight: 500;
    /* border:solid 1px red; */
    border-bottom: 1px solid black;
}
.edit_power_reminder_2 {
    position: relative;
    font-size: 16px;
    width: 100%;
    text-align: left;
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
    height: 70%;
    width: 95%;
    position: relative;
    height: 74%;
    overflow: auto;
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
    height: 66%;
}
.show_mainer_height_login {
    height: 72%;
}
.submit_button {
    width: 100px;
    height: 5%;
    position: relative;
    top: 2%;
    background-color: rgb(216, 187, 222);
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    color: white;
    border: 1px solid pink;
}
.submit_button:hover {
    background-color: rgb(141, 53, 159);
}
</style>
