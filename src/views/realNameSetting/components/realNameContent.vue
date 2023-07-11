<template>
    <form>
        <borderInput title="真实姓名" :msg="name" />
        <borderInput title="电话号码" :msg="phonenumber" />
        <borderSelect title="证件类型" :items="IDtypes" />
        <borderInput title="证件号" :msg="ID" />
    </form>
</template>

<script>
import borderInput from "@/components/inputs/borderInput/borderInput.vue";
import borderSelect from "@/components/selects/borderSelect/boderSelect.vue";
export default {
    props: {
        name: String,
        phonenumber: String,
        IDtype: Number,
        ID: String,
    },
    data() {
        return {
            IDtypes: ["居民身份证"],
        };
    },
    components: {
        borderInput,
        borderSelect,
    },
};
</script>

<style></style>
