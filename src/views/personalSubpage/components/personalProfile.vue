<template>
    <div class="personal-profile-container">
        <el-row>
            <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                :size="100"
            />
            <div style="padding: 14px">
                <span style="margin-top: 10px">昵称：Name</span>
                <el-row class="profile-ele" style="margin-top: 20px">
                    <span>职业：学生</span>
                </el-row>
                <el-row style="margin-top: 10px">
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
                    <realNameEdit />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import realNameEdit from "./realNameEdit.vue";
export default {
    data() {
        return {};
    },
    components: {
        realNameEdit,
    },
};
</script>

<style scoped>
.personal-profile-container {
    position: relative;
    left: 50px;
    top: 30px;
    width: 600px;
    height: 400px;
}

.profile-ele {
    left: 155px;
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
</style>
