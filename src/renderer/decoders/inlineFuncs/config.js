/**
 * 行内函数
 */
const config = [
    {
        name: "文本",
        paras: ["color", "weight", "und", "del", "curtain", "blur"],
        annotation: [
            "文本颜色",
            "文本粗细",
            "文本下划线，后面加=代表下划线颜色，默认是黑色",
            "文本删除线，设置同下划线",
            "设置遮罩，第一个参数代表鼠标提示词，默认值是：你知道的太多了",
            "设置模糊，第一个参数代表鼠标提示词，默认值是空（不显示）",
        ],
        example:
            "这里是默认的{{这是一个测试文本|文本|color=red|weight=800|und=rgb(0, 255, 0)|del|curtain=看啥看|blur}}这里是默认的",
    },
];


export default config;