<template>
    <div class="shutter" @resize="pageResize">
        <img src="./img/top.png" alt="" class="shutter_top" id="shutter_top" />
        <div
            class="pointer"
            :class="[
                !has_right_girl
                    ? 'shutter_top_container_4block'
                    : 'shutter_top_container_3block',
            ]"
            id="shutter_top_container"
        >
            <div style="border: 1px solid red">这里之后会放吉祥物组件</div>
            <div style="border: 1px solid red"></div>
            <div
                :class="[
                    has_right_girl
                        ? 'shutter_top_container_4block_leftbot'
                        : 'shutter_top_container_3block_leftbot',
                ]"
                style="border: 1px solid red"
            >
                <slot name="show_child_page">用户</slot>
            </div>
            <div v-if="has_right_girl" style="border: 1px solid red">
                这里之后会放吉祥物组件
            </div>
        </div>
        <img
            src="./img/bottom.png"
            alt=""
            class="shutter_bottom"
            id="shutter_bottom"
        />
    </div>
</template>
<script>
export default {
    props: ["has_right_girl"],
    mounted() {
        window.addEventListener("resize", this.pageResize);
        this.pageResize();
    },
    methods: {
        pageResize() {
            // h=714 t_w=812 b_w=288 r=550 550
            // h=442 t_w=502 b_w=178 r=330
            // h=600 r=430 min
            // h_=272 r_=220 h_/r_=1.24
            // 929 1057 375 700
            // h_=215 150 1.43
            let ratio = {
                h: 714,
                r: 550,
                ra: 0.8,
                ra_: 0.8,
            };
            let top_r = 1.14;
            let bot_r = 0.4;
            let shutter_height =
                document.getElementById("shutter_top").clientHeight;
            let shutter_top_w =
                document.getElementById("shutter_top").clientWidth;
            let shutter_bottom_w =
                document.getElementById("shutter_bottom").clientWidth;
            shutter_top_w =
                shutter_top_w === 0 ? shutter_height * top_r : shutter_top_w;
            shutter_bottom_w =
                shutter_bottom_w === 0
                    ? shutter_height * bot_r
                    : shutter_bottom_w;

            document.getElementById("shutter_bottom").style.right =
                ((shutter_height - ratio.h) * ratio.ra + ratio.r).toString() +
                "px";
            document.getElementById("shutter_top_container").style.width =
                (shutter_top_w * 0.85).toString() + "px";
            document.getElementById("shutter_top_container").style.height =
                (shutter_top_w * 0.85).toString() + "px";

            let num =
                ((shutter_height - ratio.h) * ratio.ra_ + ratio.r).toString() +
                "px";
            console.log(num);
            let str_0 = num.toString() + " auto";
            let str_1 = "auto " + num.toString();

            document.getElementById(
                "shutter_top_container"
            ).style.gridTemplateColumns = str_0;
            document.getElementById(
                "shutter_top_container"
            ).style.gridTemplateRows = str_1;
        },
    },
};
</script>
<style scoped>
.shutter {
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 0px;
    /* width: 1000px; */
    /* height: 879px; */
    width: 100%;
    height: 100%;
    z-index: 9999;
    border: 1px solid red;
    min-height: 600px;
}
.pointer{
    pointer-events: all;
}
.shutter_top {
    border: 2px solid red;
    position: absolute;
    top: 0%;
    right: 0%;
    pointer-events: all;
    height: 100%;
}
.shutter_bottom {
    z-index: -1;
    height: 100%;
    position: absolute;
    right: 550px;
}
.shutter_top_container_4block {
    position: absolute;
    right: 0%;
    border: 1px solid green;
    width: 80%;
    height: 100%;

    display: grid;
    grid:
        ". ."
        ". .";
    grid-template-columns: 550px auto;
    grid-template-rows: auto 550px;
    opacity: 0.5;
}
.shutter_top_container_3block {
    position: absolute;
    right: 0%;
    border: 1px solid green;
    width: 80%;
    height: 100%;

    display: grid;
    grid:
        ". ."
        ". .";
    grid-template-columns: 550px auto;
    grid-template-rows: auto 550px;
    opacity: 0.5;
}
.shutter_top_container_4block_right {
    display: block;
}
.shutter_top_container_3block_right {
    display: none;
}
.shutter_top_container_3block_leftbot {
    grid-column-start: 1;
    grid-column-end: 3;
}

.shutter_top_container_4block_leftbot {
    grid-column-start: 1;
    grid-column-end: 1;
}
@media screen and (max-height: 650px) {
    .shutter_top_container {
        height: 50%;
    }
}
</style>
