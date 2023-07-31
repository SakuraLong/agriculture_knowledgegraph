class Element{
    constructor(parent_node, type, show){
        this.element = document.createElement(type);
        this.type = type;
        this.parent_node = parent_node;
        if(show){
            this.parent_node.appendChild(this.element);
        }
    }
    append(){
        this.parent_node.appendChild(this.element);
    }
    remove(){
        this.parent_node.removeChild(this.element);
    }
}

export default Element;