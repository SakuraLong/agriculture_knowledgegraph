<template>
    <div class="personal-profile-container">
        <div @click="leavePersonal" class="exit-btn">
            <div class="exit-btn-bg"></div>
            <div class="exit-btn-text">返回</div>
        </div>
        <el-row>
            <div class="profile-container">
                <el-row class="profile-ele" style="margin-top: 20px">
                    <avatar class="profile-avatar" style="pointer-events: none !important;" />
                    <div>
                        <div class="profile-ele-ele" style="text-indent: 13px">
                            昵称: Name
                        </div>
                        <div class="profile-ele-ele">职业: 学生</div>
                    </div>
                </el-row>
                <el-row class="profile-tags">
                    <!-- 这里获取数据库信息判断就行 -->
                    <el-tag
                        color="rgb(208,195,213)"
                        style="color: darkslateblue"
                        >已实名认证</el-tag
                    >
                    <el-tag
                        color="rgb(208,195,213)"
                        style="color: darkslateblue"
                        >主题：默认</el-tag
                    >
                    <el-tag
                        color="rgb(208,195,213)"
                        style="color: darkslateblue"
                        >色弱模式：开启</el-tag
                    >
                    <el-tag
                        color="rgb(208,195,213)"
                        style="color: darkslateblue"
                        >当前语言:中文</el-tag
                    >
                </el-row>
            </div>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-row style="margin-top: 20px">
                    <time id="profess">性别:</time>
                    <label for="profess">未知</label>
                </el-row>
                <el-row style="margin-top: 20px">
                    <time id="profess">出生日期:</time>
                    <label for="profess">xxxx-xx-xx</label>
                </el-row>
                <el-row style="margin-top: 20px">
                    <time id="profess">IP:</time>
                    <label for="profess">xxx.xx.xx.xx</label>
                </el-row>
            </el-col>
            <el-col :span="14">
                <div style="display: flex">
                    <el-collapse
                        style="width: 230px"
                        v-model="activeNames"
                        @change="handleChange"
                    >
                        <el-collapse-item title="实名认证信息" name="1">
                            <div>
                                <el-row style="margin-top: 10px">
                                    <time id="profess">姓名:</time>
                                    <label for="profess">Name</label>
                                </el-row>
                                <el-row style="margin-top: 10px">
                                    <time id="profess">证件类型:</time>
                                    <label for="profess">xxx.xx.xx.xx</label>
                                </el-row>
                                <el-row style="margin-top: 10px">
                                    <time id="profess">证件号码:</time>
                                    <label for="profess">xxx.xx.xx.xx</label>
                                </el-row>
                                <el-row style="margin-top: 10px">
                                    <time id="profess">电话号码:</time>
                                    <label for="profess">xxx.xx.xx.xx</label>
                                </el-row>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <realNameEdit @toEditRealName="toEditRealName" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import avatar from "@/components/avatar/defaultAvatar.vue";
import realNameEdit from "./realNameEdit.vue";
export default {
    data() {
        return {};
    },
    components: {
        realNameEdit,
        avatar,
    },
    methods: {
        leavePersonal() {
            this.$emit("leavePersonal");
        },
        toEditRealName() {
            this.$emit("toEditRealName");
        },
    },
};
</script>

<style scoped>
.personal-profile-container {
    position: relative;
    left: 50px;
    width: 600px;
    height: 400px;
}

.profile-ele {
    display: flex;
    left: 40%;
}

.profile-avatar {
    position: relative;
    z-index: 100;
    width: 60px;
    height: 60px;
    margin-right: 10px;
}

.profile-ele-ele {
    margin-top: 15px;
}

.profile-tags {
    margin-top: 15px;
    margin-bottom: 15px;
    left: 15%;
}

.el-tag {
    margin: 5px;
}

.realname-edit-btn {
    cursor: pointer;
    position: relative;
    top: 7px;
    left: 10px;
    background: url("../img/realnameedit.png") no-repeat;
    background-size: contain;
    width: 27px;
    height: 27px;
    border-radius: 100%;
    border: solid 3px #907795;
}

.exit-btn {
    cursor: pointer;
    position: absolute;
    top: -50px;
    left: -15px;
}

.exit-btn-bg {
    position: absolute;
    background: url("../img/back.png") no-repeat;
    background-size: contain;
    width: 50px;
    height: 50px;
    transition: transform 0.3s ease;
}

.exit-btn-text {
    line-height: 50px;
    text-indent: 9px;
}

.exit-btn-bg:hover {
    transform: rotate(360deg);
}
</style>
