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
                            昵称: {{ name }}
                        </div>
                        <div class="profile-ele-ele">
                            职业: {{ getProfess(occu) }}
                        </div>
                    </div>
                </el-row>
                <el-row class="profile-tags">
                    <!-- 这里获取数据库信息判断就行 -->
                    <el-tag
                        color="rgb(208,195,213)"
                        style="color: darkslateblue"
                        >{{ real ? "已实名认证" : "未实名认证" }}</el-tag
                    >
                    <el-tag
                        color="rgb(208,195,213)"
                        style="color: darkslateblue"
                        >主题：{{ getTheme() }}</el-tag
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
                    <label for="profess">{{ getSex(sex) }}</label>
                </el-row>
                <el-row style="margin-top: 20px">
                    <time id="profess">出生日期:</time>
                    <label for="profess">{{ born }}</label>
                </el-row>
                <el-row style="margin-top: 20px">
                    <time id="profess">IP:</time>
                    <label for="profess">xxx.xx.xx.xx</label>
                </el-row>
            </el-col>
            <el-col :span="14">
                <div class="profile-realname" style="display: flex">
                    <el-collapse class="realname-collapse">
                        <el-collapse-item title="实名认证信息" name="1">
                            <div>
                                <el-row style="margin-top: 10px">
                                    <time id="profess">姓名:</time>
                                    <label for="profess">{{ real_name }}</label>
                                </el-row>
                                <el-row style="margin-top: 10px">
                                    <time id="profess">证件类型:</time>
                                    <label for="profess">{{
                                        getCardType(card_type)
                                    }}</label>
                                </el-row>
                                <el-row style="margin-top: 10px">
                                    <time id="profess">证件号码:</time>
                                    <label for="profess">{{ id_card }}</label>
                                </el-row>
                                <el-row style="margin-top: 10px">
                                    <time id="profess">电话号码:</time>
                                    <label for="profess">{{ tel }}</label>
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
import Storage from "@/assets/js/storage/storage";
const default_theme = {
    theme: "light",
    color: "",
    font_size: {
        base: "",
        button: "",
    },
};
export default {
    props: {
        avatar: String,
        born: String,
        card_type: String,
        email: String,
        id: String,
        id_card: String,
        name: String,
        occu: String,
        password: String,
        real: Boolean,
        real_name: String,
        sex: Number,
        tel: String,
    },
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
        getProfess(str) {
            switch (str) {
                case "O00":
                    return "未知";
                case "O01":
                    return "无";
                case "O02":
                    return "不愿意透露的高级职业";
                case "O03":
                    return "教师";
                case "O04":
                    return "农民";
                case "O05":
                    return "学生";
                default:
                    return "error";
            }
        },
        getCardType(str) {
            if (str === "C01") {
                return "居民身份证";
            } else {
                return "暂未设置该类型";
            }
        },
        getSex(t) {
            if (t === 0) {
                return "男";
            } else {
                return "女";
            }
        },
        getTheme() {
            /* 访问数据库 */
            this.theme_json = Storage.get(0, "THEME", default_theme, "JSON");
            return this.theme_json.theme;
        },
    },
    mounted() {
        console.log(this.name);
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
.realname-collapse {
    width: 230px;
}

.profile-realname >>> .el-collapse {
    border-color: var(--homeview-bg-color) !important;
}

.profile-realname >>> .el-collapse-item__header {
    border-color: var(--homeview-bg-color) !important;
    background-color: var(--homeview-bg-color) !important;
}

.profile-realname >>> .el-collapse-item__wrap {
    border-color: var(--homeview-bg-color) !important;
    background-color: var(--homeview-bg-color) !important;
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
    width: 60px;
    height: 60px;
    transition: transform 0.3s ease;
}

.exit-btn-text {
    line-height: 60px;
    text-indent: 15px;
}

.exit-btn-bg:hover {
    transform: rotate(360deg);
}
</style>
