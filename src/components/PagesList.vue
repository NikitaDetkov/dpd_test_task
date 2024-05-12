<template>
    <ul class="pages_list">
        <li v-for="i in pages" 
            :key="i" class="pages_list__item" 
            :class="{'active_page' : i - 1 === activePage}"
            @click="switchPage(i - 1)"
        >
            {{ i }}
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PagesList',
    props: {
        activePage: Number,
        pages: Number
    },
    methods: {
        switchPage(pageNumber: number) {
            this.$emit('switchPage', pageNumber);
        }
    },
    emits: {
        'switchPage': (pageNumber: number) => Number.isInteger(pageNumber)
    }
})
</script>

<style scoped>
    .pages_list {
        display: flex;
        gap: 5px;
    }

    .pages_list__item {
        list-style-type: none;
        cursor: pointer;
        color: darkslategray;
    }

    .pages_list__item.active_page {
       border-bottom: 1px solid darkslategray;
    }
</style>