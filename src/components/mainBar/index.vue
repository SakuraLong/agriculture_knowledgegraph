<template>
    <div class="mainBar">
        <div class="login-container">
            <nav>
                <ul>
                    <li
                        :class="{ active: activeTab === 'home' }"
                        @click="setActiveTab('home')"
                        @keydown.arrow-up.prevent="moveUp"
                        @keydown.arrow-down.prevent="moveDown"
                        @keydown.enter.prevent="setActiveTab(activeTab)"
                        tabindex="0"
                    >
                        <img
                            v-if="activeTab === 'home'"
                            src="./img/arrow.png"
                            style="width: 40px; height: 40px"
                        />
                        <a href="#">首页</a>
                    </li>
                    <li
                        :class="{ active: activeTab === 'features' }"
                        @click="setActiveTab('features')"
                        @keydown.arrow-up.prevent="moveUp"
                        @keydown.arrow-down.prevent="moveDown"
                        @keydown.enter.prevent="setActiveTab(activeTab)"
                        tabindex="0"
                    >
                        <img
                            v-if="activeTab === 'features'"
                            src="./img/arrow.png"
                            style="width: 40px; height: 40px"
                        />
                        <a href="#">功能</a>
                    </li>
                    <li
                        :class="{ active: activeTab === 'other' }"
                        @click="setActiveTab('other')"
                        @keydown.arrow-up.prevent="moveUp"
                        @keydown.arrow-down.prevent="moveDown"
                        @keydown.enter.prevent="setActiveTab(activeTab)"
                        tabindex="0"
                    >
                        <img
                            v-if="activeTab === 'other'"
                            src="./img/arrow.png"
                            style="width: 40px; height: 40px"
                        />
                        <a href="#">其他</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style scoped>
.mainBar {
    /* background-color: #f0f0f0; */
    width: 300px; /* 调整导航栏的宽度 */
    position: fixed; /* 设置为固定定位 */
    top: 10%; /* 距离顶部的距离 */
    left: 4%; /* 距离左侧的距离 */
    height: 100%; /* 设置导航栏的高度 */
}

.login-container {
    padding: 10px; /* 调整容器的内边距 */
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

nav li {
    margin-bottom: 25%;
    display: flex;
    align-items: center;
}

nav img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

nav a {
    font-family: "CustomFont", sans-serif; /* 使用自定义字体 */
    font-size: 50px; /* 设置字体大小 */
    font-weight: 300; /* 设置字体粗细 */
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: #000000;
}

nav a:hover {
    background-color: #ddd;
}

@font-face {
    font-family: "CustomFont"; /* 自定义字体名称 */
    src: url("../../assets/font/FZZJ-WHJZTJW.TTF"); /* 字体文件路径 */
}
</style>

<script>
export default {
    data() {
        return {
            activeTab: "home", // 初始选中的选项
        };
    },
    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
            if (tab === "home") {
                this.$emit("update-page", { is_func_page: false, is_other: false });
            } else if (tab === "features") {
                this.$emit("update-page", { is_func_page: true, is_other: false  });
            } else if (tab === "other") {
                this.$emit("update-page", { is_other: true ,is_func_page: false });
            }
            console.log("传递成功")
        },
    
        moveUp() {
            switch (this.activeTab) {
                case "home":
                    this.activeTab = "other";
                    break;
                case "features":
                    this.activeTab = "home";
                    break;
                case "other":
                    this.activeTab = "features";
                    break;
                default:
                    break;
            }
        },
        moveDown() {
            switch (this.activeTab) {
                case "home":
                    this.activeTab = "features";
                    break;
                case "features":
                    this.activeTab = "other";
                    break;
                case "other":
                    this.activeTab = "home";
                    break;
                default:
                    break;
            }
        },
    },
};
</script>
