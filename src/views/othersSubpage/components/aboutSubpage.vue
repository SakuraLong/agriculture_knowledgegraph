<template>
    <div
        style="
            width: 100%;
            height: 100%;
            overflow: auto;
            position: absolute;
            font-size: 20px;
            font-family: Heiti;
            top: 0;
            left: 0;
            overflow: hidden;
            color: var(--subpage-aboutSubpage-color);
        "
    >
        <el-scrollbar
            style="
                width: 100%;
                height: 100%;
                overflow: auto;
                top: 1%;
                position: relative;
                font-size: 20px;
                font-family: Heiti;
            "
        >
            <h2>{{ $t("views.main_page.others_subpage.about_subpage.content.developers") }}</h2>
            <h3>{{ $t("views.main_page.others_subpage.about_subpage.content.group_leader") }}</h3>
            <p>Sakura</p>
            <h3>{{ $t("views.main_page.others_subpage.about_subpage.content.group_members") }}</h3>
            <p>ShmilyAyu</p>
            <p>水木</p>
            <p>绵满</p>
            <h2>{{ $t("views.main_page.others_subpage.about_subpage.content.interface_design") }}</h2>
            <h3>{{ $t("views.main_page.others_subpage.about_subpage.content.interface_framework") }}</h3>
            <p>KrieN</p>
            <h3>{{ $t("views.main_page.others_subpage.about_subpage.content.interface_details") }}</h3>
            <p>KrieN Sakura</p>
            <h2>{{ $t("views.main_page.others_subpage.about_subpage.content.art_designing") }}</h2>
            <h3>{{ $t("views.main_page.others_subpage.about_subpage.content.character_line_draft") }}</h3>
            <p>myra_xiangyuff</p>
            <h3>{{ $t("views.main_page.others_subpage.about_subpage.content.character_coloring") }}</h3>
            <p>抹茶</p>
            <h3>{{ $t("views.main_page.others_subpage.about_subpage.content.home_page_dynamic_effect") }}</h3>
            <p>dyh</p>
        </el-scrollbar>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
