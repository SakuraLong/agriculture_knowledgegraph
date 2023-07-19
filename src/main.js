import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import enLocale from "./assets/i18n/en"; // 导入项目中用到的英文语言包
// import zhLocale from "./assets/i18n/zh-CN"; // 导入项目中用到的中文语言包
// import { createI18n } from "vue-i18n";
import ElementPlus from "element-plus";
import Storage from "./assets/js/storage/storage";
import "element-plus/dist/index.css";
import i18n from "./assets/i18n/index.js";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import * as ELIcons from "@element-plus/icons-vue";

const app = createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .use(ElementPlus, { locale: zhCn });
for (let iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName]);
}
app.mount("#app");
document.getElementById("html").onkeydown = (e) => {
    // console.log(e.key);
};

(function () {
    const default_theme = {
        theme: "light",
        color: "",
        font_size: {
            base: "",
            button: "",
        },
    };
    let link_base = document.createElement("link");
    link_base.type = "text/css";
    link_base.id = "theme";
    link_base.rel = "stylesheet";
    link_base.href = "./theme/base.css";
    document.getElementsByTagName("head")[0].appendChild(link_base);
    let theme = Storage.get(0, "THEME", default_theme, "JSON");
    let link_suit = document.createElement("link");
    link_suit.type = "text/css";
    link_suit.id = "link_suit";
    link_suit.rel = "stylesheet";
    link_suit.href =
        theme.theme === "light" ? "./theme/light.css" : "./theme/dark.css";
    document.getElementsByTagName("head")[0].appendChild(link_suit);
})(); // 加载css文件
