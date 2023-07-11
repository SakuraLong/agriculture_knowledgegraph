<template>
    <defaultShutter>
        <template #show_child_page>
            <div class="realname-container">
                <realNameContent
                    :name="getRealNameMsg().name"
                    :phonenumber="getRealNameMsg().phonenumber"
                    :IDtype="getRealNameMsg().IDtype"
                    :ID="getRealNameMsg().ID"
                />
            </div>
        </template>
    </defaultShutter>
</template>

<script>
import defaultShutter from "@/components/shutter/defaultShutter.vue";
import realNameContent from "./components/realNameContent.vue";
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
                IDtype: 1,
                ID: "372923202312013419",
            };
        },
    },
};
</script>

<style></style>
