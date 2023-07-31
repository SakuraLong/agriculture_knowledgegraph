import BodyDecoder from "./bodyDecoder";
/**
 * 文本数据解码器
 */
class Decoder{
    /*
    解码
    1. 先格式化代码
    2. 根据-分割出config、external、body
    */
    decode_res = [];
    constructor(text){
        this.text = text.toString();
        this.text = this.text.replace(/^\n+|\n+$/g, "");
        this.text_arr = this.text.split(/- .*\n/);
        this.config = this.text_arr[1];
        this.external = this.text_arr[2];
        this.body = this.text_arr[3];

        this.body_decoder = new BodyDecoder(this.body);
    }
    decode(){
        this.decode_res = this.body_decoder.decode();
        return this.decode_res;
    }
}

export default Decoder;