<template>
    <div class="stock_forecast_container">
        <div class="stock_forecast_head"></div>
        <div class="stock_forecast_body">
            <stockMapSubpage></stockMapSubpage>
        </div>
    </div>
</template>

<script>
import stockMapSubpage from "./stockMapSubpage.vue";
export default {
    components:{
        stockMapSubpage
    }
};
</script>

<style scoped>
.stock_forecast_container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: white;
}
.stock_forecast_head {
    width: 100%;
    height: 50px;
    position: relative;
    border: 1px solid red;
}
.stock_forecast_body{
    width: 100%;
    position: relative;
    height: calc(100% - 50px);
    border: 1px solid red;
}
</style>
