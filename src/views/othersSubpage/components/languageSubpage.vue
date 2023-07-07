<template>
    <div style="
                display: flex;
                flex-direction: column;
                position: absolute;
                /* left: 40%; */
                justify-content: center;
                align-items: center;
                width:70%;
                height: 50%;
                top:10%;
            ">        
            <button
                class="test_class1"
                id="test_button1"
                @click="changeLanguage_zhHans"
            >
                <div class="button_text" data-text="简体中文">简体中文</div>
            </button>
            <button
                class="test_class1"
                id="test_button2"
                @click="changeLanguage_en"
            >
            <div class="button_text" data-text="英文">英文</div>
            </button>
        
    </div>
</template>

<script>
import Storage from "@/assets/js/storage/storage.js";

export default {
    methods: {
        changeLanguage_zhHans() {
            if (this.radio1 === "en") {
                this.radio1 = "zh-Hans";
            }
        },
        changeLanguage_en() {
            if (this.radio1 === "zh-Hans") {
                this.radio1 = "en";
            }
        },
    },
    data() {
        return {
            radio1: "en",
        };
    },
    watch: {
        radio1() {
            console.log(this.radio1);
            window.localStorage.setItem("LANGUAGE", this.radio1);
            if (this.radio1 === "en") {
                document.getElementById("test_button2").className =
                    "test_class3";
                document.getElementById("test_button1").className =
                    "test_class1";
            } else {
                document.getElementById("test_button1").className =
                    "test_class3";
                document.getElementById("test_button2").className =
                    "test_class1";
            }
        },
    },
    created() {
        this.radio1 = window.localStorage.getItem("LANGUAGE");
        if (this.radio1 == null) {
            window.localStorage.setItem("LANGUAGE", "en");
            this.radio1 = "en";
        }
    },
    mounted() {
        if (this.radio1 === "en") {
            document.getElementById("test_button2").className = "test_class3";
            document.getElementById("test_button1").className = "test_class1";
        } else {
            document.getElementById("test_button1").className = "test_class3";
            document.getElementById("test_button2").className = "test_class1";
        }
    },
};
</script>
<style scoped>
.radio_class > input {
    /* width: 1000px !important; */
    border: solid 1px red;
}
.test_class1 {
    margin-top: 40px;
    width: 150px;
    height: 50px;
    background: none;
    border: 4px solid rgb(205, 199, 199);
    color: #d5b4dc;
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-transform: uppercase; /*大写文本*/
    cursor: pointer;
    position: relative;
}
.test_class1::before,
.test_class1::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 4px;
    background: white;
    transform: skewX(50deg);
    transition: 0.4s linear;
}
.test_class1::before {
    top: -4px;
    left: 10%;
}
.test_class1::after {
    bottom: -4px;
    right: 10%;
}
.test_class1:hover::before {
    left: 80%;
}
.test_class1:hover::after {
    right: 80%;
}
.test_class1:hover {
    color: #3498db;
}
.test_class3 {
    margin-top: 40px;
    width: 150px;
    height: 50px;
    background-color: #d5b4dc;
    border: 4px solid rgb(205, 199, 199);
    color: white;
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-transform: uppercase; /*大写文本*/
    cursor: pointer;
    position: relative;
}
.test_class3::before,
.test_class3::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 4px;
    background: white;
    transform: skewX(50deg);
    transition: 0.4s linear;
}
.test_class3::before {
    top: -4px;
    left: 80%;
}
.test_class3::after {
    bottom: -4px;
    right: 80%;
}
.button_text{
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
.test_class1:hover>.button_text{
    color: white;
}
.test_class1:hover>.button_text::after{
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    -webkit-text-stroke: 6px #d5b4dc;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
