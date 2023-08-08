<template>
    <div class="stock_market_container">
        <div class="head_container">
            <div class="collect">
                <div
                    class="collect_button"
                    :class="{ is_collect: is_collect === '取消收藏' }"
                    @click="collectClick"
                >
                    {{ is_collect }}
                </div>
                <el-select
                    v-model="collect"
                    placeholder=""
                    style="width: 100px; font-size: 15px"
                    :disabled="is_waiting || all_page === 0"
                >
                    <el-option
                        v-for="item in collects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                    />
                </el-select>
                <div class="collect_msg">收藏信息</div>
            </div>
            <div class="name">
                <div class="name_ele name_ele_l">
                    <span>{{ title }}</span>
                </div>
                <div class="name_ele name_ele_r">
                    <span>{{ code }}</span>
                </div>
            </div>
            <div class="search">
                <defaultSearch
                    style="z-index: 1000; width: 300px"
                    @search="search"
                    ref="default_search"
                    :is_stock="true"
                ></defaultSearch>
            </div>
        </div>
        <div class="data_shower" id="data_shower"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import testMsg from "@/assets/js/testMsg";
import defaultSearch from "@/components/navBar/components/search/defaultSearch.vue";
import Connector from "@/assets/js/connector/connector";
export default {
    data() {
        return {
            data_shower: null,
            data: null,
            data_use: "",
            upColor: "#ec0000",
            upBorderColor: "#8A0000",
            downColor: "#00da3c",
            downBorderColor: "#008F28",
            title: "当前还未搜索",
            code: "未知",
            collect: "",
            collects: [
                {
                    label: "平安银行",
                    value: "平安银行",
                },
            ],
            is_collect: "取消收藏",
        };
    },
    components: {
        defaultSearch,
    },
    mounted() {
        this.showSMInfoByData(testMsg.SM_data, "平安银行");
    },
    methods: {
        showSMInfoByData(data, title) {
            this.data = data;
            if (this.data_shower != null) {
                try {
                    this.data_shower.dispose();
                } catch {
                    //
                    console.log("销毁错误");
                }
                this.data_shower = null;
            }
            this.data_use = this.splitData(this.data);
            let dom = document.getElementById("data_shower");
            let data_shower = echarts.init(dom, null, {
                renderer: "canvas",
                useDirtyRect: false,
            });
            let option = {
                title: {
                    text: title + " 上证指数",
                    left: 0,
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                    },
                },
                legend: {
                    data: ["日K", "MA5", "MA10", "MA20", "MA30"],
                },
                grid: {
                    left: "10%",
                    right: "10%",
                    bottom: "15%",
                },
                xAxis: {
                    type: "category",
                    data: this.data_use.categoryData,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    min: "dataMin",
                    max: "dataMax",
                },
                yAxis: {
                    scale: true,
                    splitArea: {
                        show: true,
                    },
                },
                dataZoom: [
                    {
                        type: "inside",
                        start: 50,
                        end: 100,
                    },
                    {
                        show: true,
                        type: "slider",
                        top: "90%",
                        start: 50,
                        end: 100,
                    },
                ],
                series: [
                    {
                        name: "日K",
                        type: "candlestick",
                        data: this.data_use.values,
                        itemStyle: {
                            color: this.upColor,
                            color0: this.downColor,
                            borderColor: this.upBorderColor,
                            borderColor0: this.downBorderColor,
                        },
                        markPoint: {
                            label: {
                                formatter: function (param) {
                                    return param != null
                                        ? Math.round(param.value) + ""
                                        : "";
                                },
                            },
                            data: [
                                {
                                    name: "Mark",
                                    coord: ["2013/5/31", 2300],
                                    value: 2300,
                                    itemStyle: {
                                        color: "rgb(41,60,85)",
                                    },
                                },
                                {
                                    name: "highest value",
                                    type: "max",
                                    valueDim: "highest",
                                },
                                {
                                    name: "lowest value",
                                    type: "min",
                                    valueDim: "lowest",
                                },
                                {
                                    name: "average value on close",
                                    type: "average",
                                    valueDim: "close",
                                },
                            ],
                            tooltip: {
                                formatter: function (param) {
                                    return (
                                        param.name +
                                        "<br>" +
                                        (param.data.coord || "")
                                    );
                                },
                            },
                        },
                        markLine: {
                            symbol: ["none", "none"],
                            data: [
                                [
                                    {
                                        name: "from lowest to highest",
                                        type: "min",
                                        valueDim: "lowest",
                                        symbol: "circle",
                                        symbolSize: 10,
                                        label: {
                                            show: false,
                                        },
                                        emphasis: {
                                            label: {
                                                show: false,
                                            },
                                        },
                                    },
                                    {
                                        type: "max",
                                        valueDim: "highest",
                                        symbol: "circle",
                                        symbolSize: 10,
                                        label: {
                                            show: false,
                                        },
                                        emphasis: {
                                            label: {
                                                show: false,
                                            },
                                        },
                                    },
                                ],
                                {
                                    name: "min line on close",
                                    type: "min",
                                    valueDim: "close",
                                },
                                {
                                    name: "max line on close",
                                    type: "max",
                                    valueDim: "close",
                                },
                            ],
                        },
                    },
                    {
                        name: "MA5",
                        type: "line",
                        data: this.calculateMA(5),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5,
                        },
                    },
                    {
                        name: "MA10",
                        type: "line",
                        data: this.calculateMA(10),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5,
                        },
                    },
                    {
                        name: "MA20",
                        type: "line",
                        data: this.calculateMA(20),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5,
                        },
                    },
                    {
                        name: "MA30",
                        type: "line",
                        data: this.calculateMA(30),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5,
                        },
                    },
                ],
            };
            if (option && typeof option === "object") {
                data_shower.setOption(option);
            }

            window.addEventListener("resize", data_shower.resize);
            this.data_shower = data_shower;
        },
        splitData(rawData) {
            const categoryData = [];
            const values = [];
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].splice(0, 1)[0]);
                values.push(rawData[i]);
            }
            return {
                categoryData: categoryData,
                values: values,
            };
        },
        calculateMA(dayCount) {
            var result = [];
            for (var i = 0, len = this.data_use.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push("-");
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += +this.data_use.values[i - j][1];
                }
                result.push(sum / dayCount);
            }
            return result;
        },
        search(text) {
            console.log(text);
            Connector.send(
                [text, "365"],
                "getStockAnswer",
                this.searchCallback,
                this.searchWaiting,
                this.searchTimeout,
                5000
            );
        },
        collectClick() {},
        searchCallback(msg) {
            if(msg.success){
                let temp = msg.content.list;
                let id = msg.content.stockId;
                let name = msg.content.stockName;
                this.showSMInfoByData(temp, name);
            }
        },
        searchWaiting(is_waiting) {},
        searchTimeout() {},
    },
};
</script>

