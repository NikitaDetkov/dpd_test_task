<template>
  <main class="main">
    <div class="table">
      <div class="table__item table__header">
        <div v-for="header of headers" :key="header.name" class="table__cell">
          <h3>{{ header.text }}</h3>
          <div class="sort_buttons" :class="header.name === 'photo' ? 'none' : ''">
            <div class="sort_buttons__btn" @click="() => sortList(header.name, 1)">&uArr;</div>
            <div class="sort_buttons__btn" @click="() => sortList(header.name, -1)">&dArr;</div>
          </div>
        </div>
      </div>
      <LineTable v-for="user of usersList" :key="user.id" :user="user" />
    </div>
    <div class="page_switch"></div>
  </main>
</template>

<script lang="ts">
import { UserList } from '@/types';
import { defineComponent, PropType } from 'vue';
import LineTable from './LineTable.vue';

type State = {
  headers: {
    name: string,
    text: string,
  }[]
};

export default defineComponent({
  components: { LineTable },
  name: 'UsersTable',
  props: {
    usersList: {
      type: Object as PropType<UserList>,
      required: true
    },
  },
  data(): State {
    return {
      headers: [
        { name: 'photo', text: 'Фото' },
        { name: 'fullname', text: 'ФИО' },
        { name: 'gender', text: 'Пол' },
        { name: 'country', text: 'Страна' },
        { name: 'date', text: 'Дата рождения' },
        { name: 'email', text: 'Email' },
        { name: 'phone', text: 'Телефон' },
      ]
    }
  },
  methods: {
    sortList(key: string, direction: number) {
      this.$emit('sortList', key, direction);
    }
  },
  emits: {
    'sortList': (key: string, direction: number) => typeof key === 'string'
  }

});
</script>

<style>
  .user_table {
    display: flex;
    flex-direction: column;
  }

  .table__item.table__header {
    border: 0;
    padding: 0 0 10px;
  }

  .table__header h3 {
    padding: 0;
    margin: 0;
  }

  .table__header .table__cell {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .table__item {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-top: 1px solid rgb(207, 207, 207);
  }

  .table__item span {
    word-break:break-all
  }

  .table__cell {
    padding: 5px 0;
    font-size: 14px;
  }

  .sort_buttons {
    display: flex;
    gap: 6px;
    cursor: pointer;
  }

  .sort_buttons.none {
    display: none;
  }

  .sort_buttons__btn {
    border-radius: 10px;
    padding: 4px 10px;
    background-color: rgb(121, 186, 186);
    color: darkslategray;
    user-select: none;
  }

  .sort_buttons__btn:hover {
    background-color: rgb(157, 217, 217);
  }

  .sort_buttons__btn:active {
    background-color: darkslategray;
    color: rgb(121, 186, 186);
  }
</style>
