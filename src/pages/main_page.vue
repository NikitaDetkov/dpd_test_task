<template>
  <div class="main">
    <header>
      <h2>Таблица пользователей</h2>
    </header>
    <InputSearch :searchingText="searchingText" @search-text="searchText"/>
    <PagesList 
      :activePage="this.activePage" 
      :pages="filteredUserList.length ? Math.ceil(filteredUserList.length / 20) : 0"
      @switch-page="switchPage"
    />
    <UsersTable 
      :usersList="this.usersList.length ?
        filteredUserList.slice(this.activePage * 20, this.activePage * 20 + 20) :
        []"
      @sort-list="sortList"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api_data from '../api_data/api.json';
import UsersTable from '../components/UsersTable.vue';
import PagesList from '../components/PagesList.vue';
import { User, UserList } from '../types';
import InputSearch from '@/components/InputSearch.vue';

type State = { 
  usersList: UserList,
  activePage: number,
  searchingText: string,
  filteredUserList: UserList,
  direction: number,
  sortKey: string;
};

const stateObj = { id: "10" }; 

export default defineComponent({
  components: { UsersTable, PagesList, InputSearch },
  name: 'MainPage',
  data(): State {
    return {
      usersList: [],
      activePage: 0,
      searchingText: '',
      filteredUserList: [],
      direction: 1,
      sortKey: '',
    }
  },
  created() {
    this.setParamsFromLink();
  },
  mounted() {
    if (api_data.results) {
      api_data.results.map(user => {
        const dateBirthObj: Date = new Date(user.dob.date);
        const dateBirth: string = this.getFullDate(dateBirthObj);

        const fullname: string = user.name.first + ' ' + user.name.last;
        this.usersList.push(
          {
            ...user,
            fullname: fullname,
            dateBirth: dateBirth
          }
        );
      });
    }

    this.setFilteredUserList();
    this.sortList(this.sortKey, this.direction);
  },
  methods: {
    switchPage(pageNumber: number) {
      this.activePage = pageNumber;

      this.setLink();
    },

    setParamsFromLink() {
      const paramsLink: string[] = window.location.href.split('?');

      if (paramsLink.length > 1) {
        const paramsArr: (string[])[] = paramsLink[1].split('&').map(param => param.split('='));
        const paramsObj: any = {};

        paramsArr.forEach(param => {
          paramsObj[param[0]] = param[1];
        })

        this.activePage = Number(paramsObj.page ?? 0);
        this.searchingText = paramsObj.search ?? '';
        
        this.sortKey = paramsObj.sort ?? '';
        this.direction = Number(paramsObj.direction ?? 1);
      }
    },

    searchText(text: string) {
      this.searchingText = text;
      this.activePage = 0;

      this.setFilteredUserList();

      this.setLink();
    },

    setLink() {
      window.history.replaceState(
        stateObj, 
        "", `?page=${this.activePage}&search=${this.searchingText}&sort=${this.sortKey}&direction=${this.direction}`
      );
    },

    setFilteredUserList() {
      if (!this.searchingText) this.filteredUserList = this.usersList;

      this.filteredUserList = this.usersList.filter(user => {
        const searchingText: string = this.searchingText.toLocaleLowerCase();
        return (
          user.fullname.toLocaleLowerCase().includes(searchingText) ||
          user.location.country.toLocaleLowerCase().startsWith(searchingText) ||
          user.gender.startsWith(searchingText) ||
          user.dateBirth.includes(searchingText) || 
          user.email.includes(searchingText) ||
          user.phone.startsWith(searchingText)
        )
      });
    },

    getFullDate(date: Date) {
      const days: number = date.getDate();
      const month: number = date.getUTCMonth() + 1;
      const year: number = date.getUTCFullYear();
      return (
          (days > 9 ? days : ('0' + days)) + '.' + 
          (month > 9 ? month : ('0' + month)) + '.' + 
          year
      );
    },

    sortList(key: string, direction: number) {
      if (!key) return;

      this.filteredUserList.sort((a, b) => {
        if (key === 'country') return direction * a.location.country.localeCompare(b.location.country);
        if (key === 'date') return direction * ((new Date(a.dob.date)).getTime() - new Date(b.dob.date).getTime());

        if (key === 'phone' || key === 'fullname' || key === 'email' || key === 'gender') {
          return direction * a[key].localeCompare(b[key]);
        }

        return 1;
      });

      this.sortKey = key;
      this.direction = direction;
      this.setLink();
    }
  }
});
</script>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  header {
    display: flex;
    justify-content: center;
  }
</style>
