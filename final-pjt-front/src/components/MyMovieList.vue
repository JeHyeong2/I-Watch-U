<template>
  <div>
   <div class="row mt-4 ms-4 me-4 mb-4 justify-content-center" style="cursor: pointer;">
     <div class="ih-item square effect6 bottom_to_top">
       <a v-if="username === this.$route.params.username" data-bs-toggle="modal" :data-bs-target="`#exampleModal${diary.id}`">
       <div class="img">
         <img :src="src" alt="img">
       </div>
     <div class="info">
       <h3>{{diary.movie.title}}</h3>
       <p >{{diary.movie.overview}}</p>
       <p class="fs-6 fw-semibold">&nbsp;&nbsp;
       <i class="fa-sharp fa-solid fa-star" style="color: #ff2929;"></i>{{ diary.movie.vote_average }} / 10 점</p>
       </div>
       <hr>
      </a>    

       <a v-else-if="diary.is_open" data-bs-toggle="modal" :data-bs-target="`#reviewModal${diary.id}`">
        <div class="img">
         <img :src="src"  alt="img">
       </div>
     <div class="info">
       <h3>{{diary.movie.title}}</h3>
       <p >{{diary.movie.overview}}</p>
       <p class="fs-6 fw-semibold">&nbsp;&nbsp;
       <i class="fa-sharp fa-solid fa-star" style="color: #ff2929;"></i>{{ diary.movie.vote_average }} / 10 점</p>
       </div>
       </a>
       <img v-else src="@/assets/wwww.jpg" alt="">
     </div>
     <div class="d-flex justify-content-center rvbtn">
       <a v-if="username === this.$route.params.username" class="btn btn-outline-warning text-white" data-bs-toggle="modal" :data-bs-target="`#reviewModal${diary.id}`">내가 작성한 리뷰</a>
      </div>
   </div>

<!-- 글쓴유저 -->
   <div class="modal fade" :id="`exampleModal${diary.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog ">
   <div class="modal-content">
     <div class="modal-header bg-black text-warning">
       <h5 class="modal-title" id="exampleModalLabel">{{ diary.movie.title }}</h5>
     </div>
     <div class="modal-body bg-black">
       <form>
        <div class="mb-3">
          <p class="fw-semibold text-warning">관람인원</p>
           <input type="text" name="people" v-model="people">
         </div>
         <div class="mb-3">
          <p class="fw-semibold text-warning">감상평</p>
           <textarea name="" id="" cols="53" rows="4" v-model="content"></textarea>
         </div>
         <div class="mb-3">
           <label for="message-text" class="col-form-label text-warning">관람일자</label>
           <input type="date" class="form-control" id="message-text" v-model="date">
         </div>
         <div class="mb-3">
           <label for="message-text" class="col-form-label text-warning">score</label>
           <input type="number" min="0" max="10" step='0.5' class="form-control" id="message-text" v-model="score">
         </div>
         <div class="form-check form-switch form-check-reverse mb-3">
            <input class="form-check-input" type="checkbox" :id="`flexSwitchCheckReverse${diary.id}`" :checked="open">
            <label class="form-check-label text-warning" for="flexSwitchCheckReverse">공개여부</label>
          </div>
       </form>
     </div>
     <div class="modal-footer bg-black">
       <button type="button" class="btn btn-dark" data-bs-dismiss="modal">닫기</button>
       <button type="button" class="btn btn-outline-warning" @click="createDiary(diary.id)">리뷰 저장하기</button>
     </div>
   </div>
 </div>
</div>


