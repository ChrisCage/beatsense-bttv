import Vue from "vue";
import EmoteInput from "./components/EmoteInput";

// Create the emote-input tag
let div = document.createElement("div");
div.setAttribute('id', 'emote-autocomplete');
let input = document.createElement('emote-input');
div.appendChild(input);
document.body.appendChild(div);

// Boot the app
new Vue({

    el: "#emote-autocomplete",

    data: {
        channels: channels
    },

    components: {
        'emote-input': EmoteInput
    }

});