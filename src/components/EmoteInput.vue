<template>
    <div>
        <v-select :options="options" label="title" v-on:option:selected="sendEmote" placeholder="BTTV / FFZ emote">
            <template v-slot:option="option">
                <img :src="option.image.sm"/>
                <span class="emote-title">{{ option.title }}</span>
            </template>
        </v-select>
    </div>
</template>

<script>

import vSelect from 'vue-select';
import axios from 'axios';

export default {

    components: {
        'v-select': vSelect
    },

    data: function () {
        return {
            options: []
        }
    },

    // TODO : fetch 7tv
    // TODO : fetch methods in class
    methods: {

        /**
         * Fetches emotes from BTTV
         * @param channels_ids
         */
        fetchBTTV: function (channels_ids) {
            for (let i = 0; i < channels_ids.length; i++) {
                axios.get('https://api.betterttv.net/3/cached/users/twitch/'+channels_ids[i]).then(({data}) => {
                    ['channelEmotes', 'sharedEmotes'].forEach((type) => {
                        for(let j = 0; j < data[type].length; j++){
                            this.addOptionBTTV(data[type][j]);
                        }
                    });
                });
            }
        },

        /**
         * Adds a bttv emote to the option list
         * @param emote
         */
        addOptionBTTV: function(emote){
            // Make sure the emote id is unique
            let exists = this.options.some(code => code.id === emote.id);
            if (exists) return;

            let option = {
                id: emote.id,
                title: emote.code,
                image: {
                    sm: 'https://cdn.betterttv.net/emote/'+emote.id+'/1x',
                    xl: 'https://cdn.betterttv.net/emote/'+emote.id+'/3x'
                }
            }

            this.options.push(option);
        },

        /**
         * Fetches emotes from FFZ
         * @param channels_ids
         */
        fetchFFZ: function (channels_ids) {
            for (let i = 0; i < channels_ids.length; i++) {
                axios.get('https://api.frankerfacez.com/v1/room/id/'+channels_ids[i]).then(({data}) => {
                    for (const [key, set] of Object.entries(data.sets)) {
                        for(let j = 0; j < set.emoticons.length; j++){
                            this.addOptionFFZ(set.emoticons[j]);
                        }
                    }
                });
            }
        },

        /**
         * Adds a ffz emote to the option list
         * @param emote
         */
        addOptionFFZ: function(emote){
            // Make sure the emote id is unique
            let exists = this.options.some(code => code.id === emote.id);
            if (exists) return;

            let option = {
                id: emote.id,
                title: emote.name,
                image: {
                    sm: emote.urls[1],
                    xl: emote.urls[4]
                }
            }

            this.options.push(option);
        },

        /**
         * Fetches emotes from FFZ
         * @param channels_ids
         */
        fetch7TV: function (channels_ids) {
            for (let i = 0; i < channels_ids.length; i++) {
                axios.get('https://api.7tv.app/v2/users/'+channels_ids[i]+'/emotes').then(({data}) => {
                    for(let j = 0; j < data.length; j++){
                        this.addOption7TV(data[j]);
                    }
                });
            }
        },

        /**
         * Adds a ffz emote to the option list
         * @param emote
         */
        addOption7TV: function(emote){
            // Make sure the emote id is unique
            let exists = this.options.some(code => code.id === emote.id);
            if (exists) return;

            let option = {
                id: emote.id,
                title: emote.name,
                image: {
                    sm: emote.urls[0][1],
                    xl: emote.urls[3][1]
                }
            }

            this.options.push(option);
        },

        /**
         * Sends the emote in beatsense chat
         */
        sendEmote: function(emote){
            let ng_scope = angular.element(document.body).injector().get("$rootScope");
            ng_scope.$broadcast("chat:send:gif", {
                title: emote.title,
                url: emote.image.xl,
                width: 112,
                height: 112
            });
        }
    },

    created: function () {

        // Fetch the emotes
        for (const [type, channels_ids] of Object.entries(this.$root.channels)) {
            let method = 'fetch' + type.toUpperCase();
            if (typeof this[method] === "function") {
                this[method](channels_ids);
            }
        }

    }
}
</script>

<style scoped>
@import '~vue-select/dist/vue-select.css';
.v-select{
    background-color: #FFF;
}

.emote-title{
    margin-left: 1em;
}
</style>