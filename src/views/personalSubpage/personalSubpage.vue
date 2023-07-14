<template>
    <defaultShutter black_bg="true">
        <template #show_child_page>
            <div class="personal-container">
                <personalProfile
                    v-bind="msg"
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
import utils from "@/assets/js/utils";

export default {
    data() {
        return {
            msg: {
                avatar: "",
                born: "",
                card_type: "",
                email: "",
                id: "",
                id_card: "",
                name: "",
                occu: "",
                password: "",
                real: false,
                real_name: "",
                sex: 0,
                tel: "",
            },
        };
    },
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
        getPersonalMsg() {
            let user_msg = utils.getUserMsg();
            if (user_msg.id === "") {
                utils.setLogOut();
                store.state.is_login = false;
            } else {
                return user_msg;
            }
        },
    },
    mounted() {
        this.msg = this.getPersonalMsg();
        console.log(this.msg);
    },
};
</script>

<style scoped>
.personal-container {
    pointer-events: all;
}
</style>
