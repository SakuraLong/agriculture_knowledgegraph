const API = {
    host: "http://127.0.0.1",
    port: ":8000/",
    api: {
        "register": "sendEmailVerification",
        "login": "login",
        "deleteAccount": "sendEmailVerification",
        "forgetPassword": "sendEmailVerification",
        "changePassword": "updateUserPassword",
        "changeEmail":"sendEmailVerification",
        "updateAvatar": "avatarSubmission",
        "updateUserMsg": "updateAcountInformation",
        "getUserMsg": "getUserMessage",
        "verify":"verifyEmailVerification"
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
};
const API_CHECKER = {
    "register": [
        ["ignore"],
        ["is-num", "@length-max=1", "@length-min=1"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
    ],
    "login": [
        ["ignore"],
        ["ignore"],
        ["no-base-symbol", "sql-check", "no-zh-Hans", "no-spacing"],
    ]
};
export default{
    API,
    API_PARA,
    API_CHECKER
};