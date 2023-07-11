<template>
    <borderInput class="rn-input-ele" title="电话号码" :msg="phonenumber" />
</template>

<script>
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
export default {
    props: {
        phonenumber: String,
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
