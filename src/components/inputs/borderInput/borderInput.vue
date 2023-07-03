<template>
    <label
        class="border_input"
        :data-text="title"
    >
        <input
            class="input_ele"
            type="text"
            v-model="input_msg"
        />
    </label>
</template>

<script>
export default {
    data(){
        return {
            input_msg:""
        };
    },
    props:["title"],
    methods:{
        change(){
            this.$emit("change", this.input_msg);
        },
        get(){
            return this.input_msg;
        }
    },
    watch:{
        "input_msg"(){
            this.change();
        }
    }
};
</script>
<style scoped>
.border_input {
    font-family: Heiti;
    position: relative;
    width: 260px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(144, 119, 149);
    margin-top: 10px;
    margin-bottom: 10px;
}
.border_input::after {
    padding-left: 5px;
    padding-right: 5px;
    font-size: 17px;
    display: flex;
    align-items: center;
    width: auto;
    height: 20px;
    position: absolute;
    left: 5%;
    top: -12px;
    background-color: white;
    content: attr(data-text);
    z-index: 1;
    color: rgb(144, 119, 149);
}
.border_input:has(.input_ele:focus)::after {
    color: #e77ffb;
}
.border_input:has(.input_ele:focus) {
    border: 2px solid #e77ffb;
}
.border_input:has(.input_ele:hover) {
    box-shadow: 0px 0px 2px #e77ffb;
}
.input_ele {
    position: relative;
    width: 240px;
    height: 40px;
    border: 0; /*清除自带的2px的边框*/
    padding: 0; /*清除自带的padding间距*/
    outline: none; /*清除input点击之后的黑色边框*/
    /* border: 1px solid red; */
    z-index: 0;
    font-size: 24px;
}
.input_ele:focus {
    caret-color: #e77ffb;
}
</style>
