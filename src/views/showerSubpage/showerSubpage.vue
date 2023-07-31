<template>
    <div class="shower_subpage" ref="shower_subpage">
        <entityQuerySubpage ref="son_0"></entityQuerySubpage>
        <entityRecognitionSubpage ref="son_1"></entityRecognitionSubpage>
        <relationshipQuerySubpage ref="son_2"></relationshipQuerySubpage>
        <overviewSubpage ref="son_3"></overviewSubpage>
        <QASubpage ref="son_4"></QASubpage>
    </div>
</template>

<script>
import entityQuerySubpage from "./components/entityQuerySubpage.vue";
import entityRecognitionSubpage from "./components/entityRecognitionSubpage.vue";
import relationshipQuerySubpage from "./components/relationshipQuerySubpage.vue";
import overviewSubpage from "./components/overviewSubpage.vue";
import QASubpage from "./components/QASubpage.vue";

export default {
    data() {
        return {
            show_catalogue: true,
            renderer: null,
            sct: 0,
        };
    },
    components: {
        entityQuerySubpage,
        entityRecognitionSubpage,
        relationshipQuerySubpage,
        overviewSubpage,
        QASubpage,
    },
    mounted() {
        this.scrollTo(0);
    },
    methods: {
        scrollTo(index) {
            if(index === 0 || index === 6) return;
            index--;
            this.$refs.shower_subpage.scrollTo({
                top: this.$refs["son_" + index.toString()].getOffsetTop(),
                behavior: "smooth",
            });
        },
    },
};
</script>

<style scoped>
.shower_subpage {
    user-select: text;
    width: 100%;
    height: 100%;
    position: absolute;
    border: 1px solid red;
    font-family: Songti;
    font-size: 20px;
    overflow: hidden;
}
</style>
