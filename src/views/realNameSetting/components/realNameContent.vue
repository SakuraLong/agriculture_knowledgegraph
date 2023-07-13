<template>
    <div class="rn-input-container">
        <div class="realname-bg"></div>
        <div>
            <form>
                <realNameEdit :real_name="real_name" ref="realNameEdit" />
                <realPhoneEdit :phonenumber="phonenumber" ref="realPhoneEdit" />
                <realidTypeEdit :IDtype="IDtype" ref="realidTypeEdit" />
                <realidEdit :ID="ID" ref="realidEdit" />
                <button @click="toPersonal" class="confirm-btn"></button>
            </form>
        </div>
    </div>
</template>

<script>
import store from "@/store/index.js";
import realNameEdit from "./realNameEdit.vue";
import realPhoneEdit from "./realPhoneEdit.vue";
import realidTypeEdit from "./realidTypeEdit.vue";
import realidEdit from "./realidEdit.vue";

export default {
    props: {
        real_name: String,
        phonenumber: String,
        IDtype: Number,
        ID: String,
    },
    data() {
        return {};
    },
    components: {
        realNameEdit,
        realPhoneEdit,
        realidTypeEdit,
        realidEdit,
    },
    methods: {
        toPersonal() {
            /* 检查字符串 */
            if (!store.state.can_click_button) return;
            let realname = this.$refs.realNameEdit.get();
            let realphone = this.$refs.realPhoneEdit.get();
            let realidtype = this.$refs.realidTypeEdit.get();
            let realid = this.$refs.realidEdit.get();
            if (!realname) return;
            if (!realphone) return;
            if (!realidtype) return;
            if (!realid) return;

            // 调用数据传入后台数据库的函数
            this.$emit("toPersonal");
        },
    },
};
</script>

<style scoped>
.rn-input-container {
    display: flex;
}

.realname-bg {
    position: relative;
    background: url("../img/realname.png") no-repeat;
    background-size: contain;
    width: 200px;
    height: 150px;
}

.confirm-btn {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border: solid 5px rgba(144, 119, 149, 0.5);
    border-radius: 100%;
    background: url("../img/tick.png") no-repeat;
    background-size: contain;
}

.confirm-btn:hover {
    border-color: rgb(144, 119, 149);
}
</style>
