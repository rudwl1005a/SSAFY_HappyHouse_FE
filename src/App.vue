<template>
    <div id="app" style="overflow-x: hidden">
        <side-bar></side-bar>
        <router-view/>
    </div>
</template>

<script>
import SideBar from "@/views/Sidebar.vue";

export default {
    name: "app",
    components: { SideBar },
    data() {
        return {

        }
    },
    methods: {

    }
};
</script>

<style>
@import "@/css/volt.css";

.change-big {
    padding-left: 312px !important;
    transition-duration: 0.5s;
}
.change-small {
    padding-left: 102px !important;
    transition-duration: 0.5s;
}
</style>
