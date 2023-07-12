<template>
    <div class="rn-input-ele">
        <borderInput ref="borderInput" title="证件号" :msg="ID" />
        <linePrompt
            :opacity="error"
            style="width: 260px"
            :data_left="error"
            type="error"
        ></linePrompt>
    </div>
</template>

<script>
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
import Checker from "@/assets/js/checker/checker.js";
export default {
    props: {
        ID: String,
    },
    data() {
        return { error: "" };
    },
    components: {
        borderInput,
        linePrompt,
    },
    methods: {
        get() {
            let str = this.$refs.borderInput.get();
            if (new Checker(str, ["no-null"]).check()) {
                if (
                    new Checker(str, [
                        "sql-check",
                        "no-zh-Hans",
                        "no-spacing",
                        "no-base-symbols",
                    ]).check()
                ) {
                    if (
                        new Checker(str, [
                            "is-num",
                            "@length-max=18",
                            "@length-min=18",
                        ]).check()
                    ) {
                        this.error = "";
                        return { msg: str, type: "ID" };
                    } else {
                        this.error = "证件号码是18位数字";
                        return false;
                    }
                } else {
                    this.error = "证件号码不能包含非法字符";
                    return false;
                }
            } else {
                this.error = "证件号码不能为空";
                return false;
            }
        },
    },
};
</script>

<style scoped></style>
