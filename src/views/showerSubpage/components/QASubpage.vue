<!-- 农业知识问答子页面 -->
<template>
    <div class="qa_subpage_container" ref="container">
        <div class="sessions_selecter">
            <button class="add_session_button" @click="add_session">
                新会话
            </button>
            <div class="session_containers" :key="re" ref="session_containers_ref">
                <div
                    :class="dialog_arr[item.num] ? 'session_buttons_selected' : 'session_buttons'"
                    v-for="item in qa_dialog_menus"
                    :key="item.lable"
                    @click="sessionChange(item.num)"
                >
                <div class="session_delete" @click.stop="sessionDelete">×</div>
                    {{ item.lable }}
                </div>
            </div>
        </div>
        <div class="qa_main">
            <div class="qa_input_container">
                <!-- <div class="qa_input_reminder">&nbsp;&nbsp;&nbsp;输入问题:</div> -->
                <textInput
                    :msg="msg"
                    :input_font_size="input_font_size"
                    :placeholder="input_place_holder"
                    class="qa_input_mainer"
                    ref="question_input_ref"
                >
                </textInput>
                <button class="qa_input_button" @click="question_submit">
                    发送
                </button>
            </div>
            <div
                class="qa_show_container"
                ref="qa_show_container_ref"
                :key="re"
            >
                <dialogAvatarBox
                    v-for="item in qa_dialog_menus[dialog_selected].sessions"
                    :key="item.time"
                    :content="item.content"
                    :is_left="item.is_left"
                    :is_right="item.is_right"
                    :class="{
                        dialog_left: item.is_left,
                        dialog_right: item.is_right,
                    }"
                />
            </div>
        </div>
    </div>
