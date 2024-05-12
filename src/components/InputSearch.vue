<template>
    <div class="searching_text__wrapper">
        <div class="searching_text">
            <label for="searchingText">Искать</label>
            <input type="text" 
                id="searchingText" 
                :value="searchingText" 
                class="searching_text__input" 
                @input="searchText"
            >
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    props: {
        searchingText: String
    },
    methods: {
        searchText(e: any) {
            this.$emit('searchText', e.target.value);
        }
    },
    emits: {
        'searchText': (text: string) => typeof text === 'string'
    }
})
</script>

<style scoped>
    .searching_text__wrapper {
        margin-left: 20px;
        display: flex;
        justify-content: left;
    }

    .searching_text {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .searching_text label {
        font-size: 18px;
        font-weight: 500;
        color: darkslategray;
    }

    .searching_text__input {
        background-color: rgb(213, 225, 222);
        border-radius: 6px;
        padding: 5px;
        border: 0;
        font-size: 16px;
        color: darkslategray;
    }

    .searching_text__input:focus-visible {
        outline: 2px solid slateblue;
    }
</style>