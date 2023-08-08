import * as echarts from "echarts";
/**
 * 根据文本内容渲染界面
 */
import ElementSelector from "./componentsInit.js";
import DefaultCatalogue from "./components/catalogues/defaultCatalogue.js";
import Decoder from "./decoders/decoder.js";
import data from "@/assets/js/data.js";

const map = (graph, title) => {
    graph.nodes.forEach(function (node) {
        node.label = {
            show: true,
        };
    });
    let option = {
        title: {
            text: title,
            subtext: "Default layout",
            top: "bottom",
            left: "right",
        },
        tooltip: {
            formatter: function (x) {
                if (x.dataType === "node") {
                    return x.name;
                } else {
                    return x.data.data;
                }
            },
        },
        legend: [
            {
                // selectedMode: 'single',
                data: graph.categories.map(function (a) {
                    return a.name;
                }),
            },
        ],
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
            {
                name: "Les Miserables",
                type: "graph",
                layout: "force",
                draggable: true,
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: "right",
                },
                lineStyle: {
                    color: "source",
                },
                force: {
                    repulsion: 4000,
                },
                emphasis: {
                    focus: "adjacency",
                    lineStyle: {
                        width: 12,
                    },
                },
                color: [
                    "#5470c6",
                    "#91cc75",
                    "#fac858",
                    "#ee6666",
                    "#73c0de",
                    "#3ba272",
                    "#fc8452",
                    "#9a60b4",
                    "#ea7ccc",
                ],
            },
        ],
    };
    return option;
};
/**
 * render的渲染逻辑顺序！！
 * 1. 字符串格式
 * 2. 字符串分割大体部分 decoder
 * 3. 大体部分划分标题、段落 bodyDecoder
 * 4. 检查模板
 * 5. 返回渲染配置
 * 6. renderer进行渲染
 */
class Renderer {
    default_catalogue = null;
    refs_catalogue = {};
    elements = [];
    map = null;
    down_ele_title = null;
    map_config = {
        light: true,
        force: true,
    };
    constructor(refs_ele, text, type) {
        this.type = type.toLowerCase();
        this.refs_ele = refs_ele;
        this.text = formatting(text);
        // console.log(t.split("\n\n"));
        this.decoder = new Decoder(this.text, this.type);
        this.decode_res = this.decoder.decode(); // 渲染配置
    }
    setOption(option) {
        this.map_config.light = option.theme === "dark" ? false : true;
        this.map_config.force = option.layout === "graph" ? false : true;
    }
    dispose(){
        if (this.map != null && this.map !== "" && this.map !== undefined) {
            this.map.dispose(); //销毁
        }
    }
    render() {
        if (this.type === "ency") {
            this.decode_res.forEach((element, index) => {
                let ele = new ElementSelector(element, this.refs_ele).select();
                this.elements.push(ele);
            });
        } else if (this.type === "map") {
            console.log(this.map);
            if (this.map != null && this.map !== "" && this.map !== undefined) {
                this.map.dispose(); //销毁
            }
            this.map = echarts.init(this.refs_ele, null, {
                renderer: "canvas",
                useDirtyRect: false,
            });
            this.map.on("click", function (param) {
                if (param.dataType === "node") {
                    console.log("点击了节点", param);
                } else {
                    console.log("点击了边", param);
                }
            });
            this.map.showLoading();
            let option = {};
            if (this.map_config.force && this.map_config.light) {
                option = data.mapForceLight(
                    this.decode_res.res,
                    this.decode_res.name + "的关系图"
                );
            } else if (this.map_config.force && !this.map_config.light) {
                option = data.mapForceDark(
                    this.decode_res.res,
                    this.decode_res.name + "的关系图"
                );
            }
            // console.log(this.decode_res.res);
            if (option && typeof option === "object") {
                this.map.setOption(option);
            }
            this.map.hideLoading();
            window.addEventListener("resize", this.map.resize);
        }
    }
    catalogueEleClick(scroll_top, client_height, index) {
        // 点击目录
        // console.log(scroll_top);
        // console.log(client_height);
        // console.log(index);
        let real_top = scroll_top - 8;
        let real_height = client_height + 16;
    }
    catalogueInit(refs_catalogue) {
        this.refs_catalogue = refs_catalogue;
        this.default_catalogue = new DefaultCatalogue(
            this.refs_catalogue,
            this.decode_res,
            this.refs_ele
        );
    }
    setBodyScroll(scroll_top) {
        this.default_catalogue.setBodyScroll(scroll_top);
    }
}
/**
 * 格式化文本
 * 根据\n分割文本
 * 检查格式化
 * 再拼合文本
 * @param {string} text 文本
 * @returns 格式化后的文本
 */
const formatting = (text) => {
    let temp = text;
    let arr = temp.split("\n");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") continue;
        arr[i] = arr[i].trim();
        if (arr[i][0] === "=") {
            // 是标题 则前一个和后一个都应该是空 插入先插入后面的
            // ["", "标题", ""]
            // ["标题"]
            // ["", "标题"]
            // ["标题", ""]
            if (arr[i + 1] !== "") {
                arr.splice(i + 1, 0, "");
            }
            if (arr[i - 1] !== "") {
                arr.splice(i, 0, "");
            }
        }
    }
    // 合并
    let res = "";
    arr.forEach((element) => {
        res += element + "\n";
    });
    res.trim();

    // let a = [];
    // for(let i=0;i<157;i++){
    //     let t = {
    //         index: i + 1,
    //         name: "测试输出" + (i + 1).toString(),
    //         abstract: "这是测试" + (i + 1).toString() + "的简介",
    //         image:"",
    //         id:i
    //     };
    //     a.push(t);
    // }
    // console.log(a);
    return res;
};
export default Renderer;
