"use strict";
import { API_CHECKER } from "../connector/api.js";
/**
 * 字符串检查器
 * @param {String} str 待检查的字符串
 * @param {Array} check_methods 字符串的检查方法
 */
const ZH_HANS = 0; // 汉字编号
const EN = 1; // 英文编号
class Checker {
    success = true;
    checker_eval = {
        ignore: "ignore()",
        "no-zh-Hans": "noneLang(ZH_HANS)",
        "no-en": "noneLang(EN)",
        "no-base-symbol": "noneBaseSymbol()",
        "sql-check":"sqlCheck()",
        "no-spacing":"noSpacing()",
        "no-number":"noNumber()"
    };
    checker_data = {
        base_symbol: ["<", ">", "{", "}", "[", "]", "~", "`", "^", "(", ")"],
    };
    constructor(str, check_methods) {
        this.str = str;
        this.check_methods = check_methods;
    }
    /**
     * 进行字符串检查
     */
    check() {
        let checker = this;
        this.check_methods.forEach((element) => {
            if (!checker.success) return;
            checker.success = eval("checker." + checker.checker_eval[element]);
        });
        return this.success;
    }
    /**
     *
     * 跳过检查
     * @returns true
     */
    ignore() {
        return true;
    }
    /**
     * 检查是否不存在某种语言
     * @param {int} lang 不存在的语言的编号
     * @returns 是否不存在某种语言
     */
    noneLang(lang) {
        if (lang === 0) return !/.*[\u4e00-\u9fa5]+.*$/.test(this.str);
        else if (lang === 1) return !/.*[A-Za-z]+.*$/.test(this.str);
    }
    /**
     * 检查是否不存在基础字符
     * @returns 是否不存在基础字符
     */
    noneBaseSymbol() {
        let checker = this;
        let success = true;
        this.checker_data.base_symbol.forEach((element) => {
            if (!success) return;
            if (checker.str.indexOf(element) !== -1) success = false;
        });
    }
    /**
     * 检查是否不存在sql注入
     * @returns 是否不存在sql注入
     */
    sqlCheck() {
        // let checker = this;
        let success = true;
        let sql_key_words =
            "select ,union ,asc ,desc ,in ,like ,into ,exec ,from ";
        sql_key_words +=
            ",update ,insert ,delete ,count ,asc( ,char( ,chr( ,drop ,table ,truncat ";
        sql_key_words += ",mid( ,abs( ,= ,-- ,<script ,/script ";
        sql_key_words +=
            ",where ,join ,create ,alter ,cast ,exists ,; , or , and ,order by ,group by ";
        //分割成数组
        let sqls = sql_key_words.split(",");
        let t_str = this.str.toLowerCase();
        sqls.forEach((element) => {
            if (!success) return;
            if (t_str.indexOf(element) !== -1) success = false;
        });
        return success;
    }
    /**
     * 检查字符串是否不存在空格
     * @returns false:存在空格
     */
    noSpacing() {
        if(this.str.indexOf(" ")!==-1) return false;
        else return true;
    }
    /**
     * 检查字符串是否不存在数字
     * @returns false:存在数字
     */
    noNumber() {
        return !/\d/.test(this.str);
    
    }
    /**
     * 检查字符串是不是email
     * @returns false:不是email的合法地址
     */
    isEmail(){
        if((this.str == null) || (this.str.length < 2)) return false ;
        // 需出现'@',且不在首字符.
        var aPos = this.str.indexOf("@" ,1) ;
        if(aPos < 0)
        {
            return false ;
        }
        // '@'后出现'.',且不紧跟其后.
        if(this.str.indexOf("." ,aPos+2) < 0)
        {
            return false ;
        }
        return true ;
    }
}

export default Checker;
/**
 * check_methods 可以包含
 * ignore 不检查 出现这个直接返回true
 * no-zh-Hans 没用中文汉字 存在中文汉字返回false
 * no-en 没有英文 存在英文返回false
 * no-base-symbol 不包含基础符号 存在 < > { } [ ] ~ ` ^ ( ) 返回false
 * sql-check 检查sql注入 有sql注入危险返回false
 * no-spacing 没有空格 存在空格返回false
 * no-number 没有数字 存在数字返回false
 * is-email 是合法的邮箱地址 不是合法的邮箱地址返回false
 */
