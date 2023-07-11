<template>
    <div class="rn-input-container">
        <div class="realname-bg"></div>
        <!-- 表单等后端明确后再完善 -->
        <div>
            <form>
                <realNameEdit :name="name" />
                <realPhoneEdit :phonenumber="phonenumber" />
                <realidEdit :IDtype="IDtype" :ID="ID" />
            </form>
        </div>
    </div>
</template>

<script>
import realNameEdit from "./realNameEdit.vue";
import realPhoneEdit from "./realPhoneEdit.vue";
import realidEdit from "./realidEdit.vue";

export default {
    props: {
        name: String,
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
        realidEdit,
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
</style>
