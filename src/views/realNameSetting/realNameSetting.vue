<template>
    <defaultShutter>
        <template #show_child_page>
            <div class="realname-container">
                <realNameContent
                    :name="getRealNameMsg().name"
                    :phonenumber="getRealNameMsg().phonenumber"
                    :IDtype="getRealNameMsg().IDtype"
                    :ID="getRealNameMsg().ID"
                    @toPersonal="toPersonal"
                />
            </div>
        </template>
    </defaultShutter>
</template>

<script>
import defaultShutter from "@/components/shutter/defaultShutter.vue";
import realNameContent from "./components/realNameContent.vue";
import store from "@/store/index.js";
export default {
    data() {
        return {};
    },
    components: {
        realNameContent,
        defaultShutter,
    },
    methods: {
        getRealNameMsg() {
            // 获取用户原有的实名认证信息

            // 看效果用的，可忽略
            return {
                name: "张三",
                phonenumber: "18755557723",
                IDtype: 0,
                ID: "372923202312013419",
            };
        },
        toPersonal() {
            if (!store.state.can_click_button) return;
            this.$emit("toPersonal");
        },
    },
};
</script>

<style></style>
