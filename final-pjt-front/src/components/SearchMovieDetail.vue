<template>
  <div>
    <div>
    <div class="row mt-5 ms-4 me-4 justify-content-center ">
      <div class="ih-item square effect6 bottom_to_top">
        <router-link :to="{name:'detail', params:{movieid:result_movie.id}}">
          <div class="img"><img :src="`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${result_movie.poster_path}`" alt="img"></div>
      <div class="info">
        <h3>{{result_movie.title}}</h3>
        <p>{{result_movie.overview}}</p>
        <p class="fs-6 fw-semibold">&nbsp;&nbsp;
        <i class="fa-sharp fa-solid fa-star" style="color: #ff2929;"></i>{{ result_movie.vote_average }} / 10 점</p>
        </div></router-link>
      </div>
    </div>
  </div>
  </div>
  
</template>

<script>
export default {
  name:'SearchMovieDetail',
  props:{
    result_movie:Object
  },
  
}
</script>

<style scoped>

hr{
  color: white;
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
  border-radius:10%;
  border: 5px groove #c2aa4000;
  /* border-image: url('@/assets/zzzz.jpg') 2% repeat; */
  
}


.ih-item.square {
  position: relative;
  width: 100%;
  height: 130%;
  border: 1px inset rgba(0, 0, 0, 0.055);
  box-shadow: 4px 4px 4px  rgba(0, 0, 0, 0.555); 
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
  font-size: 28px;
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
  font-size: 16px;
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