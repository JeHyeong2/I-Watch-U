<template>
  <div  class="row align-items-start rounded main">
      <div class="row d-flex justify-content-around top mb-4">
      <div class="mt-4 col-5 mb-2 d-flex justify-content-center">
        <img class='img' :src="`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`" alt="poster">
      </div>
      <div class="col-6 mt-5 text-white">
        <h1>{{ movie.title }} &nbsp;
          <i class="fa-regular fa-heart fa-xs" style="color: #fb0909; cursor: pointer;" v-if="!movie.is_movie_like" @click="movieLike(movie.id)"></i>
          <i class="fa-solid fa-heart fa-xs" style="color: #fb0909; cursor: pointer;" v-else @click="movieLike(movie.id)"></i>
        </h1> 
        <p><i class="fa-solid fa-heart fa-xs" style="color: #fb0909;"></i> {{ movie.like_users_count }}명이 이 영화를 좋아합니다.</p>
        
        <br>
        <p class="overview ">{{ movie.overview }}</p>
        <p class="fs-6 fw-semibold">
        <i class="fa-sharp fa-solid fa-star" style="color: #ff2929;"> </i> {{movie.vote_average}} / 10 점 <button :class="{'btn-danger text-white':movie.is_movie_watch,'btn-outline-danger':!movie.is_movie_watch }" class='ms-4 btn' @click="userwatch(movie.id)">I watch</button></p>
        <p>{{ movie.user_watch_count }}명이 이 영화를 관람했습니다.</p>
        <br>

       
    <div class="youtube">
    <iframe
    :src="video"
    frameborder="0">
    </iframe>
    </div>

  </div>
 
  </div>

    
    
    <div>
      <br>
      <hr class="text-white">

      <div class="d-flex bottom">
        <div class="col-3 director">
          <h2 class="text-center text-white actor-text" text-white actor-text>Director</h2>
          <br>
          <div class="text-center">
        <img class="actor m-1" :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${director.profile_path}`" alt="">
          <h5 class="text-white  ">{{director.name}}</h5>  
      </div>
        </div>

        <div class="col-9">
          <h2 class="text-center text-white actor-text">Actors</h2>
          <br>
          <div class="d-flex justify-content-around mb-5">
          <div v-for="actor in actors"
          :key="actor.id"
          class="text-center">
          <img class="actor m-1" :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${actor.profile_path}`" alt="">
          <h5 class="text-white  ">{{actor.name}}</h5>  
      </div>
      </div>
        </div>
      </div>
      <br>
      </div>
    </div>
</template>

<script>

export default {
  name:'DetailMovieItems',
  props: {
    movie: Object,
  },
  data() {
    return {
      videoURL: null,
    }
  },
  computed: {
    video() {
      return `https://www.youtube.com/embed/${this.$store.state.videoId}`
    },
    actors(){
      return this.$store.state.actors
    },
    director() {
      return this.$store.state.director
    },
  },
  methods: {
    getVideo() {
      this.$store.dispatch('getVideo')
    },
    userwatch(id){
      this.$store.dispatch('userWatch',id)
    },
    movieLike(id) {
      this.$store.dispatch('movieLike',id)

    }
  },

}
</script>

<style scoped>

.director{
  border-right: solid rgba(255, 255, 255, 0.281) 1px;
}
.top{
  max-height: 750px;
}
iframe{
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
 
}
.youtube{
  position: relative;
    padding-top: 56%;
    width: 100%;
    height: 0;
}
.img{
  min-width: 85%;
  min-height: 85%;
  max-height: 760px;
  border-radius: 3%;
}
.actor{
  max-width: 110px;
  border-radius: 45%;
}
.main{
  border: 3px double #ffc815b2;
  box-shadow: 8px 5px 8px rgba(0, 0, 0, 0.555);
  border-radius:10%;
  margin: 1px;
  min-height: 820px; /* 최소한의 높이 설정 */
  height: auto; /* 높이를 자동으로 조정 */
  /* 추가적인 스타일 설정 가능 */
}
.overview{
  height:fit-content ;
}
.actor-text{
  text-shadow: -0.05rem 0px #eee7d0c4, 0px 0.05rem #eee7d0c4, 0.05rem 0px #eee7d0c4, 0px -0.05rem #eee7d0c4;
}

</style>