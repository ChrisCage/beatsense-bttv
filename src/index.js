import Vue from "vue";
import EmoteInput from "./src/components/EmoteInput";

new Vue({

    el: "#emote-autocomplete",

    components: {
        'emote-input': EmoteInput
    }

});