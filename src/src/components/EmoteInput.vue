<template>
    <div>
        <v-select :options="options" label="title">
            <template v-slot:option="option">
                <img :src="option.image" />
                {{ option.title }}
            </template>
        </v-select>
    </div>
</template>

<script>

import vSelect from 'vue-select';

export default {

    components: {
        'v-select': vSelect
    },

    data: function () {
        return {
            options: [
                {title: 'lisaZoom', image: 'https://cdn.betterttv.net/emote/611d32af76ea4e2b9f77f17c/1x'},
                {title: 'sanaCheering', image: 'https://cdn.betterttv.net/emote/61a4b20cb50549e7e50165e3/1x'},
            ]
        };
    },

    created: function () {

    }
}
</script>

<style scoped>
@import '~vue-select/dist/vue-select.css';
</style>