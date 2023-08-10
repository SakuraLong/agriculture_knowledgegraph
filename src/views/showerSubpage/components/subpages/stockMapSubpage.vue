<template>
    <div style="width: 100%; height: 100%; background-color: white">
        <div class="data_shower" ref="data_shower"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    data() {
        return {
            data_shower: null,
            data: null,
            data_use: null,
            is_null: true,
        };
    },
    methods: {
        render(type, data, title) {
            console.log("渲染", type, data, title);
            if (type === "K") {
                // K线图
                this.showSMInfoByData(data, title);
            } else if (type === "F") {
                // 分时图
            }
        },
        showFByData(data, title) {
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
            if (title === "") {
                // 数据不存在
                console.log("空数组");
                this.is_null = true;
                return;
            } else {
                this.is_null = false;
            }
            this.data_use = splitData(this.data);
            let dom = this.$refs.data_shower;
            let data_shower = echarts.init(dom, null, {
                renderer: "canvas",
                useDirtyRect: false,
            });
            let option = {
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.data_use.time,
                },
                yAxis: {
                    type: "value",
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: "none",
                        },
                        restore: {},
                        saveAsImage: {},
                    },
                },
                tooltip: {
                    trigger: "axis",
                    position: function (pt) {
                        return [pt[0], "10%"];
                    },
                },
                series: [
                    {
                        data: this.data_use.n,
                        name: "现价",
                        type: "line",
                        areaStyle: {},
                    },
                    {
                        data: this.data_use.p,
                        name: "均价线",
                        type: "line",
                    },
                ],
            };
            if (option && typeof option === "object") {
                data_shower.setOption(option);
            }
            function splitData(data){
                let time = [];
                let n = [];
                let p = [];
                data.forEach((element)=>{
                    time.push(element[0]);
                    n.push(element[1]);
                    p.push(element[2]);
                });
                return {
                    time:time,
                    n:n,
                    p:p
                };
            }

            window.addEventListener("resize", data_shower.resize);
            this.data_shower = data_shower;
        },
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
            if (title === "") {
                // 数据不存在
                console.log("空数组");
                this.is_null = true;
                return;
            } else {
                this.is_null = false;
            }
            this.data_use = this.splitData(this.data);
            let dom = this.$refs.data_shower;
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
    },
};
</script>

<style scoped>
.data_shower {
    position: relative;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
}
</style>
