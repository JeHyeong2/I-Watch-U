<template>
  
  <div id="carouselExampleControls2" class="carousel slide " data-bs-ride="carousel">
   
    <div class="carousel-inner">
     <div v-for="(group, groupIndex) in groupedMovies" :key="groupIndex" class="carousel-item " :class="{ 'active': groupIndex === activeSlide }">
      
       <div class="row justify-content-around">
         <div v-for="(movie, index) in group" :key="index" class="col-4   col-xl-2">
           <div class="ih-item square effect6 bottom_to_top mb-1">
       <router-link :to="{name:'detail', params:{movieid:movie.id}}">
     
         <img :src="`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`" alt="img">
      
     <div class="info">
       <h3>{{movie.title}}</h3>
       <p >{{movie.overview}}</p>
       &nbsp;&nbsp;
       <i class="fa-sharp fa-solid fa-star" style="color: #ff2929;"><span class="fs-6 text-white">{{ movie.vote_average }}/10 점</span></i>
       </div></router-link>
     </div>
     <div class="mb-2 mt-2 text-white">
        <h5 class="fw-semibold"><i class="fa-solid fa-rss fa-rotate-270" style="color: #ff0000;"></i>{{movie.title}}</h5>
        <p>개봉일 {{ movie.released_date }}</p>
      </div>
         </div>
       </div>
     </div>
   </div>

   <div class="carousel-control carousel-control-prev">
     <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls2" data-bs-slide="prev" @click="prevSlide">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
       <span class="visually-hidden">Previous</span>
     </button>
   </div>

   <!-- 오른쪽 다음 버튼 -->
   <div class="carousel-control carousel-control-next">
     <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls2" data-bs-slide="next" @click="nextSlide">
       <span class="carousel-control-next-icon" aria-hidden="true"></span>
       <span class="visually-hidden">Next</span>
     </button>
   </div>
 </div>
</template>

<script>
export default {
 name: 'RecommendMovie',
 data() {
   return {
     activeSlide: 0,
     moviesPerSlide: 5, // 한 슬라이드당 표시할 영화 개수
   };
 },
 computed: {
   movies() {
     return this.$store.state.re_movies;
   },
   groupedMovies() {
     // 영화를 그룹으로 나누기 위한 계산된 속성
     const groups = [];
     const totalSlides = Math.ceil(this.movies.length / this.moviesPerSlide);
     for (let i = 0; i < totalSlides; i++) {
       const start = i * this.moviesPerSlide;
       const end = start + this.moviesPerSlide;
       groups.push(this.movies.slice(start, end));
     }
     return groups;
   },
 },
 created() {
   this.$store.dispatch('getMovies');
 },
 methods: {
   prevSlide() {
     this.activeSlide = (this.activeSlide - 1 + this.groupedMovies.length) % this.groupedMovies.length;
   },
   nextSlide() {
     this.activeSlide = (this.activeSlide + 1) % this.groupedMovies.length;
   },
 },
};
</script>

<style scoped>

.carousel-item {
 margin: 0; /* 슬라이드 간의 가로 간격을 없앰 */
}

.col-1 {
 padding: 0; /* 영화 요소 간의 가로 간격을 없앰 */
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
 height: auto;
 width: auto;
 min-width: 200px;
 max-height: 100%;
 max-width: 100%;
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
 /* height: 230px;
 width: 130px; */
 height: auto;
 width: auto;
 min-width: 200px;
 max-height: 100%;
 max-width: 100%;
 border-radius:10%;
}


.ih-item.square {
 height: auto;
 width: auto;
 min-width: 200px;
 max-height: 100%;
 max-width: 100%;
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
 font-size: 18px;
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
 font-size: 14px;
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
/* @media(max-width: 767px) {
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
} */
/* 이전 슬라이드 버튼 */


#carouselExampleControls2 {
 position: relative;
}

.carousel-control {
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
}

.carousel-control-prev {
 left: 0px;
}

.carousel-control-next {
 right: 0px;
}
</style>