import Vue from "vue";
import EmoteInput from "./components/EmoteInput";

// Create the emote-input tag
let div = document.createElement("div");
div.setAttribute('id', 'emote-autocomplete');
div.style.marginTop = "2em";
let input = document.createElement('emote-input');
input.style.width = "100%";
div.appendChild(input);
document.querySelector('#room-chat-holder').after(div);

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