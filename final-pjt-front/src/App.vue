<template>
  <div id="app d-flex" >
  
    <nav-bar class=''/>
    <h5 v-if="isLogin" class="text-end text-white me-4 mt-2 ">안녕하세요 <span class="text-warning fw-semibold"><a class="navnick" :href = "`http://localhost:8080/mymovie/${this.$store.state.account.username}`">{{ this.$store.state.account.username }}</a> </span> 님.</h5>
    <router-view/>
    <p class="sticky-bottom text-center copy">Copyright 2023. I-watch-U 김동혁,신제형 All rights reserved.</p>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { mapGetters } from 'vuex'
export default {
  
  name:'app',
  components: { 
    NavBar 
  },
  computed: {
    ...mapGetters('account', ['isLogin']),
    username() {
      return this.$store.state.account.username
    }  },
}
</script>

<style>
.copy{
  font-size: small;
  color:#ffffff99
}
.navnick{
  text-decoration-line: none;
  color: #ffca18;
}
.navnick :hover{
  color: gray;
}
body{
  background-color: #ffffff;
  font-family: "Pretendard Variable",sans-serif;
  background-image: url('@/assets/bbbb.avif');
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  color: rgba(0, 0, 0, 0.877); /* 링크의 색상 제거 */
  text-decoration-line: none;
}
nav a:hover{
  color: grey;
}
nav a.router-link-exact-active {
  color: #ffca18;
}
.fade-enter {
      opacity: 0;
    }

    .fade-enter-active {
      opacity: 1;
      transition: opacity 0.5s;
    }

    .fade-exit {
      opacity: 1;
    }

    .fade-exit-active {
      opacity: 0;
      transition: opacity 0.5s;
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
