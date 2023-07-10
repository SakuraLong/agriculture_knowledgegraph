// 此文件为测试用接口传入数据 之后会删除
const TEST_REGISTER_CALLBACK_SUCCESS = {
    "success":true,
}; // 注册 成功
const TEST_REGISTER_CALLBACK_FAIL = {
    "success":false,
};// 注册 失败
const TEST_VERIFY_CALLBACK_SUCCESS = {
    "success":true,
}; // 验证 成功
const TEST_VERIFY_CALLBACK_FAIL = {
    "success":true,
}; // 验证 失败
const TEST_LOGIN_CALLBACK_SUCCESS = {
    "success":true,
    "token":"",
    "name":"",
    "avatar":"",
    "born":"",
    "sex":"",
    "occu":"",
    "id":"",
    "password":"",
    "email":"",
    "real":false
}; // 登录 成功 未实名认证
const TEST_LOGIN_CALLBACK_SUCCESS_REALNAME = {
    "success":true,
    "token":"",
    "name":"",
    "avatar":"",
    "born":"",
    "sex":"",
    "occu":"",
    "id":"",
    "password":"",
    "email":"",
    "real":true,
    "real_name":"",
    "tel":"",
    "card_type":"",
    "id_card":""
}; // 登录 成功 已实名认证
const TEST_LOGIN_CALLBACK_FAIL = {
    "success":false
}; // 登录 失败