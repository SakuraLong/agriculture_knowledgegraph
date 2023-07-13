<template>
    <defaultShutter black_bg="true">
        <template #show_child_page>
            <div class="personal-container">
                <personalProfile
                    @leavePersonal="leavePersonal"
                    @toEditRealName="toEditRealName"
                ></personalProfile>
                <personalEdit @toEditPersonal="toEditPersonal"></personalEdit>
            </div>
        </template>
    </defaultShutter>
</template>

<script>
import defaultShutter from "@/components/shutter/defaultShutter.vue"; // 个人信息--子页面
import personalProfile from "./components/personalProfile.vue";
import personalEdit from "./components/personalEdit.vue";
import store from "@/store/index.js";

export default {
    components: {
        defaultShutter,
        personalProfile,
        personalEdit,
    },
    methods: {
        leavePersonal() {
            if (!store.state.can_click_button) return;
            this.$emit("leavePersonal");
        },
        toEditRealName() {
            if (!store.state.can_click_button) return;
            this.$emit("toEditRealName");
        },
        toEditPersonal() {
            if (!store.state.can_click_button) return;
            this.$emit("toEditPersonal");
        },
    },
};
</script>

<style scoped>
.personal-container {
    pointer-events: all;
}
</style>
