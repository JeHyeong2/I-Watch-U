<template>
  <div class="container-fluid ">
    <div class="mt-5 mb-3  ">
      <h1 class=" text-center text-warning"><strong>All Movie List <i class="fa-solid fa-users-viewfinder" style="color: #ffffff;"></i></strong></h1>
      <br>
      <h5 class="text-center text-white mb-4">영화에 대한 자유로운 의견을 나눠 보세요. </h5>
      
    </div>
    <br>
    
    
    <p class="\ text-center text-white">좋아요<i class=" fa-regular fa-thumbs-up " style="color: #c54120;"></i>, 싫어요<i class="fa-regular fa-thumbs-down" style="color: #162492;"></i> 로 당신의 공감을 표현 해보세요.</p>
    <div class="d-flex justify-content-center mb-1">

    <hr class="col-10 text-white">
    </div>
    <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-5 g-4 ms-5 me-5 bgi rounded">
    <all-movie
    v-for="(movie,idx) in movies"
    :key="`all-${idx}`"
    :movie ='movie'
    />
    </div>
  </div>
</template>

<script>
import AllMovie from '@/components/AllMovie.vue'
export default {
  name:'AllMovieView',
  components:{
    AllMovie
  },
  computed: {
    movies() {
    return this.$store.state.movies
    }
  },
  methods: {
    getMoives() {
      this.$store.dispatch('getMovies')
    },
  },
  created() {
    this.getMoives()
  }
  }

</script>

<style scoped>
h2{
  box-shadow: 3px 5px 6px rgba(37, 37, 37, 0.541);
}
.bgi{
  /* background-image: url('@/assets/fil.png'); */
  /* border: double 7px rgba(0, 0, 0, 0.204); */
  
}
</style>