<template>
  <div class="sticky-top">
    <nav class="navbar navbar-light navbar-expand-lg bg-black">
    <div class="container-fluid d-flex justify-content-between">
      <a class="navbar-brand" href="/">
      <img src="@/assets/logolast.png" alt="no">
      </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span class="navbar-toggler-icon bg-warning"></span>
    </button>
    <div class="offcanvas offcanvas-end text-bg-white" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title text-warning" id="offcanvasDarkNavbarLabel">I watch U</h5>
        <button type="button" class="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body justify-content-end align-items-center selector">
        
        <form @submit.prevent="searchmovie" class="d-flex me-5">

            <input class="form-control me-3 fs-6" type="search" placeholder="Keyword" aria-label="Search" v-model="keyword">
            <button class="btn btn-outline-warning" type="submit">Search</button>
        </form> 
        
        <div>
        <ul class="navbar-nav flex-grow-1 pe-3 fs-5">
          <li class="nav-item">
            <router-link :to="{name:'home'}" class="me-2 nav-link">  홈으로 
          </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'All'}" class="me-2 nav-link"> 전체영화 
          </router-link>
          </li>
          
          <li class="nav-item">
            <router-link :to="{name:'myMovie' ,params:{ username:username }}" class="me-3 nav-link" v-if="isLogin"> 나의영화 
          </router-link>
          </li>
          <li class="nav-item" v-if="!isLogin">
            <router-link :to="{name:'login'}" class="me-2 nav-link"> 로그인 
          </router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link :to="{name:'logout'}" class="me-2 nav-link"> 로그아웃 </router-link>
          </li>
        </ul>
      </div>
      </div>
    </div>
  </div>
</nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name:'NavNar',
  data() {
    return {
      keyword: null,
    }
  },
  computed: {
    ...mapGetters('account', ['isLogin']),
    username() {
      return this.$store.state.account.username
    }  },
  methods: {
    searchmovie() {
      const keyword = this.keyword
      console.log(keyword)
      if (this.$route.params.keyword === keyword) {
        alert('검색 결과 화면입니다.')
      }
      else if (this.keyword === null) {
        alert('검색어를 입력해주세요')
      }
      else {
      this.$store.commit('SEARCH_RESULT', keyword)
      this.keyword = null
      }
    }
  }
  }


</script>

<style scoped>
nav{
  height: 83px;
}
img{
  height: 55px;
  width: 165px;
}
nav a {
  color: rgba(0, 0, 0, 0.808);
  text-decoration-line: none;
}
nav a:hover{
  color: rgba(241, 202, 118, 0.692);
}
nav a.router-link-exact-active {
  color: #fac413;
}
@media(min-width: 992px) {
  nav a {
    color: rgba(245, 242, 229, 0.938); /* 링크의 색상 제거 */
    text-decoration-line: none;
  }
  nav a:hover{
    color: grey;
  }
  nav a.router-link-exact-active {
    color: #ffca18;
  }
}
</style>