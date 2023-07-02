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
    width: 300px;
    position: fixed;
    top: 10%;
    left: 4%;
    height: 100%;
}

.login-container {
    padding: 10px;
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
    position: relative;
}

.tab-content {
    display: flex;
    align-items: center;
}

nav img {
    width: 40px;
    height: 40px;
    transition: transform 0.3s;
}

nav a {
    font-family: "CustomFont", sans-serif;
    font-size: 50px;
    font-weight: 300;
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: #000000;
    transition: transform 0.3s;
}

nav li.active a {
    transform: translateX(10px);
}

nav li.active img {
    transform: translateX(10px);
}

@font-face {
    font-family: "CustomFont";
    src: url("../../assets/font/FZZJ-WHJZTJW.TTF");
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
                this.$emit("update-page", { is_main:true,is_func: false, is_other: false });
            } else if (tab === "features") {
                this.$emit("update-page", { is_main:false,is_func: true, is_other: false  });
            } else if (tab === "other") {
                this.$emit("update-page", { is_main:false,is_other: true ,is_func: false });
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
