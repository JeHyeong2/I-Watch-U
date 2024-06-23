<template>
  <div class="m-4 align-items-center">
    <div>
    <br>
    <p>전체 댓글   <span class="text-danger">{{ comments.length }}</span></p>
    <button @click="sorting" class="mb-3 btn btc">최신/등록순</button>
    <div class="d-flex mb-2">
      <button class="btn btn-outline-light" @click="sortingLike"><i class="fa-solid fa-flag fa-flip-horizontal  " style="color: #ec0909;"></i> <span class="text-danger align-self-center">찬성순</span></button>
      <button class="btn btn-outline-light" @click="sortingDislike"><span class="text-primary align-self-center">반대순</span> <i class="fa-solid fa-flag " style="color: #005eff;"></i>
      </button>
    </div> 
    <div class="form-floating d-flex justify-content-end align-items-end">
      <textarea class="form-control" id="floatingTextarea" placeholder="comments" style="height: 80px" v-model="content"></textarea>
     <label for="floatingTextarea">Comments</label>
    
    <form @submit.prevent="createcomment(id)">
      <!-- <input type="text" placeholder="댓글을 입력하세요" > -->
      <button class='btn btn-warning ms-3 ' type="submit">등록</button>
    </form>
    </div>
    </div>
    <hr>
    <div><i class="fa-solid fa-star fa-bounce fa-lg" style="color: #fbe44b;"></i><p class="text-danger fw-semibold">베스트 댓글</p>
    <div class=" m-3 rounded" style="background-color:rgb(249, 209, 209);" v-if="best_comment">
     <div class="fw-semibold ms-1 me-2 mb-1">작성자 : <span @click="userMovie(best_comment.username)" style="cursor:pointer" class="text-primary">{{ best_comment.username }}</span></div>
     <div class="ms-3 mb-1 d-flex justify-content-between">
      <span class="me-5">{{best_comment.content}}</span>
      <span class="ms-2 me-3 col-2 text-end">{{ best_comment.created_at }}</span>
    </div>
     <div>
      <i @click="uplike(best_comment.id)" class="btn fa-regular fa-thumbs-up " style="color: #c54120;"> {{ best_comment.like_user_count }}</i>
    <i @click="downlike(best_comment.id)" class="fa-regular fa-thumbs-down btn" style="color: #162492;"> {{ best_comment.dislike_user_count }}</i>
  </div>
    </div>
    <div v-else>아직 베스트 댓글이 없습니다.</div>
    </div>
    
    <hr>

    

    <div v-for="comment in comments"
    :key="comment.pk"
    class=" m-3 rounded" style="background-color: #ffffffe0;">
     <div class="fw-semibold ms-1 me-2 mb-1">작성자 : <span @click="userMovie(comment.username)" style="cursor:pointer" class="text-primary" >{{ comment.username }}</span></div>
     <div class="ms-3 mb-1 d-flex justify-content-between">
      <span class="me-5">{{comment.content}}</span>
      <span class="ms-2 me-3 col-2 text-end">{{ comment.created_at }}</span>
    </div>
     <div>
      <i @click="uplike(comment.id)" class="btn fa-regular fa-thumbs-up " style="color: #c54120;"> {{ comment.like_user_count }}</i>
    <i @click="downlike(comment.id)" class="fa-regular fa-thumbs-down btn" style="color: #162492;"> {{ comment.dislike_user_count }}</i>
  </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name:'CommunityItem',
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
      return this.$store.state.comments
    },
    best_comment() {
      return this.$store.state.best_comment
    }
  },
  methods: {
    createcomment(id) {
      if(!this.$store.state.account.token){
        alert('댓글을 남기시려면 로그인하세요.')
      }
      const content = this.content
      const payload = {id, content}
      console.log(payload)
      this.$store.dispatch('createComment', payload)
      this.content=null
    },
    sorting () {
      this.$store.commit('SORTING')
    },
    sortingLike () {
      this.$store.commit('SORTING_LIKE')
    },
    sortingDislike () {
      this.$store.commit('SORTING_DISLIKE')
    },
    uplike(id){
      if(!this.$store.state.account.token){
        alert('추천을 누르시려면 로그인하세요.')
      }
      const movie_pk = this.$route.params.movieid
      const payload ={id, movie_pk}
      this.$store.dispatch('upLike',payload)
    },
    downlike(id){
      if(!this.$store.state.account.token){
        alert('비추천을 누르시려면 로그인하세요.')
      }
      const movie_pk = this.$route.params.movieid
      const payload ={id,movie_pk}
      this.$store.dispatch('downLike',payload)
    },
    userMovie(username) {
      this.$router.push({name:'myMovie', params: {username:username}})
    }
  }
}
</script>

<style scoped>

.btc{
  background-color: rgba(48, 124, 48, 0.705);
  color:rgb(255, 255, 255);

}


</style>