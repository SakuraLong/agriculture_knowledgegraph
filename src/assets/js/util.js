import StorageConfig from "./storage/config.js";
import Storage from "./storage/storage.js";
import Code from "./code/code.js";
import CodeConfig from "./code/config.js";
/**
 * 对用户信息进行初始化
 */
const userMsgInit = () => {
    Storage.set(0, "USER_MSG", Code.CryptoJS.encrypt(JSON.stringify(StorageConfig.USER_MSG).toString()));
};
const checkIntegrality = (user_msg) => {
    return (
        user_msg.name !== undefined &&
        user_msg.avatar !== undefined &&
        user_msg.born !== undefined &&
        user_msg.sex !== undefined &&
        user_msg.occu !== undefined &&
        user_msg.name !== null &&
        user_msg.avatar !== null &&
        user_msg.born !== null &&
        user_msg.sex !== null &&
        user_msg.occu !== null &&
        user_msg.name !== "" &&
        user_msg.avatar !== "" &&
        user_msg.born !== "" &&
        user_msg.sex !== "" &&
        user_msg.occu !== ""
    );
};

export default{
    userMsgInit,
    checkIntegrality
};