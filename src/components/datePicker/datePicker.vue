<template>
    <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
        :disabledDate="disabledDate"
        @change="handleChange"
        format="YYYY年 M月 D日"
        class="custom-date-picker"
    ></el-date-picker>
</template>
<style>
.custom-date-picker {
    /* border-radius: var(--borderRadius-medium, 6px); */
    /* color:aqua; */
}
.custom-date-picker .el-input__inner {
    /* color: #822269; */
    /* background-color: aqua; */
}
/* 图标 */
.el-input__icon{
    /* background-color: #822269; */
}
</style>

<script>
export default {
    data() {
        return {
            date: Date.now(), // 初始日期为2022年11月15日
        };
    },
    methods: {
        handleChange(value) {
            // console.log(value); // 选择的日期
        },
        disabledDate(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // 设置时间为 00:00:00
            return date.getTime() > today.getTime(); // 返回是否禁用日期
        },
    },
};
</script>
