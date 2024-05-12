<template>
    <div class="table__item">
        <div class="table__cell">
            <img :src="user.picture.medium" alt="Портрет пользователя">
        </div>
        <div class="table__cell">
            <span>{{ user.fullname }}</span>
        </div>
        <div class="table__cell">
            <span>{{ user.gender }}</span>
        </div>
        <div class="table__cell">
            <span>{{ user.location.country }}</span>
        </div>
        <div class="table__cell">
            <span>{{ user.dateBirth }}</span>
        </div>
        <div class="table__cell">
            <span>{{ user.email }}</span>
        </div>
        <div class="table__cell">
            <span>{{ user.phone }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { User } from '@/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'LineTable',
    props: {
        user: {
            type: Object as PropType<User>,
            required: true,
        }
    },
});
</script>
