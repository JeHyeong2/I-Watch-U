<template>

  <div class="container-fluid">
  
    <div class="mt-5 ms-3 me-3 mb-3 rounded">
    <span
    v-if="this.username === this.$store.state.account.username"
    ><h1 class="text-center text-warning"><strong>My Watch List </strong><i class="fa-solid fa-file-circle-check" style="color: #ffffff;"></i></h1></span>
    <span
    v-else
    ><h1 class="text-center text-warning"><strong>' <span class="text-white">{{ this.username }}</span> ' 님의 Watch List </strong><i class="fa-solid fa-file-circle-check" style="color: #ffffff;"></i></h1></span>
    
    <br>
        <h5 class="text-center text-white">{{this.$route.params.username}}님 의 리뷰가 {{ like_cnt }} 개의  <i class="fa-regular fa-thumbs-up"  style="color: #c54120;"></i> 공감을 받았습니다.</h5>
    </div>
    <!--  -->
    <br>
    <br>
    <br>
    <div class="d-flex justify-content-around">
    <h5 class="ms-4 text-white"><i class="fa-regular fa-comments" style="color: #ff0a0a;"></i> 자유롭게 리뷰를 남기고 공유해 보세요.</h5>
    <span class="justify-content-end text-white"> <h5>나만의 기록을 남겨 저장해 보세요. <i class="fa-regular fa-pen-to-square" style="color: #fecc43;"></i></h5> </span>
    </div>
    
    <br>
    <br>

    <div class="inn row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-5 g-4 ms-4 me-4  justify-content-start ">

    <MyMovieList
    v-for="diary in diaries"
    :key="diary.pk"
    :diary ="diary"
        
    />
    </div>
  </div>
   
</template>

<script>
import MyMovieList from '@/components/MyMovieList.vue'

export default {
    name: "MyMovieView",
    data() {
        return {
            image: null
        };
    },
    computed: {
        username() {
            return this.$route.params.username
        },
        diaries() {
            return this.$store.state.diaries;
        },
        like_cnt() {
    return this.$store.state.diary_like_cnt
  }
    },
    methods: {
        getDiary() {
            const username = this.username;
            this.$store.dispatch("getDiary", username);
        },
    },
    created() {
        this.getDiary();
    },
    components: { MyMovieList }
}
</script>

<style scoped>
.profile{
    width: 100%;
    height: 100%;
}
.inn{
  background-image: url('@/assets/blackwood.jpg');
  border-radius: 2%;
  min-height: 500px;
}
</style>