import Element from "../element.js";

class DefaultCatalogue extends Element{
    constructor(refs, catalogues_arr, body_refs){
        super(refs, "div", true);
        this.element.style.position = "relative";
        this.catalogues_arr = catalogues_arr; // 目录数组
        this.body_refs = body_refs; // 正文
        this.catalogueInit();
    }
    catalogueEleClick(scroll_top, client_height, index, data_index) {
        // 点击目录
        let real_top = scroll_top - 8;
        let real_height = client_height + 16;
        let h = document.getElementById(data_index);
        this.body_refs.scrollTo({top:h.offsetTop, behavior:"smooth"});
    }
    catalogueInit() {
        let menu = createMenu(this.catalogues_arr);
        function createMenu(data) {
            let menu = [];
            let stack = [];
            for (let i = 0, len = data.length; i < len; i++) {
                let entry = data[i];
                let level = getHeadingLevel(entry.res.type);
                if (level === -1) continue;
                let item = {
                    index: entry.index,
                    title: entry.res.para[0],
                    children: [],
                };
                while (stack.length >= level) {
                    stack.pop();
                }
                if (stack.length === 0) {
                    menu.push(item);
                } else {
                    stack[stack.length - 1].children.push(item);
                }
                stack.push(item);
            }
            return menu;
        }

        function getHeadingLevel(type) {
            switch (type) {
                case "h1":
                    return -1;
                case "h2":
                    return 1;
                case "h3":
                    return 2;
                case "h4":
                    return 3;
                case "h5":
                    return 4;
                case "h6":
                    return 5;
                default:
                    return -1;
            }
        }
        // 递归深搜
        var that = this;
        let res = document.createElement("div");
        menu.forEach((element, index) => {
            this.element.appendChild(deepBuild(element, [index + 1]));
        });
        function deepBuild(node, index_arr) {
            let pos = "";
            let temp_ia = [];
            index_arr.forEach((element, index) => {
                temp_ia[index] = element;
                if (index !== 0) {
                    pos += ".";
                }
                pos += element;
            });
            let li = document.createElement("li");
            let div = document.createElement("div");
            div.setAttribute("class", "li_div");
            div.title = node.title;
            div.addEventListener(
                "click",
                (function (that) {
                    return function () {
                        that.catalogueEleClick(div.offsetTop, div.clientHeight, pos, div.getAttribute("data-index"));
                    };
                })(that)
            );
            div.setAttribute("data-index", node.index.toString() + node.title);
            li.appendChild(div);
            let span_index = document.createElement("span");
            span_index.setAttribute("class", "li_span_index");
            span_index.innerHTML = pos;
            div.appendChild(span_index);
            let span_title = document.createElement("span");
            span_title.setAttribute("class", "li_span_title");
            span_title.innerHTML = node.title;
            div.appendChild(span_title);
            if (node.children.length === 0) {
                // 没有子节点 不需要ol
            } else {
                let ia = index_arr;
                let ol = document.createElement("ol");
                temp_ia.push(0);
                node.children.forEach((element, index) => {
                    temp_ia[temp_ia.length - 1] = index + 1;
                    let res = deepBuild(element, temp_ia);
                    ol.appendChild(res);
                });
                li.appendChild(ol);
            }
            return li;
        }
    }
}

export default DefaultCatalogue;