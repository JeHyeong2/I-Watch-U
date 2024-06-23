<template>
  <div class="main">
    
    <br>
    <div class="container d-flex justify-content-center mt-3  ">
      <div class="col-10 new">
        <h3 class="text-start text-white fw-semibold text-black mb-3 mt-3 fw-bolder"><i class="fa-solid fa-film fa-sm" style="color: #ffdd00;"></i> 최신영화</h3>
     
        <NewMovie/>
      </div>
    </div>

    <br>

    <div>
    
      <div class="container d-flex justify-content-center">
        
      <div class="col-10">
        <h3 class="text-start text-dark fw-semibold text-white mb-3 fw-bolder"><i class="fa-solid fa-sm fa-tv" style="color: #ffdd00;"></i> 추천영화</h3>
      <div v-if="!isLogin" class="text-white">추천 영화를 보려면 로그인해주세요</div>
      <div v-else-if="count<3" class="text-white">추천 영화를 보기 위해선 {{ 3-count }}개의 영화를 더 관람하거나 '좋아요'를 눌러야합니다</div>
      <RecommendMovie
      v-else/>
      </div>
    </div>

    <br>
    <br>
    <div class="mt-3">
      <div class="container d-flex justify-content-center">
        <div class="col-10">
          <h3 class="text-start text-dark fw-semibold text-white mb-3 fw-bolder"><i class="fa-regular fa-message fa-flip-horizontal" style="color: #ffdd00;"></i> Now Update</h3>
          <p class="text-white">가장 최근에 작성된 댓글들 입니다.
            영화로 이동해 의견을 나눠보세요.</p>
      <NewComment/>
      <hr>
        </div>
      </div>
    </div>

<br>
<div>
      <div class="container d-flex justify-content-center" >
        <div class="col-10 text-center">
          
          <h3 class="text-white fw-semibold text-black fw-bolder mb-3">
            <i class=" fa-solid fa-ranking-star fa-lg" style="color: #ffdd00;"></i> Ranking</h3>
            <p class="text-white">작성한 리뷰들에 많은 공감을 받은 유저들 입니다.</p>
          <TotalLike/>
        </div>
      </div>
    </div>
    
    
    
    
  </div>
  </div>
</template>

<script>
import NewComment from '@/components/HomeView/NewComment.vue';
import NewMovie from '@/components/HomeView/NewMovie.vue';
import RecommendMovie from '@/components/HomeView/RecommendMovie.vue';
import TotalLike from '@/components/HomeView/TotalLike.vue';
import { mapGetters } from 'vuex';

export default {
    name: "HomeView",
    components: { NewMovie, RecommendMovie, NewComment, TotalLike },
  methods: {
    getMoives() {
      this.$store.dispatch('getMovies')
    },
    getRecommend() {
      this.$store.dispatch('getRecommend')
    },
    getComments() {
      this.$store.dispatch('getComments')
    },
    getUser() {
      this.$store.dispatch('getUser')
    }
  },
  computed: {
    ...mapGetters('account', ['isLogin']),
    count() {
      return this.$store.state.count
    },
    
  },  
  created() {
    this.getMoives()
    this.getComments()
    this.getUser()
    if (this.isLogin) {
    this.getRecommend()
    }
  }
}
</script>

<style scoped>
.container{
  max-width: 90%;
  min-width: 1000px;
}
.main{
  border-left: solid black 1px;
}
h3{
  text-shadow: 3px 3px 2px rgb(0, 0, 0);
}
.new{
  border-bottom: 2px solid rgba(255, 255, 255, 0.445);
 
}
</style>