<style scoped>
.stock_market_container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: white;
}
.head_container {
    position: relative;
    border: 1px solid red;
    width: 100%;
    height: 50px;
}
.data_shower {
    width: 100%;
    height: calc(100% - 50px);
}
.collect,
.name,
.search {
    height: 100%;
    position: relative;
    float: left;
    /* border: 1px solid red; */
    box-shadow: inset 0px 0px 5px black;
}
.collect,
.search {
    width: 300px;
}
.name {
    width: calc(100% - 600px);
}
.collect {
    display: flex;
    justify-content: center;
    align-items: center;
}
.collect_button {
    position: absolute;
    border-radius: 7px;
    left: 5%;
    width: 70px;
    height: 28px;
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
    border: 1px solid #8222968f;
    cursor: pointer;
}
.collect_button:hover {
    box-shadow: 0px 0px 5px #8222968f;
}
.is_collect {
    background-color: #864094;
    color: white;
}
.collect_msg {
    position: absolute;
    right: 5%;
    width: 70px;
    height: 28px;
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
}
.name_ele {
    position: relative;
    width: calc(50% - 10px);
    height: 100%;
    float: left;
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.name_ele_l {
    padding-right: 10px;
    text-align: right;
}
.name_ele_r {
    padding-left: 10px;
    text-align: left;
}
</style>
