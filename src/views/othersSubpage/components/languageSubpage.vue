<template>
    <div
        style="
            display: flex;
            flex-direction: column;
            position: absolute;
            /* left: 40%; */
            justify-content: center;
            align-items: center;
            width: 70%;
            height: 80%;
            /* top:10%; */
        "
    >
        <!-- <button
            class="test_class1"
            :class="{ test_class3: index_arr[0] }"
            @click="changeLanguage(0)"
        >
            <div class="button_text" data-text="简体中文">简体中文</div>
        </button> -->
        <flowButton :judge_isSelected="index_arr[0]" content_text='简体中文' @click="changeLanguage(0)"></flowButton>
        <flowButton :judge_isSelected="index_arr[1]" content_text='English' @click="changeLanguage(1)"></flowButton>
        <!-- <button
            class="test_class1"
            :class="{ test_class3: index_arr[1] }"
            @click="changeLanguage(1)"
        >
            <div class="button_text" data-text="English">English</div>
        </button> -->
    </div>
</template>
<script>
import Storage from "@/assets/js/storage/storage.js";
import flowButton from "@/components/buttons/subpageButton/flowButton.vue";
const language_arr = ["zh-Hans", "en"];
export default {
    methods: {
        changeLanguage(index) {
            this.radio1 = language_arr[index];
            this.index_arr.forEach((element, index) => {
                this.index_arr[index] = false;
            });
            this.index_arr[index] = true;
            this.$i18n.locale = language_arr[index];
            // let a=this.$t("views.othersSubpage.language");
            // console.log(a);
        },
    },
    data() {
        return {
            radio1: "en",
            index_arr: [false, false],
        };
    },
    watch: {
        radio1() {
            Storage.set(0, "LANGUAGE", this.radio1);
            // console.log(t('views.othersSubpage.language'));
            console.log(this.index_arr);
        },
    },
    mounted() {
        this.radio1 = Storage.get(0, "LANGUAGE", "en");
        this.changeLanguage(language_arr.indexOf(this.radio1));
    },
    components:{
        flowButton,
    }
};
</script>
<style scoped>
.radio_class > input {
    /* width: 1000px !important; */
    border: solid 1px red;
}
</style>
