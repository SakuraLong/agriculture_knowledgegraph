<template>
    <!-- @click转到个人信息编辑页面 -->
    <div class="personal-edit-container">
        <div id="Edit" class="Edit"></div>
        <label for="Edit">编辑个人信息</label>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style scoped>
.personal-edit-container {
    cursor: pointer;
    margin: auto;
    width: 130px;
    height: 100px;
    border: solid darkslateblue 3px;
    border-radius: 15px;
}

.personal-edit-container:hover {
    transform: scale(1.1);
    background-color: lightgray;
    transition: background-color 0.2s;
}
.Edit {
    position: relative;
    content: "";
    background: url(../img/edit.png) no-repeat;
    background-size: contain;
    margin: auto;
    top: 10px;
    width: 50px;
    height: 70px;
}
</style>
