/**
 * 根据文本内容渲染界面
 */
import elementSelector from "./componentsInit.js";
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
saxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasxsaxsaxasasx
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

`; // 标准写法

class Renderer {
    default_catalogue = null;
    refs_catalogue = {};
    elements = [];
    constructor(refs_ele, text) {
        this.refs_ele = refs_ele;
        this.text = text;
        // console.log(t.split("\n\n"));
        this.decoder = new Decoder(t);
        this.decode_res = this.decoder.decode();
        this.render();
    }
    render() {
        this.decode_res.forEach((element, index) => {
            let ele = elementSelector(element, this.refs_ele);
            this.elements.push(ele);
        });
    }
    catalogueEleClick(scroll_top, client_height, index) {
        // 点击目录
        console.log(scroll_top);
        console.log(client_height);
        console.log(index);
        let real_top = scroll_top - 8;
        let real_height = client_height + 16;
    }
    catalogueInit(refs_catalogue) {
        this.refs_catalogue = refs_catalogue;
        this.default_catalogue = new DefaultCatalogue(this.refs_catalogue, this.decode_res, this.refs_ele);
        
    }
    setBodyScroll(scroll_top){
        this.default_catalogue.setBodyScroll(scroll_top);
    }
}

export default Renderer;
