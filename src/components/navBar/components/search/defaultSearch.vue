<template>
    <div class="default_search_container">
        <div
            class="default_search_body"
            @click="this.$refs.default_search_input.focus()"
        >
            <Search :color="icon_color" class="search_icon" />
            <input
                class="default_search_input"
                ref="default_search_input"
                type="text"
                placeholder="搜索数据"
            />
            <Close :color="icon_color" class="close_icon" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            icon_color: "gary",
        };
    },
};
</script>

<style scoped>
.default_search_container {
    pointer-events: all;
    position: relative;
    width: 350px;
    height: 100%;
    /* border: 1px solid red; */
    /* right: 350px; */
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.default_search_body {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 30px;
    border: 1px solid rgba(128, 128, 128, 0.544);
    border-radius: 30px;
    background-color: white;
    transition: all 0.1s ease-out;
}
.default_search_body:hover {
    border: 1px solid #822296;
}
.search_icon,
.close_icon {
    position: absolute;
    width: 20px;
    height: 20px;
}
.search_icon {
    left: 1%;
}
.close_icon {
    right: 1%;
}
.default_search_input {
    width: 85%;
    height: 100%;
    line-height: 100%;
    font-size: 18px;
}
.default_search_body:has(.default_search_input:focus) {
    border: 1px solid #822296;
    box-shadow: 0px 0px 7px #8222966f;
}
.default_search_input::placeholder {
    line-height: 100%;
    font-size: 18px;
    color: gray;
}
</style>
