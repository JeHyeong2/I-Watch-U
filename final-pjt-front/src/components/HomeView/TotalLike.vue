<template>
  <div>
    <div class="justify-content-center d-flex">
    <div class="col-12 carpet text-center d-flex justify-content-center  rounded">
      <div class="col-11 incar m-4 rounded">
      
        <div v-if="rank1" class="mt-4 ms-5 me-5 text-dark d-flex justify-content-center align-items-center rounded gold">
        <p class="me-5"></p>
        <h5 class="me-3 fw-semibold" style="margin-bottom: 0px;"><i class="fa-solid fa-medal fa-xl" style="color: #f8d557;" ></i>1위</h5>
        
        <div class="d-flex-col me-2 col-2">
          <p class="fs-5 namebox fw-semibold"> {{ rank1[0] }} </p>
          <a class="namebox btn btn-outline-dark" :href="`http://localhost:8080/mymovie/${rank1[0]}`">{{ rank1[0] }} 의 리뷰 보러가기</a>
        </div>
        <p class="fw-semibold" style="margin-bottom: 0px;" >받은 <span class="text-danger"><i class="fa-regular fa-thumbs-up fa-beat-fade" style="color: #f73b3b;"></i> 좋아요</span>  갯수 : {{ rank1[1] }}</p>
      </div>

      <br>
      <div v-if="rank2" class=" ms-5 me-5 text-dark d-flex justify-content-center align-items-center  rounded silver">
        <div></div>
        <p class="me-5"></p>
        <h5 class="me-3 fw-semibold" style="margin-bottom: 0px;"><i class="fa-solid fa-medal fa-xl" style="color: #ebe7e7;" ></i>2위</h5>
        
        <div class="d-flex-col me-2 col-2">
          <p class="fs-5 namebox fw-semibold"> {{ rank2[0] }} </p>
          <a class="namebox btn btn-outline-dark" :href="`http://localhost:8080/mymovie/${rank2[0]}`">{{ rank2[0] }} 의 리뷰 보러가기</a>
        </div>
        <p class="fw-semibold" style="margin-bottom: 0px;" >받은 <span class="text-danger"><i class="fa-regular fa-thumbs-up fa-beat-fade" style="color: #f73b3b;"></i> 좋아요</span>  갯수 : {{ rank2[1] }}</p>
      </div>
      <br>

      <div v-if="rank3" class=" ms-5 me-5 mb-4 text-dark d-flex justify-content-center align-items-center rounded cooper">
        <p class="me-5"></p>
        <h5 class="me-3 fw-semibold" style="margin-bottom: 0px;"><i class="fa-solid fa-medal fa-xl" style="color: brown;" ></i>3위</h5>
        
        <div class="d-flex-col me-2 col-2">
          <p class="fs-5 namebox fw-semibold"> {{ rank3[0] }} </p>
          <a class="namebox btn btn-outline-dark" :href="`http://localhost:8080/mymovie/${rank3[0]}`">{{ rank3[0] }} 의 리뷰 보러가기</a>
        </div>
        <p class="fw-semibold" style="margin-bottom: 0px;" >받은 <span class="text-danger"><i class="fa-regular fa-thumbs-up fa-beat-fade" style="color: #f73b3b;"></i> 좋아요</span>  갯수 : {{ rank3[1] }}</p>
      </div>
    </div>
  </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name:'TotalLike',
  computed: {
    rank1() {
      const rank = this.$store.state.rank
      if (rank.rank[0]) {
        return rank.rank[0]
      }
      else {
        return null
      }
    },
    rank2() {
      const rank = this.$store.state.rank
      if (rank.rank[1]) {
        return rank.rank[1]
      }
      else {
        return null
      }
    },
    rank3() {
      const rank = this.$store.state.rank
      if (rank.rank[2]) {
        return rank.rank[2]
      }
      else {
        return null
      }
    },
  }
}
</script>

<style scoped>
.namebox{
  margin-bottom: 1px;
  text-decoration-line: none;
  font-size: small;
}
a.namebox{
  margin-bottom: 1px;
  text-decoration-line: none;
  padding: 5px 5px;
  color: rgb(247, 58, 58);
  font-weight: bold;
}
a.namebox:hover{
  color:rgb(255, 255, 255)
}
.carpet{
  /* background-image: url('@/assets/carpet.jpg'); */
  background-color: #efeef300;
}
.incar{
  background-color: rgba(255, 255, 255, 0);
}

.gold{
  background-image: url('@/assets/gold.jpg');
}
.silver{
  background-image: url('@/assets/silver.jpg');
}

.cooper{
  background-image: url('@/assets/cooper.jpg');
}
</style>