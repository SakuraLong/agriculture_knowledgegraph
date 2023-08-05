import * as echarts from "echarts";
/**
 * 根据文本内容渲染界面
 */
import ElementSelector from "./componentsInit.js";
import DefaultCatalogue from "./components/catalogues/defaultCatalogue.js";
import Decoder from "./decoders/decoder.js";

const map = (graph, title) => {
    graph.nodes.forEach(function (node) {
        node.label = {
            show: true,
        };
    });
    let option = {
        title: {
            text: title,
            // subtext: "Default layout",
            top: "bottom",
            left: "left",
        },
        tooltip: {
            formatter: function (params) {
                if (params.data.source) {
                    //注意判断，else是将节点的文字也初始化成想要的格式
                    return params.data.data;
                } else {
                    return params.name;
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
                layout: "none",
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: "right",
                    formatter: "{b}",
                },
                lineStyle: {
                    color: "source",
                    curveness: 0.3,
                },
                emphasis: {
                    focus: "adjacency",
                    lineStyle: {
                        width: 10,
                    },
                },
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
    constructor(refs_ele, text, type) {
        this.type = type.toLowerCase();
        this.refs_ele = refs_ele;
        this.text = formatting(text);
        // console.log(t.split("\n\n"));
        this.decoder = new Decoder(this.text, this.type);
        this.decode_res = this.decoder.decode(); // 渲染配置
    }
    render() {
        if (this.type === "ency") {
            this.decode_res.forEach((element, index) => {
                let ele = new ElementSelector(element, this.refs_ele).select();
                this.elements.push(ele);
            });
        } else if (this.type === "map") {
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
            let option = map(
                this.decode_res.res,
                this.decode_res.name + "的关系图"
            );
            this.map.hideLoading();
            this.map.setOption(option);
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
    function renderMarkdownTable(mdTable) {
        var rows = mdTable.trim().split("\n");
        var table = document.createElement("table");

        for (var i = 0; i < rows.length; i++) {
            var rowText = rows[i].trim();
            var row = document.createElement(i === 0 ? "thead" : "tbody");
            var cells = rowText.split("|").map(function (cell) {
                return cell.trim();
            });

            var rowContent = "";
            for (var j = 1; j < cells.length - 1; j++) {
                var tag = i === 0 ? "th" : "td";
                rowContent += "<" + tag + ">" + cells[j] + "</" + tag + ">";
            }

            row.innerHTML = rowContent;
            table.appendChild(row);
        }

        return table.outerHTML;
    }

    var markdownTable = `
    | Header 1 | Header 2 |
    | --- | --- |
    | Cell 1 | Cell 2 |
    | Cell 3 | Cell 4 |
    `;

    var htmlTable = renderMarkdownTable(markdownTable);
    // console.log(htmlTable);

    return res;
};
export default Renderer;
