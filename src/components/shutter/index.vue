<template>
    <div class="shutter">
        <div class="shutter_top">
            <div class="shutter_top_container">
                <div style="background-color: aqua;">
                小人
                </div>
                <div style="background-color: red;">
                </div>
                <div style="background-color: darkblue;">
                    <slot>用户</slot>
                </div>
                <div style="background-color: blue;">
                小人
                </div>
            </div>
        </div>
        <img src="./img/bottom.png" alt="" class="shutter_bottom">
        <!-- <div class="shutter_bottom"></div> -->
        <!-- <div class="shutter_content">
            <div class="shutter_top">
                <div class="shutter_top_container">
                    <div style="background-color: aqua;"></div>
                    <div style="background-color: red;"></div>
                    <div style="background-color: darkblue;"></div>
                    <div style="background-color: blue;"></div>
                </div>
            </div>
            <div class="shutter_bottom"></div>
        </div> -->
    </div>
</template>
<script>
export default{
    props:["has_right_girl"]
};
</script>
<style scoped>
.shutter{
    pointer-events: none;
    display: block;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 1000px;
    height: 879px;
    z-index: 9999;
    border: 1px solid red;
}
.test{
    border: 1px solid red;
    width: 50%;
    height: 50%;
}
.shutter_content{
    position: absolute;
    right: 0;
    width: 70%;
    height: 100%;
    border: 2px solid red;
}
.shutter_top{
    position: absolute;
    top: 0%;
    right: 0%;
    pointer-events: all;
    width: 100%;
    height: 100%;
    background-image: url("./img/top.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right top;
}
.shutter_bottom{
    /* border: 2px solid red;
    position: absolute;
    left: 20%;
    width: 50%;
    height: 100%;
    background-image: url("./img/bottom.png");
    background-position: left top;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1; */
    z-index: -1;
    height: 100%;
    position: absolute;
    left: 20px;
}
.shutter_top_container{
    position: absolute;
    top: 5%;
    right: 0%;
    border: 1px solid green;
    width: 80%;
    height: 70%;

    display: grid;
    grid:
	'. .'
	'. .';
    grid-template-columns: 80% 20%;
	grid-template-rows: 20% 80%;
}
@media screen and (max-height:650px) {
    .shutter_top_container{
        height: 50%;
    }
}
</style>