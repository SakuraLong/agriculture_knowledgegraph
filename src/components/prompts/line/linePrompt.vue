<template>
    <div
        class="line_prompts"
        :class="{
            has_left: data_left,
            has_right: data_right,
            default_theme: theme.default,
            error:theme.error,
            warning:theme.warning,
            success:theme.success

        }"
        :data-left="data_left"
        :data-right="data_right"
    ></div>
</template>

<script>
export default {
    data() {
        return {
            theme: {
                default: true,
                error: false,
                warning: false,
                success: false,
            },
        };
    },
    mounted() {},
    methods: {
        themeInit() {
            if (this.type === "default") {
                this.default = true;
                this.error = false;
                this.warning = false;
                this.success = false;
            } else if (this.type === "error") {
                this.default = false;
                this.error = true;
                this.warning = false;
                this.success = false;
            } else if (this.type === "warning") {
                this.default = false;
                this.error = false;
                this.warning = true;
                this.success = false;
            } else if (this.type === "success") {
                this.default = false;
                this.error = false;
                this.warning = false;
                this.success = true;
            }
        },
    },
    props: ["data_left", "data_right", "type"],
};
</script>

<style scoped>
.line_prompts {
    pointer-events: all;
    position: relative;
    /* position: absolute;
    top: 39%; */
    /* color: rgb(144, 119, 149); */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Heiti;
    height: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
    /* border: 1px solid rgb(255, 61, 61); */
    background-color: white;
    font-size: 17px;
    z-index: 10;
}
.default_theme {
    border: 1px solid rgb(144, 119, 149);
}
.default_theme::after,
.default_theme::before{
    color: rgb(144, 119, 149);
}
.error {
    border: 1px solid rgb(255, 65, 65);
}
.error::after,
.error::before{
    color: rgb(255, 65, 65);
}
.warning {
    border: 1px solid rgb(248, 208, 9);
}
.warning::after,
.warning::before{
    color: rgb(248, 208, 9);
}
.success {
    border: 1px solid rgb(4, 255, 0);
}
.success::after,
.success::before{
    color: rgb(4, 255, 0);
}
.has_left::after,
.has_left::before{
    font-weight: 600;
    position: absolute;
    left: 5%;
    top: -15px;
    content: attr(data-left);
    background-color: white;
    width: auto;
    height: 20px;
    padding-left: 5px;
    padding-right: 5px;
}
.has_left::before{
    content: attr(data-right);
}
</style>
