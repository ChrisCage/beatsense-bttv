<template>
    <div>
        <v-select :options="options" label="title">
            <template v-slot:option="option">
                <img :src="option.image.sm"/>
                {{ option.title }}
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
                // axios.get('https://api.frankerfacez.com/v1/room/id/'+channels_ids[i]).then(({data}) => {
                //     console.log(data)
                    // ['channelEmotes', 'sharedEmotes'].forEach((type) => {
                    //     for(let j = 0; j < data[type].length; j++){
                    //         this.addOptionBTTV(data[type][j]);
                    //     }
                    // });
                // });
            }
        },

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
</style>