</template>
<script>
import textInput from "@/components/inputs/textInput/textInput.vue";
import dialogAvatarBox from "@/components/dialogBoxes/dialogAvatarBox/dialogAvatarBox.vue";
import Storage from "@/assets/js/storage/storage.js";
export default {
    data() {
        return {
            re: true,
            msg: "",
            input_font_size: "20px",
            input_place_holder: "请在这里输入你的问题",
            qa_dialog_menus: [
                {
                    num: 0,
                    lable: "对话0",
                    sessions: [
                        {
                            content:
                                "你好，欢迎来到问答界面！\n 请输入你的问题",
                            is_left: true,
                            is_right: false,
                            time: new Date(
                                new Date().getTime()
                            ).toLocaleString(),
                        },
                    ],
                },
            ],
            dialog_arr: [true],
            dialog_selected: 0,
            counter: 0,
        };
    },
    methods: {
        getOffsetTop() {
            return this.$refs.container.offsetTop;
        },
        question_submit() {
            let time = new Date(new Date().getTime()).toLocaleString();
            let text = this.$refs.question_input_ref.input_msg;
            let item = {
                time: time,
                content: text,
                is_left: this.re,
                is_right: !this.re,
            };
            this.qa_dialog_menus[this.dialog_selected].sessions.push(item);
            // this.re = !this.re;
            this.$nextTick(() => {
                this.$refs.qa_show_container_ref.scrollTop =
                    this.$refs.qa_show_container_ref.scrollHeight;
                // console.log(this.$refs.qa_show_container_ref.scrollTop);
                // console.log(this.$refs.qa_show_container_ref.scrollHeight);
            });
            console.log(this.qa_dialog_menus);
            this.$refs.question_input_ref.input_msg = "";
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
        },
        add_session() {
            this.counter++;
            let i = 0;
            for (i; i < this.dialog_arr.length; i++) {
                this.dialog_arr[i] = false;
            }
            this.dialog_arr.push(true);
            this.dialog_selected = this.dialog_arr.length - 1;
            console.log("对话数组", this.dialog_arr);
            let time = new Date(new Date().getTime()).toLocaleString();
            let text = "你好，欢迎来到问答界面！\n 请输入你的问题o";
            let item = {
                time: time,
                content: text,
                is_left: true,
                is_right: false,
            };
            let title = "对话" + this.counter;
            let dia = {
                num: this.counter,
                lable: title,
                sessions: [item],
            };
            this.qa_dialog_menus.push(dia);
            // this.re = !this.re;
            this.$nextTick(() => {
                this.$refs.session_containers_ref.scrollTop =
                    this.$refs.session_containers_ref.scrollHeight;
            });
            Storage.set(0, "DIALOG_ARR", this.dialog_arr, "JSON"); // 保存
            Storage.set(0, "DIALOG_MENUS", this.qa_dialog_menus, "JSON"); // 保存
        },
        increment() {
            return this.counter;
        },
        sessionChange(item) {
            let i = 0;
            for (i; i < this.dialog_arr.length; i++) {
                this.dialog_arr[i] = false;
            }
            this.dialog_arr[item] = true;
            this.dialog_selected = item;
            // console.log("现在共有",this.counter,"个对话");
            console.log("现在被选中的对话序号是：", item);
            Storage.set(0, "DIALOG_ARR", this.dialog_arr, "JSON"); // 保存
        },
        sessionDelete(){
            console.log("被点击");
        }
    },
    // watch: {
    //     deep:true,
    //     qa_dialog_menus(newValue, oldValue) {
    //         console.log("变化");
    //         let qa_dialog_menus = Storage.get(0, "DIALOG_MENUS", [
    //             {
    //                 lable: "Dialog_1",
    //                 sessions: [
    //                     {
    //                         content:
    //                             "你好，欢迎来到问答界面！\n 请输入你的问题",
    //                         is_left: true,
    //                         is_right: false,
    //                         time: new Date(
    //                             new Date().getTime()
    //                         ).toLocaleString(),
    //                     },
    //                 ],
    //             },
    //         ]);
    //         console.log("读取到的本地值", qa_dialog_menus);
    //         console.log("读取到的值", this.qa_dialog_menus);
    //     },
    // },
    components: {
        textInput,
        dialogAvatarBox,
    },
    created() {
        let qa_dialog_menus = Storage.get(
            0,
            "DIALOG_MENUS",
            [
                {
                    num: 0,
                    lable: "对话0",
                    sessions: [
                        {
                            content:
                                "你好，欢迎来到问答界面！\n 请输入你的问题",
                            is_left: true,
                            is_right: false,
                            time: new Date(
                                new Date().getTime()
                            ).toLocaleString(),
                        },
                    ],
                },
            ],
            "JSON"
        );
        let dialog_arr =Storage.get(
            0,
            "DIALOG_ARR",
            [true],
            "JSON"
        );
        if (qa_dialog_menus.length === 0) return;
        this.qa_dialog_menus = qa_dialog_menus;
        this.$nextTick(() => {
            this.$refs.qa_show_container_ref.scrollTop =
                this.$refs.qa_show_container_ref.scrollHeight;
            // console.log(this.$refs.qa_show_container_ref.scrollTop);
            // console.log(this.$refs.qa_show_container_ref.scrollHeight);
        });
        this.dialog_arr = dialog_arr;
        let i = 0;
        for(i=0;i<this.dialog_arr.length;i++){
            if(this.dialog_arr[i]===true){
                this.dialog_selected=i;
                break;
            }
        }
        this.counter = this.dialog_arr.length-1;
    },
};
</script>