<!-- 다른유저 -->
<div class="modal fade" :id="`reviewModal${diary.id}`" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
 <div class="modal-dialog ">
   <div class="modal-content">
     <div class="modal-header bg-black text-warning">
       <h5 class="modal-title" id="reviewModalLabel">{{ diary.movie.title }}</h5>
     </div>
     <div class="modal-body bg-black">
       <form>
        <div class="mb-3 ">
           <label for="message-text" class="col-form-label text-warning">관람일자</label>
           <p class="text-white">{{diary.date}}</p>
         </div>
        <div class="mb-3">
          <p class="fw-semibold text-warning">관람인원</p>
           <p class="text-white"> {{diary.people}} </p>
         </div>
         <div class="mb-3">
          <h5 class="fw-semibold text-warning">감상평</h5>
          <p class="text-white"> {{ diary.content }} </p>
         </div>
         <div class="mb-3">
           <label for="message-text" class="col-form-label text-warning">score</label>
           <p class="text-white"> <i class="fa-sharp fa-solid fa-star" style="color: #ff2929;"> </i>{{diary.score}} /10</p>
         </div>
          <div class="mb-3 text-center">

            <i v-if="!diary.is_diary_like" @click="diaryLike(diary.id)"    class="btn fa-regular fa-thumbs-up"  style="color: #c54120;"><span class="text-white">당신의 리뷰가 좋아요</span></i>

            <i v-else @click="diaryLike(diary.id)"    class="btn fa-solid fa-thumbs-up"  style="color: #c54120;"><span class="text-white">당신의 리뷰가 좋아요</span></i>

          </div>
          
          <div class="text-center">
            <p class="text-white">총 {{ diary.diary_like_count }} 명이 이 리뷰를 좋아합니다.</p>
          </div>

       </form>
     </div>
     <div class="modal-footer bg-black">
      <button type="button" data-bs-dismiss="modal" class="btn btn-outline-warning" @click="$router.push(`/movie/${diary.movie.id}`)">이 영화 내용보기</button>
      <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
     </div>
   </div>
 </div>
</div>





 </div>
</template>

