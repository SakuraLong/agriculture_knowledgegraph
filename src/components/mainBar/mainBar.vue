<template>
    <div class="mainBar">
        <div class="login-container">
            <nav>
                <ul>
                    <li
                        :class="{ active: activeTab === 'home' }"
                        @click="setActiveTab('home')"
                        @mouseenter="move('home')"
                        @keydown.arrow-up.prevent="moveUp"
                        @keydown.arrow-down.prevent="moveDown"
                        @keydown.enter.prevent="setActiveTab(activeTab)"
                        :style="{
                            transform:
                                activeTab === 'home'
                                    ? `translateX(${moveDistance}px)`
                                    : 'none',
                        }"
                        tabindex="0"
                    >
                        <div class="tab-content">
                            <img
                                v-if="activeTab === 'home'"
                                src="./img/arrow.png"
                                style="width: 40px; height: 40px"
                                class="arrow"
                            />
                            <img
                                v-else
                                :src="transparentImage"
                                style="width: 40px; height: 40px"
                            />
                            <a href="#">首页</a>
                        </div>
                    </li>
                    <li
                        :class="{ active: activeTab === 'features' }"
                        @click="setActiveTab('features')"
                        @mouseenter="move('features')"
                        @keydown.arrow-up.prevent="moveUp"
                        @keydown.arrow-down.prevent="moveDown"
                        @keydown.enter.prevent="setActiveTab(activeTab)"
                        :style="{
                            transform:
                                activeTab === 'features'
                                    ? `translateX(${moveDistance}px)`
                                    : 'none',
                        }"
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
                        @mouseenter="move('other')"
                        @keydown.arrow-up.prevent="moveUp"
                        @keydown.arrow-down.prevent="moveDown"
                        @keydown.enter.prevent="setActiveTab(activeTab)"
                        :style="{
                            transform:
                                activeTab === 'other'
                                    ? `translateX(${moveDistance}px)`
                                    : 'none',
                        }"
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
    position: relative;
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

nav li:hover {
    cursor: pointer;
}

nav img {
    width: 40px;
    height: 40px;
}

nav a {
    font-family: "FZZJ-WHJZTJW", sans-serif;
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
</style>

<script>
export default {
    data() {
        return {
            activeTab: "home", // 初始选中的选项
            initialTab: "home", // 初始存储的页面
        };
    },
    computed: {
        transparentImage() {
            const canvas = document.createElement("canvas");
            canvas.width = 40;
            canvas.height = 40;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return canvas.toDataURL();
        },
    },
    mounted() {
        // Add the mouseleave event listener to reset the active tab
        const mainBar = document.querySelector(".mainBar");
        mainBar.addEventListener("mouseleave", this.resetActiveTab);
    },
    beforeUnmount() {
        // Remove the mouseleave event listener when the component is unmounted
        const mainBar = document.querySelector(".mainBar");
        mainBar.removeEventListener("mouseleave", this.resetActiveTab);
    },
    methods: {
        resetActiveTab() {
            this.activeTab = this.initialTab;
        },

        setActiveTab(tab) {
            this.activeTab = tab;
            this.initialTab = tab;
            if (tab === "home") {
                this.$emit("update-page", {
                    is_main: true,
                    is_func: false,
                    is_other: false,
                });
            } else if (tab === "features") {
                this.$emit("update-page", {
                    is_main: false,
                    is_func: true,
                    is_other: false,
                });
            } else if (tab === "other") {
                this.$emit("update-page", {
                    is_main: false,
                    is_other: true,
                    is_func: false,
                });
            }
            console.log("传递成功");
        },
        move(tab) {
            this.activeTab = tab;
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
