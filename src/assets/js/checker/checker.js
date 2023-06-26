"use strict";
import { API_CHECKER } from "../connector/api.js";
/**
 * 字符串检查器
 * @param {String} str 待检查的字符串
 * @param {Array} check_methods 字符串的检查方法
 */
class Checker {
    constructor(str, check_methods) {
        this.str = str;
        this.check_methods = check_methods;
    }
    noSpacing() {}
    noNumber() {}
}

export default Checker;
/**
 * check_methods 可以包含
 * ignore 不检查 出现这个直接返回true
 * no-zh-Hans 没用中文汉字 存在中文汉字返回false
 * no-base-symbol 不包含基础符号
 */
