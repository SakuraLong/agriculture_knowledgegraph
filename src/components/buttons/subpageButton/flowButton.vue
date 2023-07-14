<template>
    <button class="test_class1"
            :class="{ test_class3: judge_isSelected }">
        <div class="button_text" :data-text='content_text'>
            {{ content_text }}
        </div>
    </button>
</template>
<script>
export default {
    props: ["judge_isSelected", "content_text"],
};
</script>
<style scoped>
.test_class1 {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 150px;
    height: 50px;
    background: none;
    border: 4px solid var(--flowButton-border-color);
    color: var(--flowButton-color);
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-transform: uppercase; 大写文本 */
    cursor: pointer;
    position: relative;
}
.test_class1::before,
.test_class1::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 4px;
    background: var(--flowButton-after-background-color);
    transform: skewX(50deg);
    transition: 0.4s linear;
}
.test_class1::before {
    top: -4px;
    left: 10%;
}
.test_class1::after {
    bottom: -4px;
    right: 10%;
}
.test_class1:hover::before {
    left: 80%;
}
.test_class1:hover::after {
    right: 80%;
}
.test_class1:hover {
    /* color: #3498db; */
}
.test_class3 {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 150px;
    height: 50px;
    background-color: var(--flowButton-selected-background-color);
    border: 4px solid var(--flowButton-selected-border-color);
    color: var(--flowButton-selected-color);
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-transform: uppercase; 大写文本 */
    cursor: pointer;
    position: relative;
}
.test_class3::before,
.test_class3::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 4px;
    background: var(--flowButton-selected-after-background-color);
    transform: skewX(50deg);
    transition: 0.4s linear;
}
.test_class3::before {
    top: -4px;
    left: 80%;
}
.test_class3::after {
    bottom: -4px;
    right: 80%;
}
.button_text {
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
.test_class1:hover > .button_text {
    color: var(--flowButton-hover-button-color);
}
.test_class1:hover > .button_text::after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    -webkit-text-stroke: 6px var(--flowButton-hover-button-after-webkit-text-stroke-color);
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
