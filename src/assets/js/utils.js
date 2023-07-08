import StorageConfig from "./storage/config.js";
import Storage from "./storage/storage.js";
import Code from "./code/code.js";
import CodeConfig from "./code/config.js";
import Connector from "./connector/connector.js";
import store from "@/store/index.js";
/**
 * 对用户信息进行初始化
 */
const userMsgInit = () => {
    saveUserMsg(StorageConfig.USER_MSG);
};
/**
 *
 * @param {Object} user_msg 用户信息完整性检查
 * @returns
 */
const checkIntegrality = (user_msg) => {
    return (
        user_msg.name !== undefined &&
        user_msg.avatar !== undefined &&
        user_msg.born !== undefined &&
        user_msg.sex !== undefined &&
        user_msg.occu !== undefined &&
        user_msg.id !== undefined &&
        user_msg.password !== undefined &&
        user_msg.email !== undefined &&
        user_msg.name !== null &&
        user_msg.avatar !== null &&
        user_msg.born !== null &&
        user_msg.sex !== null &&
        user_msg.occu !== null &&
        user_msg.id !== null &&
        user_msg.password !== null &&
        user_msg.email !== null &&
        user_msg.name !== "" &&
        user_msg.avatar !== "" &&
        user_msg.born !== "" &&
        user_msg.sex !== "" &&
        user_msg.occu !== "" &&
        user_msg.id !== "" &&
        user_msg.password !== "" &&
        user_msg.email !== ""
    );
};

/**
 * 检查用户是否登录
 * @returns 用户的登录信息
 */
const checkLogin = () => {
    let res = {
        id: "",
        password: "",
        is_login: false,
    };
    let user_msg = "";
    try {
        user_msg = JSON.parse(
            Code.CryptoJS.decrypt(
                Storage.get(0, "USER_MSG", Code.CryptoJS.encrypt("{}"))
            )
        );
    } catch {
        user_msg = "";
    }
    res.is_login =
        Code.CryptoJS.decrypt(
            Storage.get(0, "IS_LOGIN", Code.CryptoJS.encrypt("false"))
        ) === "true"
            ? true
            : false;
    if (!checkIntegrality(user_msg)) {
        Storage.set(0, "IS_LOGIN", Code.CryptoJS.encrypt("false"));
        store.state.is_login = false;
        userMsgInit(); // 用户信息初始化
    } else {
        res.id = user_msg.id;
        res.password - user_msg.password;
        res.is_login = true;
    }
    return res;
};

/**
 *
 * @param {Object} user_msg 用户信息
 * @param {Function} login_callback_func 登录回调函数
 * @param {Function} login_timeout_func 登录超时函数
 */
const autoLogin = (user_msg, login_callback_func, login_timeout_func) => {
    // 此状态的密码是经过md5和aes加密之后的
    let is_login = false;
    if (user_msg.is_login) {
        // 执行自动登录
        // 对密码解密
        // 对id解密
        let password = Code.CryptoJS.decrypt(user_msg.password);
        let id = Code.CryptoJS.decrypt(user_msg.id);
        // 发送的密码是md5加密的
        Connector.test(
            login_callback_func,
            null,
            login_timeout_func,
            1000,
            true,
            1000,
            { success: true }
        );
    }
};
const setLogOut = () => {
    Storage.set(0, "IS_LOGIN", Code.CryptoJS.encrypt("false"));
    store.state.is_login = false;
};
/**
 * 判断两个对象值是否相等 这里面的键值对中，值只能是int string bool
 * @param {Object} obj1 对象1
 * @param {Object} obj2 对象2
 * @returns 是否相等
 */
const objectEqual = (obj1, obj2) => {
    let is_equal = true;
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    } else {
        keys1.forEach((element) => {
            if (obj1[element] !== obj2[element] || !is_equal) {
                is_equal = false;
                return;
            }
        });
        return is_equal;
    }
};
/**
 * 获取用户信息
 * @returns 用户信息，全部解密
 */
const getUserMsg = () => {
    let user_msg = "";
    try {
        user_msg = JSON.parse(
            Code.CryptoJS.decrypt(
                Storage.get(0, "USER_MSG", Code.CryptoJS.encrypt("{}"))
            )
        );
    } catch {
        user_msg = "";
    }
    if (user_msg==="") {
        Storage.set(0, "IS_LOGIN", Code.CryptoJS.encrypt("false"));
        store.state.is_login = false;
        userMsgInit(); // 用户信息初始化
        return StorageConfig.USER_MSG;
    } else {
        CodeConfig.USER_MSG_CODE.encrypt.forEach((element) => {
            user_msg[element] = Code.CryptoJS.decrypt(
                user_msg[element],
                Code.CryptoJS.decrypt(CodeConfig.USER_MSG_CODE.key)
            );
        });
        console.log("拿到", user_msg);
        return user_msg;
    }
};
/**
 * 存储用户信息
 * @param {Object} user_msg 用户信息，完全没有加密
 */
const saveUserMsg = (user_msg) => {
    // 检查完整性
    console.log("保存", user_msg);
    CodeConfig.USER_MSG_CODE.encrypt.forEach((element) => {
        user_msg[element] = Code.CryptoJS.encrypt(
            user_msg[element],
            Code.CryptoJS.decrypt(CodeConfig.USER_MSG_CODE.key)
        );
    });
    user_msg = Code.CryptoJS.encrypt(JSON.stringify(user_msg).toString());
    Storage.set(0, "USER_MSG", user_msg);
};
export default {
    checkLogin, // 检查登录情况，返回用户信息
    autoLogin, // 执行自动登录
    setLogOut,
    objectEqual,
    getUserMsg,
    saveUserMsg,
};
