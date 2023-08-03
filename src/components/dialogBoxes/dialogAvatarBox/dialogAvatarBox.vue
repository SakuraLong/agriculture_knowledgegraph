<template>
    <div class="dialog_avatar_box">
        <defaultAvatar
            v-if="is_left"
            :is_robot="true"
            style="float: left"
        ></defaultAvatar>
        <defaultAvatar
            v-if="is_right"
            :is_robot="false"
            style="float: right"
        ></defaultAvatar>
        <defaultDialogBox
            :is_left="is_left"
            :is_right="is_right"
            :style="{float: is_left ? 'left' : 'right'}"
        >
            {{ content }}
        </defaultDialogBox>
    </div>
</template>

<script>
import defaultAvatar from "@/components/avatar/defaultAvatar.vue";
import defaultDialogBox from "../defaultDialogBox/defaultDialogBox.vue";
export default {
    components: {
        defaultAvatar,
        defaultDialogBox,
    },
    props: ["content", "is_left", "is_right"],
};
</script>

<style scoped>
.dialog_avatar_box {
    /* border: 1px solid red; */
    /* display: flex; */
    display: inline-block;
    width: auto;
    flex-direction: row;
}
</style>
