<template>
  <div class="container">
    <br>
    <div class=" mt-2 ms-3 me-3 mb-5 rounded"><span><h2 class="text-center text-warning "><strong><i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i> {{ message }}</strong></h2></span></div>
    <br>
    <p class="\ text-center text-white">좋아요<i class=" fa-regular fa-thumbs-up " style="color: #c54120;"></i>, 싫어요<i class="fa-regular fa-thumbs-down" style="color: #162492;"></i> 로 당신의 공감을 표현 해보세요.</p>
    <br>
    <hr class="text-white">
    <div class="row row-cols-1 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4 ">
    <SearchMovieDetail
    v-for="(movie,idx) in movies"
    :key="`all-${idx}`"
    :result_movie ='movie'
    />
    </div>
  </div>
</template>

<script>
import SearchMovieDetail from '@/components/SearchMovieDetail'
export default {
  name:'AllMovieView',
  components:{
    SearchMovieDetail
  },
  computed: {
    movies() {
    return this.$store.state.movie_results
    },
    keyword() {
      return this.$route.params.keyword
    },
    message() {
      return this.$store.state.message
    }
  },

  }

</script>

<style>

</style>