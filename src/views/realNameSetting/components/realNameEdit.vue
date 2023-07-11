<template>
    <borderInput class="rn-input-ele" title="真实姓名" :msg="name" />
</template>

<script>
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
export default {
    props: {
        name: String,
    },
    data() {
        return {};
    },
    components: {
        borderInput,
    },
};
</script>

<style>
.rn-input-ele {
    margin-bottom: 30px;
}
</style>
