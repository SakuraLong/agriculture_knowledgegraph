<template>
    <div class="avatar" id="avatar">
        <!-- <img src="" alt="" class="nav_avatar_border"> -->
        <div
            class="nav_avatar"
        >
            <div class="nav_avatar_img_container" v-show="is_login">
                <img src="./img/avatar.png" alt="" class="nav_avatar_img" draggable="false" />
            </div>
            登录
            <div v-if="edit" class="avatar_edit" @click="editClick">编辑</div>
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
    props: ["edit", "edit_func"],
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
    methods:{
        editClick(){
            this.edit_func();
        }
    }
};
</script>
<style scoped>
.avatar {
    user-select: none;
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
.avatar_edit{
    cursor: pointer;
    position: absolute;
    right: 5%;
    bottom: 5%;
    z-index: 10;
    background-color: white;
    color: black;
    font-family: Heiti;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid #822296;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 600;
}
</style>
