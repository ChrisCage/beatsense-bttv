import Vue from "vue";
import EmoteInput from "./components/EmoteInput";

// Wait 10 seconds for beatsense to load properly
// TODO : how to get a "go" from beatsense?
setTimeout(bootApp, 10000);

/**
 * Starts the app
 */
function bootApp(){

    // Create the emote-input tag
    let div = document.createElement("div");
    div.setAttribute('id', 'emote-autocomplete');
    div.style.marginTop = "2em";
    let input = document.createElement('emote-input');
    input.style.width = "100%";
    div.appendChild(input);
    document.querySelector('my-room-chat').append(div);

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

}