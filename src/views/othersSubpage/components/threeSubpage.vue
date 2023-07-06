<template>
    <div style="display: flex;justify-content: center;position: relative;width:100%;height:100%;left:0;top:0;">
        <!-- <languageSubpage></languageSubpage> -->
        <!-- <aboutSubpage></aboutSubpage> -->
        <div style="position: relative;top:0;">

        </div>
    </div>
</template>

<script>
import languageSubpage from "@/views/othersSubpage/components/languageSubpage.vue";
import aboutSubpage from "@/views/othersSubpage/components/aboutSubpage.vue";
export default {
    data(){
        return{
            subpageSelected:[true,false,false],
        };
    },
    components: {
        // languageSubpage,
        // aboutSubpage,
    }
};
</script>

<style>
</style>
