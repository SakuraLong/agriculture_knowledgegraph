<template>
    <defaultShutter black_bg="true">
        <template #show_child_page>
            <div class="personal-container">
                <personalProfile></personalProfile>
                <personalEdit></personalEdit>
            </div>
        </template>
    </defaultShutter>
</template>

<script>
import defaultShutter from "@/components/shutter/defaultShutter.vue"; // 个人信息--子页面
import personalProfile from "./components/personalProfile.vue";
import personalEdit from "./components/personalEdit.vue";

export default {
    components: {
        defaultShutter,
        personalProfile,
        personalEdit,
    },
};
</script>

<style>
.personal-container {
    pointer-events: all;
}
</style>
