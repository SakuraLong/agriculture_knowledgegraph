<template>
    <div>
        <borderInput></borderInput>
        <transition>
            <!-- <linePrompt style="width: 260px;" data_left="assss" :type=""></linePrompt> -->
        </transition>
    </div>
</template>

<script>
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import linePrompt from "@/components/prompts/line/linePrompt.vue";
export default {
    data(){
        return{

        };
    },
    components:{
        borderInput,
        // linePrompt
    }
};
</script>

<style></style>
