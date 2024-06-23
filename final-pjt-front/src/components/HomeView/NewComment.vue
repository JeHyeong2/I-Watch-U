<template>
  <div class=" align-items-center">
    <hr>
    <div v-for="comment in comments"
    :key="comment.pk"
    class=" m-3 rounded" style="background-color: #ffffffec;">
    <div class="mb-1">
      <a :href="`http://localhost:8080/movie/${comment.movie}`" class="fw-semibold fs-6"> &nbsp; 영화 제목:{{ comment.movie_title }}</a>  
    </div>
     <div class="fw-semibold ms-1 me-2 mb-1">작성자 : <span @click="userMovie(comment.username)" style="cursor:pointer" class="text-primary">{{ comment.username }}</span></div>
     <div class="ms-3 mb-1 d-flex justify-content-between">
      <span class="me-5">{{comment.content}}</span>
      <span class="ms-2 me-3 col-2 text-end">{{ comment.created_at }}</span>
    </div>
     <div class="ms-2">
      <i class=" fa-regular fa-thumbs-up " style="color: #c54120;"> {{ comment.like_user_count }}</i>
      &nbsp;
    <i class="fa-regular fa-thumbs-down " style="color: #162492;"> {{ comment.dislike_user_count }}</i>
  </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name:'NewComment',
  props: {
    id: String
  },
  data() {
    return {
      content: null,
    }
  },
  computed: {
    comments() {
      return this.$store.state.all_comments
    },
  },
  methods: {
    userMovie(username) {
      this.$router.push({name:'myMovie', params: {username:username}})
    }
  }
}
</script>

<style scoped>

.btc{
  background-color: rgba(48, 124, 48, 0.705);
  color:white;
}
a:hover{
  color: rgba(173, 147, 90, 0.692)
}
a{
  text-decoration-line: none;
  color: #eebc16;

}

</style>