<script>
export default {
 name:'MyMovieList',
 props: {
   diary: Object
 },
 data() {
  return {
    people: this.diary.people,
    content: this.diary.content,
    score: this.diary.score,
    date: this.diary.date,
    open: this.diary.is_open
  }
 },
 computed: {
  username() {
    return this.$store.state.account.username
  },
  user() {
    if (this.$route.params.username === this.username) {
      return true
    }
    else {
      return false
    }
  },
  src() {
    if (this.user|| this.diary.is_open) {
      return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${this.diary.movie.poster_path}`
    }
    else {
      return {url:('@/assets/bbbb.avif')}
    }
  },

 },
 watch: {
  score() {
    if (this.score > 10) {
      alert('점수는 10점이 최대입니다.')
      this.score = 10
    }
    else if (this.score < 0) {
      alert('점수는 0점이 최소입니다.')
      this.score = 0
    }
  },
  date() {
    const t_date = new Date(this.date)
    const today = new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2)
    const day = ('0' + today.getDate()).slice(-2)
    const dateString = year + '-' + month  + '-' + day
    if (t_date > today) {
      alert(`${dateString} 이전의 날짜만 선택 가능합니다.`)
    }
  }
 },
 methods: {
   createDiary(id) {
    const checkbox_id = `flexSwitchCheckReverse${this.diary.id}`
    const checkbox = document.getElementById(checkbox_id)

      const people = this.people
      const content = this.content
      const score = this. score
      const date = this.date
      const is_open = checkbox.checked
      const username = this.username
      const payload = {people, content, score, date, is_open, username, id}

      this.$store.dispatch('createDiary', payload)
   },
   diaryLike(id) {
    const username = this.$route.params.username
    const payload = {username, id}
    this.$store.dispatch('diaryLike', payload)
   },

 },
}
</script>

<style scoped>
.rvbtn{
  max-height: 35px;
}
.modal-content{
  border: 3px double rgb(223, 222, 222);
}
div a{
  text-decoration-line: none;
}
.ih-item {

  position: relative;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}

.ih-item * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  box-shadow: 1px 2px 3px rgba(209, 200, 200, 0.103);
}
.ih-item a {
  color: #333;
}
.ih-item a:hover {
  text-decoration: none;
}
.ih-item img {
  width: 100%;
  height: 130%;
  /* border-radius:10%; */
  border: 5px groove #0808088e;

  
}


.ih-item.square {
  position: relative;
  width: 100%;
  height: 130%;
  /* border: 3px inset rgba(0, 0, 0, 0.055);
  box-shadow: 4px 4px 4px  rgba(0, 0, 0, 0.555); */
  border-radius:8%;
  
}
.ih-item.square .info {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}


.ih-item.square.effect6 {
  overflow: hidden;
}
.ih-item.square.effect6.colored .info {
  background: #1a4a72;
  background: rgba(26, 74, 114, 0.6);
}
.ih-item.square.effect6.colored .info h3 {
  background: rgba(12, 34, 52, 0.6);
}
.ih-item.square.effect6 .img {
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
}
.ih-item.square.effect6 .info {
  background: #333333;
  background: rgba(0, 0, 0, 0.6);
  visibility: hidden;
  opacity: 0;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.ih-item.square.effect6 .info h3 {
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  font-size: 17px;
  padding: 5px;
  background-color: rgba(97, 86, 86, 0.226);
  margin: 30px 0 5px 0;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
  overflow: hidden;  		
  text-overflow: ellipsis;  	
  white-space: nowrap; 		
  word-break:break-all
}
.ih-item.square.effect6 .info p {
  font-style: italic;
  font-size: 13px;
  position: relative;
  color: #bbb;
  padding: 20px 20px 20px;
  text-align: center;
  -webkit-transition: all 0.35s 0.1s linear;
  -moz-transition: all 0.35s 0.1s linear;
  transition: all 0.35s 0.1s linear;
  height: 10.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; 
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
.ih-item.square.effect6 a:hover .img {
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -ms-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}
.ih-item.square.effect6 a:hover .info {
  visibility: visible;
  opacity: 1;
}

.ih-item.square.effect6.from_top_and_bottom .info h3 {
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
  -ms-transform: translateY(-100%);
  -o-transform: translateY(-100%);
  transform: translateY(-100%);
}
.ih-item.square.effect6.from_top_and_bottom .info p {
  -webkit-transform: translateY(100%);
  -moz-transform: translateY(100%);
  -ms-transform: translateY(100%);
  -o-transform: translateY(100%);
  transform: translateY(100%);
}
.ih-item.square.effect6.from_top_and_bottom a:hover .info h3,
.ih-item.square.effect6.from_top_and_bottom a:hover .info p {
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  transform: translateY(0);
}

.ih-item.square.effect6.from_left_and_right .info h3 {
  -webkit-transform: translateX(-100%);
  -moz-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  -o-transform: translateX(-100%);
  transform: translateX(-100%);
}
.ih-item.square.effect6.from_left_and_right .info p {
  -webkit-transform: translateX(100%);
  -moz-transform: translateX(100%);
  -ms-transform: translateX(100%);
  -o-transform: translateX(100%);
  transform: translateX(100%);
}
.ih-item.square.effect6.from_left_and_right a:hover .info h3,
.ih-item.square.effect6.from_left_and_right a:hover .info p {
  -webkit-transform: translateX(0);
  -moz-transform: translateX(0);
  -ms-transform: translateX(0);
  -o-transform: translateX(0);
  transform: translateX(0);
}

.ih-item.square.effect6.top_to_bottom .info h3 {
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
  -ms-transform: translateY(-100%);
  -o-transform: translateY(-100%);
  transform: translateY(-100%);
}
.ih-item.square.effect6.top_to_bottom .info p {
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
  -ms-transform: translateY(-100%);
  -o-transform: translateY(-100%);
  transform: translateY(-100%);
}
.ih-item.square.effect6.top_to_bottom a:hover .info h3,
.ih-item.square.effect6.top_to_bottom a:hover .info p {
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  transform: translateY(0);
}

.ih-item.square.effect6.bottom_to_top .info h3 {
  -webkit-transform: translateY(100%);
  -moz-transform: translateY(100%);
  -ms-transform: translateY(100%);
  -o-transform: translateY(100%);
  transform: translateY(100%);
}
.ih-item.square.effect6.bottom_to_top .info p {
  -webkit-transform: translateY(100%);
  -moz-transform: translateY(100%);
  -ms-transform: translateY(100%);
  -o-transform: translateY(100%);
  transform: translateY(100%);
}
.ih-item.square.effect6.bottom_to_top a:hover .info h3,
.ih-item.square.effect6.bottom_to_top a:hover .info p {
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  transform: translateY(0);
}

@media(max-width: 767px) {
  .ih-item.square.effect6 .info h3 {
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  font-size: 40px;
  padding: 5px;
  background-color: rgba(97, 86, 86, 0.226);
  margin: 60px 0 35px 0;
  -webkit-transition: all 0.35s ease-in-out;
  -moz-transition: all 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
  overflow: hidden;  		
  text-overflow: ellipsis;  	
  white-space: nowrap; 		
  word-break:break-all
}
.ih-item.square.effect6 .info p {
  margin-bottom: 50px ;
  font-style: italic;
  font-size: 23px;
  position: relative;
  color: #bbb;
  padding: 20px 20px 20px;
  text-align: center;
  -webkit-transition: all 0.35s 0.1s linear;
  -moz-transition: all 0.35s 0.1s linear;
  transition: all 0.35s 0.1s linear;
  height: 13em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; 
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}

.ih-item{
  min-width: 450px;
}
}
</style>