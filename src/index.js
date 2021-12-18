import Vue from "vue";
import EmoteInput from "./components/EmoteInput";

// Wait 8 seconds for beatsense to load properly
// TODO : how to get a "go" from beatsense?
setTimeout(bootApp, 8000);

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
        },

        methods: {
            /**
             * Autoredeems beats
             */
            autoRedeem: async function(){
                var a = angular.element(document.body).injector().get("beatsRewardTimerService"),
                b = angular.element(document.body).injector().get("beatsService"),
                c = await a.start(),
                d = c.timeLeft,
                e = function (a) {
                    return new Promise(function (b) {
                        return setTimeout(b, a);
                    });
                },
                f = async function () {
                    var c = await a.claimReward();
                    (d = c.timeLeft), await b.rewardHasBeenGiven();
                };
                for (console.log("starting auto-redeem"); ; ) console.log("waiting for " + d / 60 + " minutes before next redemption"), await e(1e3 * (d + 5)), await f();
            }
        },

        mounted: function(){
            this.autoRedeem();
        }

    });

}