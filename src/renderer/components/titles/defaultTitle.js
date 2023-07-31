import Element from "../element.js";

class DefaultTitle extends Element{
    constructor(refs, type, title, index){
        super(refs, type, true);
        this.title = title;
        this.element.setAttribute("class", "default_title");
        this.element.textContent = this.title;
        this.index =index;
        this.id = index.toString() + title;
        this.element.setAttribute("id", this.id);
    }
    init(){
        // this.type = this.getAttribute("type");
        // this.title = this.getAttribute("title");
        this.title_ele = document.createElement("h1");
        this.title_ele.innerHTML = this.title;

        const div = document.createElement("div");
        div.appendChild(this.title_ele);
    }
}

export default DefaultTitle;