<style scoped>
.qa_subpage_container {
    position: relative;
    /* border: 1px solid red; */
    float: right;
    width: 98%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: content-box;
    display: block;
}
.qa_input_container {
    position: relative;
    width: 94%;
    height: 10%;
    background-color: white;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: row;
    /* border: solid 1px rgb(154, 154, 154); */
    top: 87%;
    left: 0;
    /* right: 10px; */
}
.qa_input_reminder {
    top: 0;
    position: absolute;
    width: 100%;
    height: 10%;
    background-color: rgb(245, 245, 245);
    text-align: left;
    color: rgb(206, 146, 218);
    cursor: default;
}
.qa_input_mainer {
    width: 87%;
    height: 100%;
    position: absolute;
    /* top:18%; */
    left: 0%;
}
.qa_input_button {
    position: relative;
    bottom: 2%;
    width: 100px;
    height: 40px;
    cursor: pointer;
    background-color: rgb(207, 159, 216);
    font-size: 18px;
    color: white;
    border-radius: 6px;
    border: none;
    left: 88%;
}
.qa_input_button:hover {
    background-color: rgb(204, 121, 221);
}
.qa_main {
    position: absolute;
    top: 0;
    left: 20%;
    width: 80%;
    height: 100%;
    /* border:solid 1px red; */
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
}
.qa_show_container {
    position: absolute;
    width: calc(100% - 50px);
    height: 85%;
    top: 0;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: start;
    /* align-items: center; */
    overflow-y: scroll;
    overflow-x: hidden;
    padding-left: 50px;
    /* border: 1px solid red; */
}
.qa_show_container::-webkit-scrollbar {
    width: 12px;
    margin-right: 5px;
    background-color: var(--scrollbar-background-color);
    opacity: 0;
}
/* 滚动槽 */
.qa_show_container::-webkit-scrollbar-track {
    /* visibility: hidden; */
    margin-right: 5px;
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    /* background-color: aquamarine; */
    border-radius: 10px;
}
/* 滚动条滑块 */
.qa_show_container::-webkit-scrollbar-thumb {
    opacity: 0;
    margin-right: 5px;
    border-radius: 10px;
    background: var(--scrollbar-thumb-background);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
    /* transition: all 0.5 ease; */
}
.dialog_div_container {
    display: block;
    position: relative;
    width: 100%;
    height: 20%;
    /* border: 1px solid red; */
}
.dialog_left {
    position: relative;
    left: 0;
    float: left;
}
.dialog_right {
    position: relative;
    right: 0;
    float: right;
}
.sessions_selecter {
    position: absolute;
    left: 0;
    top: 0;
    width: 20%;
    height: 100%;
    /* border: solid 1px red; */
    background-color: palegreen;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid black;
    border-left: 1px solid black;
}
.session_containers::-webkit-scrollbar {
    width: 12px;
    margin-right: 5px;
    background-color: var(--scrollbar-background-color);
    opacity: 0;
}
/* 滚动槽 */
.session_containers::-webkit-scrollbar-track {
    /* visibility: hidden; */
    margin-right: 5px;
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.485);
    /* background-color: aquamarine; */
    border-radius: 10px;
}
/* 滚动条滑块 */
.session_containers::-webkit-scrollbar-thumb {
    opacity: 0;
    margin-right: 5px;
    border-radius: 10px;
    background: var(--scrollbar-thumb-background);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
    /* transition: all 0.5 ease; */
}
.add_session_button {
    position: relative;
    height: 6%;
    width: 60%;
    top: 3%;
    right: 1px;
    cursor: pointer;
    color: rgb(230, 146, 255);
    border-radius: 6px;
    border: none;
    background-color: white;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(0, 0, 0, 0.3);
    font-size: 18px;
}
.add_session_button:hover {
    color: white;
    background-color: rgba(220, 179, 233, 0.8);
}
.session_containers {
    position: relative;
    /* background-color: red; */
    top: 8%;
    height: 86%;
    width: 100%;
    /* background-color: aqua; */
    border: solid 1px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
}
.session_buttons {
    position: relative;
    width: 80%;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: transparent;
    border-radius: 6px;
    /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(0, 0, 0, 0.3); */
    border: 2px solid rgb(165, 165, 165);
    color: rgb(230, 146, 255);
    line-height: 40px;
    text-align: center;
    padding: 0;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* z-index: 2; */
}
.session_buttons:hover {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3), -2px -2px 2px rgba(0, 0, 0, 0.3);
    color: rgb(254, 196, 255);
}
.session_buttons_selected{
    position: relative;
    width: 80%;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: transparent;
    border-radius: 6px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3), -2px -2px 2px rgba(0, 0, 0, 0.3);
    border: 2px solid rgb(230, 146, 255);
    color: rgb(230, 146, 255);
    line-height: 40px;
    text-align: center;
    padding: 0;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.session_delete{
    position: absolute;
    top:30%;
    left:85%;
    width:15%;
    height: 50%;
    /* border: 1px solid red; */
    line-height: 60%;
    /* z-index: 3; */
}
</style>
