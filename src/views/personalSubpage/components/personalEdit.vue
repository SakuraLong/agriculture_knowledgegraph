<template>
    <!-- @click转到个人信息编辑页面 -->
    <div @click="toEditPersonal" class="personal-edit-container">
        <div class="personal-edit-btn">
            <div id="Edit" class="Edit"></div>
            <label for="Edit" class="Edit-label">编辑个人信息</label>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        toEditPersonal() {
            this.$emit("toEditPersonal");
        },
    },
};
</script>

<style scoped>
.personal-edit-container {
    position: relative;
    cursor: pointer;
    width: 100px;
    /* height: 70px; */
    height: 100%;
    display: flex;
    align-items: flex-end;
}

.personal-edit-btn {
    width: 100%;
    height: 100%;
    max-height: 80px;
    border: solid darkslateblue 3px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.personal-edit-btn:hover {
    transform: scale(1.1);
    background-color: lightgray;
    transition: background-color 0.2s;
}

.Edit {
    position: relative;
    content: "";
    background: url(../img/edit.png) no-repeat;
    background-size: contain;
    width: 45px;
    height: 45px;
}

.Edit-label {
    font-size: 15px;
    position: relative;
    margin-top: 5px;
}
</style>
