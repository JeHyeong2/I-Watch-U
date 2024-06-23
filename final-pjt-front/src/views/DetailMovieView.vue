<template>
  <div class="container">
    <div class="detail mt-2 ms-3 me-1 mb-5">
      <detail-moive-items
      :movie="movie"/>
      
  </div>
  <br>
  <hr class="text-white">
  <br>
  <h2 class="text-warning ms-4">Comment</h2>
  <span class="text-white ms-4">욕설,비방은 삼가해 주세요. 건전한 문화를 함께 만들어 갑시다.</span>
  <div class="ms-5 me-5 mb-5 comment rounded">
    <community-item
    :id="id"/>
  </div>
</div>
</template>

<script>
import CommunityItem from '@/components/DetailMovieView/CommunityItem.vue'
import DetailMoiveItems from '@/components/DetailMovieView/DetailMoiveItems.vue'


export default {
  name:'DetailMovieView',
  components: { 
    CommunityItem, 
    DetailMoiveItems },
  computed: {
    movie() {
      return this.$store.state.movie
    },
    id() {
      return this.$route.params.movieid
    }
  },
  methods: {
    getmovie() {
      const id = this.$route.params.movieid
      this.$store.dispatch('getMovie', id)
    },
    getactors(){
      const id = this.$route.params.movieid
      this.$store.dispatch('getActors', id)
    }
    
  },
  created() {
    this.getmovie()
    this.getactors()
  }
}
</script>

<style scoped>
.detail{
  background-color: rgb(0, 0, 0);
  border-radius: 1%
}
.comment{
  background-color: #efeef3;
 
}
.container{
  max-width: 90%;
  min-width: 800px;
}
</style>