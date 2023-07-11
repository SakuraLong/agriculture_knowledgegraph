import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import enLocale from "./assets/i18n/en"; // 导入项目中用到的英文语言包
// import zhLocale from "./assets/i18n/zh-CN"; // 导入项目中用到的中文语言包
// import { createI18n } from "vue-i18n";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import i18n from "./assets/i18n/index.js";
// const messages = {
//     en: {
//         ...enLocale,
//     },
//     "zh-Hans": {
//         ...zhLocale,
//     },
// };
// const i18n = createI18n({
//     locale: "en", //主语言
//     fallbackLocale: "zh-Hans", //备用语言
//     legacy: false,
//     messages,
// });
createApp(App).use(store).use(router).use(i18n).use(ElementPlus).mount("#app");

document.getElementById("html").onkeydown = (e) => {
    // console.log(e.key);
};

(function () {
    let link_base = document.createElement("link");
    link_base.type = "text/css";
    link_base.id = "theme";
    link_base.rel = "stylesheet";
    link_base.href = "./theme/base.css";
    document.getElementsByTagName("head")[0].appendChild(link_base);
    let link_suit = document.createElement("link");
    link_suit.type = "text/css";
    link_suit.id = "link_suit";
    link_suit.rel = "stylesheet";
    link_suit.href = "./theme/light.css";
    document.getElementsByTagName("head")[0].appendChild(link_suit);
})(); // 加载css文件


