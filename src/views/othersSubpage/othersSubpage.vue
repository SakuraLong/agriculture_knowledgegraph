<template>
    <defaultShutters has_right_girl="true">
        <template #show_child_page>
            <div style="position: relative; width: 100%; height: 100%">
                <div class="subpageSelect" style="border: solid 1px red">
                    <button
                        class="subpage_isSelected"
                        id="subpage_button0"
                        @click="changeSubButton(0)"
                    >
                        <div
                            class="button_text"
                            :data-text="$t('views.othersSubpage.language')"
                        >
                            {{ $t("views.othersSubpage.language") }}
                        </div>
                    </button>
                    <button
                        class="subpage_unSelected"
                        id="subpage_button1"
                        @click="changeSubButton(1)"
                    >
                        <div
                            class="button_text"
                            :data-text="$t('views.othersSubpage.about')"
                        >
                            {{ $t("views.othersSubpage.about") }}
                        </div>
                    </button>
                    <button
                        class="subpage_unSelected"
                        id="subpage_button2"
                        @click="changeSubButton(2)"
                    >
                        <div
                            class="button_text"
                            :data-text="$t('views.othersSubpage.preference')"
                        >
                            {{ $t("views.othersSubpage.preference") }}
                        </div>
                    </button>
                </div>
                <threeSubpage
                    style="border: solid 1px red"
                    :subpageSelected="subpageSelected_judge"
                ></threeSubpage>
            </div>
        </template>
    </defaultShutters>
</template>
<script>
import threeSubpage from "@/views/othersSubpage/components/threeSubpage.vue";
import defaultShutters from "@/components/shutter/defaultShutter.vue";
export default {
    data() {
        return {
            subpageSelected_judge: [true, false, false],
        };
    },
    methods: {
        changeSubButton(page) {
            this.subpageSelected_judge[page] = true;
            document.getElementById("subpage_button" + page).className =
                "subpage_isSelected";
            for (let i = 0; i < 3; i++) {
                if (i !== page) {
                    document.getElementById("subpage_button" + i).className =
                        "subpage_unSelected";
                    this.subpageSelected_judge[i] = false;
                }
            }
            // console.log(this.t);
        },
    },
    components: {
        threeSubpage,
        defaultShutters,
    },
};
</script>

<style>
.subpageSelect {
    position: relative;
    width: 84%;
    height: 10%;
    left: 8%;
    top: 0;
    /* border: solid 1px red; */
    display: flex;
    flex-direction: row;
    pointer-events: all;
    z-index: 100;
}
.subpage_isSelected {
    width: 33.3%;
    height: 100%;
    cursor: pointer;
    border: solid 2px #d5b4dc;
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    background-color: #d5b4dc;
    position: relative;
    color: white;
    /* border: none; */
}
.subpage_unSelected {
    width: 33.3%;
    height: 100%;
    cursor: pointer;
    border: solid 2px #d5b4dc;
    font-family: FZZJ-WHJZTJW;
    font-weight: 400;
    font-size: 20px;
    position: relative;
    color: #d5b4dc;
    /* border: none; */
}
.subpage_isSelected:hover {
    background-color: #d5b4dc;
}
.button_text {
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
.subpage_unSelected:hover > .button_text {
    color: white;
}
.subpage_unSelected:hover > .button_text::after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    -webkit-text-stroke: 8px #d5b4dc;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
