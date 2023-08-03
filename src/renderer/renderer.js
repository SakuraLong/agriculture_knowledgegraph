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

= 纯测试页面 =

{{引用|这是一个暑期实训的小网站，我觉得他不错{{文本|啊对对对|blur=遮住的时候你应该也猜得到吧doge}}|开发测试人员Sakura|c_weight=900|c_size=30|f_size=18|f_color=rgb(0, 0, 255, 0.5)|}}

== 看看换行 ==

首先'\\n'无法换行的哈，用'\\n'会显示如下效果：'换\\n行'：换\n行。换行请用'<<span>br</span>>'，例如：'换换换<<span>br</span>>行行行'
：换换换<br>行行行。

== 看看段落 ==

段落是通过两个'\\n\\n'分割的，对就这样

== 看看模板“文本” ==

文本模板的全部参数：{ {文本|这是一个测试文本|color|size|weight|und|del|curtain|blur|title} }，（使用时去掉两个{和}之间的空格，因为我暂时还写不出来复
杂的正则表达式匹配😭😭{{文本|正则表达式太难了|curtain=求大佬教教}}）<br>
{{文本|
color代表文字颜色，须带上=后跟颜色<br>size代表文字粗细，须带上=后跟文字大小（不需要加px）
<br>weight代表文字粗细，须带上=后跟文字粗细'100、200……'<br>und代表是否有下划线，默认是黑色，可带上=后跟颜色<br>del代表下划线，默认是黑色，可带上=后跟颜色
<br>curtain代表黑幕遮罩，默认title显示：你知道的太多了，可带上=后跟title内容<br>blur代表高斯模糊，默认title不显示，可带上=后跟title内容
<br>title可单独设置title，须带上=后跟title内容
<br>{{文本|属性后面设置的会覆盖前面设置的|weight=700|size=20}}
|size=20|weight=500}}<br>
<span style="background-color:#822296;color:#FFF;font-size:25px;padding:10px;line-height: 100px;">当然你也可以直接用<<span>span</span>>标签，直接设置style</span><br>

模板支持嵌套，例如{{文本|早上好！{{文本|说不定现在是下午{{文本|好的再补一个晚上好！|curtain=这样应该没问题了}}|del=yellow|title=那晚上咋办？}}|und=blue}}

虽然但是嵌套不好的话{{文本|就会有点乱|title=被发现了}}

如果希望输入空格，同html一样输入<span>&</span>nbsp

== 看看标题 ==

标题通过'='来区分，两侧都是一个'='代表h1标题，以此类推，例如'=== 代表三级标题 ==='

=== 代表三级标题 ===

如果你输入了：'== 这是哪一级标题呢？ ==='，则会显示

== 这是哪一级标题呢？ ===

是的，理论上是{{文本|不会显示的。|weight=700}}

如果输入：'======= 这是七级标题<h7>? ======='，则会显示

======= 这是七级标题<h7>? =======

是的，他会显示为{{文本|6级标题|weight=700}}

目录会根据标题自动创建

在创建标题时{{文本|不建议跨级设置标题|weight=700}}，这可能会导致右侧目录错乱

==== 这是一个四级标题 ====

创建标题的时候也可以加入文本模板

==== 真不错{{文本|怎么还自卖自夸呢？|del}}{{文本|黑幕也是可以的|curtain=但是会不会影响阅读呢？}} ====

== 看看模板（引用） ==

文本模板的全部参数：{ {引用|这是一个引用，我觉得他不错|开发测试人员|c_color|c_weight|c_size|f_color|f_weight|f_size|s_color|no_italics} }，（使用时去掉两个{和}之间的空格，因为我暂时还写不出来复杂的正则表达式匹配😭😭{{文本|正则表达式太难了|curtain=求大佬教教}}）<br>
{{文本|
c_color代表内容文本颜色<br>
c_weight代表内容文本粗细<br>
c_size代表内容文本大小<br>
f_color代表来源文本颜色<br>
f_weight代表来源文本粗细<br>
f_size代表来源文本大小<br>
s_color代表符号颜色<br>
no_italics代表引用不为斜体<br>
{{文本|属性后面设置的会覆盖前面设置的|weight=700|size=20}}
|size=20|weight=500}}<br>

{{引用|有一说一vue还是有点意思的，
{{文本|但是原生js有时候感觉比vue更自由（例如动态生成组件？）|curtain=当然也有可能是我学艺不精（大概率）}}
|开发测试人员Sakura|c_weight=900|c_size=30|f_size=18|f_color=rgb(0, 0, 255, 0.5)
|no_italics}}

== 看看实体标记 ==

实体通过两个[，加上两个]包围来显示，例如实体苹果可以表示为：[<span>[苹果]</span>]：[[苹果]]
`; // 标准写法
const t_map = `
- 界面配置
- 关系
[[Sakura]]
[[Sakura]]--[[Shmily]]=朋友=Sakura和Shmily是朋友
[[Sakura]]--[[水木]]=朋友=Sakura和水木是朋友
[[Sakura]]--[[锦满]]=朋友=Sakura和锦满是朋友
[[Sakura]]--[[myra_xiangyuff]]=朋友=Sakura和myra_xiangyuff是朋友
[[Sakura]]--[[dyh]]=朋友=Sakura和dyh是朋友
[[Sakura]]--[[KrieN]]=其他=朋友的朋友
[[Sakura]]--[[其他]]=其他=感谢所有付出的人
[[Shmily]]--[[抹茶]]=朋友=Shmily和抹茶是朋友
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
