<template>
    <div class="avatar" id="avatar">
        <!-- <img src="" alt="" class="nav_avatar_border"> -->
        <div
            class="nav_avatar"
            :style="{ backgroundImage: setBackgroundImageUrl }"
        >
            <div class="nav_avatar_img_container" v-show="is_login">
                <img src="./img/avatar.png" alt="" class="nav_avatar_img" />
            </div>
            登录
        </div>
    </div>
</template>
<script>
import { watch } from "vue";
import { useStore } from "vuex";
import store from "@/store/index.js";
export default {
    data() {
        return {
            is_login: false,
        };
    },
    props: {
        setBackgroundImageUrl: {},
    },
    created() {
        if (store.state.is_login) this.is_login = true;
        const $store = useStore();
        watch(
            () => $store.state.is_login,
            (val, old) => {
                this.is_login = val;
            }
        );
    },
};
</script>
<style scoped>
.avatar {
    margin: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.nav_avatar {
    pointer-events: all;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #8222965f;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 500;
    -webkit-text-stroke: 0.3px white;
    font-size: 16px;
    font-family: Heiti;
}
.nav_avatar::after {
    content: " ";
    background-image: var(--avatar-border, " ");
    background-size: cover;
    background-position: center;
    width: 140%;
    height: 140%;
    position: absolute;
    left: -20%;
    top: -20%;
    overflow: hidden;
    /* border: 1px solid red; */
}
.nav_avatar_img_container {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
}
.nav_avatar_img {
    width: 100%;
    height: 100%;
}
</style>
