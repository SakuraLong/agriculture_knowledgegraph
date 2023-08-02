import * as echarts from "echarts";
/**
 * 根据文本内容渲染界面
 */
import ElementSelector from "./componentsInit.js";
import DefaultCatalogue from "./components/catalogues/defaultCatalogue.js";
import Decoder from "./decoders/decoder.js";

const t = `
- 界面配置
ENTITY 必须要有ENTITY或者是RELATION
= 
- 实体对外展示内容
NAME=这玩意真难做
IMG=null
CONTENT=好难啊啊好难，怎么这么难，vue加原生也好难。
TITLE=vue加原生js，难上加难！！|——一位不愿意透露姓名的编程人员
- 实体界面信息

{{引用|这是一个引用{{文本|这是一个测试文本|curtain=看啥呢？|color=red}}，我觉得他不错{{文本|原生js真香|blur=划重点}}|开发测试人员{{文本|这是一个测试文本|curtain=看啥呢？|color=red}}|c_weight=900|c_size=30|f_size=18|f_color=rgb(0, 0, 255, 0.5)|}}

= 太难了 =

== 二级标题 ==

第一段ashiashaishsasasaxsaxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasx
saxsaxasasxsaxsax<code language='javascript'>let a = 'asasxsaxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxas';</code>asx
asxasxasx
asxasxasx{{文本|还行还挺{{文本|还行还挺有意思的|color=gold|weight=900|und=red}}有意思的|color=gold|weight=900|und=red}}

=== 三级标题 ===

&nbsp&nbsp&nbsp&nbsp这里是默认的{{文本|这是一个测试文本|curtain=看啥呢？|color=red}}这里是默认的{{文本|vue好难啊啊|del}}，
{{文本|虽然说vue也不错|und}}{{文本|原生js真香|blur=划重点}}第一段ashiashaishsasa水水水水
asasxsaxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasx
saxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasx
asxasxasx
asxasxasx{{文本|还行还挺有意思的|color=gold|weight=900|und=red}}

=== 三级标题 ===

{{文本|还行还挺有意思的|color=gold|weight=900|und=red}}

{{文本|还行还挺有意思的|color=gold|weight=900|und=red}}

{{文本|还行还挺有意思的|color=gold|weight=900|und=red}}

{{文本|还行还挺有意思的|color=gold|weight=900|und=red}}

{{文本|还行还挺有意思的|color=gold|weight=900|und=red}}

======== asd ========

`; // 标准写法
const t_map = `
- 界面配置
- 关系
[[a]]
[[a]]--[[b]]=朋友={{连接关系|aa不知道和b有啥关系，但是就是有关系}}=AI
[[a]]--[[c]]=朋友={{连接关系|aa不知道和c有啥关系，但是就是有关系}}=AI
[[a]]--[[d]]=朋友={{连接关系|aa不知道和d有啥关系，但是就是有关系}}=AI
[[a]]--[[e]]=朋友={{连接关系|aa不知道和e有啥关系，但是就是有关系}}=AI
[[a]]--[[f]]=朋友={{连接关系|aa不知道和f有啥关系，但是就是有关系}}=AI
[[a]]--[[g]]=师生={{连接关系|aa不知道和g有啥关系，但是就是有关系}}
[[a]]--[[h]]=父子={{连接关系|aa不知道和h有啥关系，但是就是有关系}}=AI
[[a]]--[[i]]=恋人={{连接关系|aa不知道和i有啥关系，但是就是有关系}}=AI
[[a]]--[[j]]=战友={{连接关系|aa不知道和h有啥关系，但是就是有关系}}=AI
[[a]]--[[k]]=合作关系={{连接关系|aa不知道和i有啥关系，但是就是有关系}}=AI
[[b]]--[[c]]=朋友={{连接关系|aa不知道和c有啥关系，但是就是有关系}}=AI
[[b]]--[[d]]=朋友={{连接关系|aa不知道和d有啥关系，但是就是有关系}}=AI
[[b]]--[[g]]=父子={{连接关系|aa不知道和h有啥关系，但是就是有关系}}=AI
[[b]]--[[j]]=战友={{连接关系|aa不知道和h有啥关系，但是就是有关系}}=AI
`;
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
                    return (
                        params.data.data
                    );
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
        text = type === "ency" ? t : t_map;
        this.type = type.toLowerCase();
        this.refs_ele = refs_ele;
        this.text = formatting(text);
        // console.log(t.split("\n\n"));
        this.decoder = new Decoder(this.text, this.type);
        this.decode_res = this.decoder.decode(); // 渲染配置
    }
    render() {
        if(this.type==="ency"){
            this.decode_res.forEach((element, index) => {
                let ele = new ElementSelector(element, this.refs_ele).select();
                this.elements.push(ele);
            });
        }else if(this.type === "map"){
            this.map = echarts.init(this.refs_ele, null, {
                renderer: "canvas",
                useDirtyRect: false,
            });
            this.map.showLoading();
            let option = map(this.decode_res.res, this.decode_res.name + "的关系图");
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
    return res;
};
export default Renderer;
