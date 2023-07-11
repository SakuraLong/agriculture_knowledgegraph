<template>
    <borderSelect class="rn-input-ele" title="证件类型" :items="IDtypes" />
    <borderInput class="rn-input-ele" title="证件号" :msg="ID" />
</template>

<script>
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import borderSelect from "@/components/selects/borderSelect/boderSelect.vue";
export default {
    props: {
        IDtype: Number,
        ID: String,
    },
    data() {
        return {
            IDtypes: ["居民身份证"],
        };
    },
    components: {
        borderSelect,
        borderInput,
    },
};
</script>

<style>
.rn-input-ele {
    margin-bottom: 30px;
}
</style>
