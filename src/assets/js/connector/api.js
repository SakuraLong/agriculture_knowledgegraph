const API = {
    host: "http://127.0.0.1",
    port: ":8000/",
    api: {
        "register": "register",
        "login": "login",
        "delete": "deleteAccount",
        "search_friend": "getFriends",
        "add_friend": "addFriend",
        "delete_friend": "deleteFriend",
        "search_player_data": "getScores",
        "change_char": "switchChar",
        "send_score": "uploadScore",
    },
};
const API_PARA = {
    "register": [
        ["username", ""],
        ["userpassword", ""],
        ["seed", ""],
    ]
};
const API_CHECKER = {
    "register": [
        ["ignore"],
        ["no-zh-Hans"],
        ["no-base-symbol",],
    ]
};
export default{
    API,
    API_PARA,
    API_CHECKER
};