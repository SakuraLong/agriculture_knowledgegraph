// 导入自定义标签
import DefaultTitle from "./components/titles/defaultTitle.js";
import DefaultParagraph from "./components/paragraphs/defaultParagraph.js";

// 将自定义类和自定义标签关联起来
// 创建一个继承自HTMLElement的新类
class CustomButton extends HTMLElement {
    constructor() {
        super();

        // 获取color属性的值
        const color = this.getAttribute("color");

        // 创建一个按钮元素
        let button = document.createElement("button");

        // 设置按钮的文本内容

        // 设置按钮的颜色
        button.style.backgroundColor = color;

        this.button = button;

        // 将按钮添加到自定义标签中
        // this.appendChild(button);
    }
    connectedCallback(){
        // 组件添加到页面后触发
        this.button.textContent = this.textContent;
        this.innerHTML = "";
        this.appendChild(this.button);
    }
}

// 将自定义类和自定义标签关联起来
window.customElements.define("custom-button", CustomButton);

class ElementSelector{
    constructor(ele_obj, refs_ele){
        this.ele_obj = ele_obj;
        this.refs_ele = refs_ele;
    }
    select(){
        if(this.ele_obj.res.type[0] === "h"){
            return new DefaultTitle(this.refs_ele, this.ele_obj.res.type, this.ele_obj.res.para[0], this.ele_obj.index);
        }else if(this.ele_obj.res.type === "p"){
            return new DefaultParagraph(this.refs_ele, this.ele_obj.res.para[0], this.ele_obj.index);
        }
    }
}
const elementSelector = (ele_obj, refs_ele) => {
    return new ElementSelector(ele_obj, refs_ele).select();
};
export default elementSelector;