<template>
    <div
        style="
            display: flex;
            justify-content: center;
            position: relative;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        "
    >
        <Transition
            ><languageSubpage v-show="subpageSelected[0]"></languageSubpage
        ></Transition>
        <transition
            ><aboutSubpage v-show="subpageSelected[1]"></aboutSubpage
        ></transition>
        <transition
            ><div
                style="background-color: aqua"
                v-show="subpageSelected[2]"
            ></div
        ></transition>
    </div>
</template>

<script>
import languageSubpage from "@/views/othersSubpage/components/languageSubpage.vue";
import aboutSubpage from "@/views/othersSubpage/components/aboutSubpage.vue";
export default {
    props: {
        subpageSelected: {
            type: Array,
        },
    },
    data() {},
    components: {
        languageSubpage,
        aboutSubpage,
    },
    mounted() {
        console.log(this.subpageSelected[0]);
    },
};
</script>

<style scoped>
.page0_transition-enter{
    opacity: 0;
    background-color: red;
}
.page0_transition-enter-active{
    transition: opacity 0.5s ease;
}
.page0_transition-enter-to{
    opacity: 1;
}
.v-leave-active {
  transition: opacity 0.5s ease;
  
}

.v-enter-active
{
  transition: opacity 0.5s ease;
  transition-delay: 0.1s;
}
.v-enter-from{
    opacity: 0;
}
.v-leave-to {
  opacity: 0;
}
</style>
