import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");

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
})();
