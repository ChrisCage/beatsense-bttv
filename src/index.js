import Vue from "vue";
import EmoteInput from "./src/components/EmoteInput";

// Create the emote-input tag
let div = document.createElement("div");
div.setAttribute('id', 'emote-autocomplete');
let input = document.createElement('emote-input');
div.appendChild(input);
document.body.appendChild(div);

new Vue({

    el: "#emote-autocomplete",

    components: {
        'emote-input': EmoteInput
    }

});