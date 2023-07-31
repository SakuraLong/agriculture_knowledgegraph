/**
 * 行内函数
 */
const config = [
    {
        name: "文本",
        paras: ["type", "content", "color", "weight", "und", "del", "curtain", "blur"],
        annotation: [
            "类型",
            "内容",
            "文本颜色",
            "文本粗细",
            "文本下划线，后面加=代表下划线颜色，默认是黑色",
            "文本删除线，设置同下划线",
            "设置遮罩，第一个参数代表鼠标提示词，默认值是：你知道的太多了",
            "设置模糊，第一个参数代表鼠标提示词，默认值是空（不显示）",
        ],
        example:
            "这里是默认的{{文本|这是一个测试文本|color=red|weight=800|und=rgb(0, 255, 0)|del|curtain=看啥看|blur}}这里是默认的",
    },
    {
        name: "引用",
        paras: ["type", "content", "from", "c_color", "c_weight", "c_size", "f_color", "f_weight", "f_size", "s_color", "no_italics"],
        annotation: [
            "类型",
            "内容",
            "来源",
            "内容文本颜色",
            "内容文本粗细",
            "内容文本大小",
            "来源文本颜色",
            "来源文本粗细",
            "来源文本大小",
            "符号文本颜色",
            "引用不为斜体"
        ],
        example:"{{引用|这是一个引用，我觉得他不错|开发测试人员|c_color=red|c_weight=900|p_color=rgb(0, 0, 255, 0.5)|s_color=black|no_italics}}"
    }
];


export default config;