const API = {
    host: "http://127.0.0.1",
    port: ":8000/",
    api: {
        "register": "sendEmailVerification/",
        "login": "login/",
        "deleteAccount": "sendEmailVerification/",
        "forgetPassword": "sendEmailVerification/",
        "changePassword": "updateUserPassword/",
        "changeEmail":"sendEmailVerification/",
        "updateAvatar": "avatarSubmission/",
        "updateUserMsg": "updateAccountInformation/",
        "getUserMsg": "getUserMessage/",
        "verify":"verifyEmailCode/",
        "searchNode":"searchNode/",
        "recognizeNode":"recognizeNode/"
    },
}; 
const API_PARA = {
    "register": [
        ["email", ""],
        ["type", ""],
        ["msg", ""],
    ],
    "login": [
        ["login", ""],
        ["is_id", false],
        ["password", ""],
    ],
    "forgetPassword":[
        ["email", ""],
        ["type", ""],
        ["msg", ""],
    ],
    "verify":[
        ["email", ""],
        ["vcode", ""]
    ],
    "updateAvatar":[
        ["id", ""],
        ["token", ""],
        ["avatar", ""]
    ],
    "updateUserMsg":[
        ["id",""],
        ["login_name",""],
        ["token",""],
        ["sex",""],
        ["occupation",""],
        ["born_time",""]
    ],
    "searchNode":[
        ["search_name", ""]
    ],
    "recognizeNode":[
        ["content", ""]
    ]
};
const API_CHECKER = {
    "register": [
        ["ignore"],
        ["ignore"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
    ],
    "login": [
        ["ignore"],
        ["ignore"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
    ],
    "forgetPassword": [
        ["ignore"],
        ["ignore"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
    ],
    "verify":[
        ["ignore"],
        ["ignore"]
    ],
    "updateAvatar":[
        ["num-only", "@length-min=9", "@length-max=9"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"]
    ],
    "updateUserMsg":[
        ["num-only", "@length-min=9", "@length-max=9"],
        ["no-base-symbols","sql-check","no-spacing","no-null","@length-max=100","@length-min=1"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
        ["ignore"],
        ["ignore"],
        ["ignore"],
    ],
    "searchNode":[
        ["no-base-symbols","sql-check","no-only-spacing","no-null","@length-max=100","@length-min=1"]
    ],
    "recognizeNode":[
        ["no-base-symbols","sql-check","no-only-spacing","no-null","@length-max=200","@length-min=1"]
    ]
};
export default{
    API,
    API_PARA,
    API_CHECKER
};