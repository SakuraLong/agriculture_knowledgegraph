import textFunc from "./text";

const selector = (text) => {
    // 定义一个函数来处理匹配到的字符串
    function replaceFunc(match, p) {
        if(p.split("|")[1] === "文本"){
            p = textFunc(p);
        }
        return p;
    }

    // 使用正则表达式和函数来替换字符串
    const result = text.replace(/{{(?!<\/code>)(.*?)(?=}})}}/g, replaceFunc);
    return result;
};

export default selector;
