import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import account from './modules/account'
import createpersistedstate from 'vuex-persistedstate'
import router from '@/router'

const API_URI = 'http://127.0.0.1:8000'
const API_KEY = 'AIzaSyCCaABSYWb1_SHEucf7RGlMe_ajTsecpZc'
const API_URL = 'https://www.googleapis.com/youtube/v3/search'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createpersistedstate()
  ],
  state: {
    movies: [],
    movie: null,
    movie_results: [],
    message: null,
    comments: [],
    best_comment: null,
    diaries: [],
    diary_like_cnt: null,
    videoId: null,
    actors:[],
    director: null,
    new_movies: [],
    genre: [],
    count: null,
    re_movies:[],
    all_comments: [],
    rank: []
  },
  getters: {
  },
  mutations: {
    GET_ACTORS(state, data) {
      state.actors = data.cast.slice(0,4)
      state.director = data.crew.find((el) => {
        return el.job === 'Director'
      })
    },
    GET_MOVIES(state, data) {
      state.movies = data
      state.new_movies = data.sort(function(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }).reverse().slice(0,30)
    },
    GET_MOVIE(state, data) {
      state.movie = data
      data.comment.map((comment) => {
        const date = comment.created_at
        let format = date.slice(0,10) + ' ' +date.slice(11,16)
        comment.created_at = format
      })
      state.comments = data.comment
      if (data.comment.every((el) => {
        return el.like_user_count === 0
      })) {
        state.best_comment = null
      }
      else {
      state.best_comment = data.comment.reduce( (prev, value) => {
        return prev.like_user_count - prev.dislike_user_count >= value.like_user_count - value.dislike_user_count ? prev : value
      });
    }
    },
    SEARCH_RESULT(state, keyword) {
      state.movie_results = state.movies.filter((el) => {
        return el.title.includes(keyword)
      })

      if (state.movie_results.length === 0) {
        state.message = '검색 결과가 없습니다.'
      }
      else {
        state.message = `'${keyword}'로 검색한 결과입니다.`
      }
      router.push({name:'search', params: {keyword:keyword}})

    },
    CREATE_COMMENT(state, data) {
      data.comment.map((comment) => {
        const date = comment.created_at
        let format = date.slice(0,10) + ' ' +date.slice(11,16)
        comment.created_at = format
      })
      
      state.comments = data.comment
      
    },
    SORTING(state) {
      state.comments = state.comments.sort(function(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }).reverse()
    },
    SORTING_LIKE(state) {
      state.comments = state.comments.sort(function(a, b) {
        return a.like_user_count - b.like_user_count;
      }).reverse()
    },
    SORTING_DISLIKE(state) {
      state.comments = state.comments.sort(function(a, b) {
        return a.dislike_user_count - b.dislike_user_count;
      }).reverse()
    },
    USER_WATCH(state, data) {
      state.movie = data
    },
    GET_DIARY(state, data) {
      state.diaries = data
      const cnt = data.reduce((acc,el) => acc+el.diary_like_count, 0)
      state.diary_like_cnt = cnt
    },
    UPLIKE(state,data) {
      data.comment.map((comment) => {
        const date = comment.created_at
        let format = date.slice(0,10) + ' ' +date.slice(11,16)
        comment.created_at = format
      })
      state.comments = data.comment
      if (data.comment.every((el) => {
        return el.like_user_count === 0
      })) {
        state.best_comment = null
      }
      else {
      state.best_comment = data.comment.reduce( (prev, value) => {
        return prev.like_user_count - prev.dislike_user_count >= value.like_user_count - value.dislike_user_count ? prev : value
      });
    }
    },
    DOWNLIKE(state,data) {
      data.comment.map((comment) => {
        const date = comment.created_at
        let format = date.slice(0,10) + ' ' +date.slice(11,16)
        comment.created_at = format
      })
      state.comments = data.comment
      if (data.comment.every((el) => {
        return el.like_user_count === 0
      })) {
        state.best_comment = null
      }
      else {
      state.best_comment = data.comment.reduce( (prev, value) => {
        return prev.like_user_count - prev.dislike_user_count >= value.like_user_count - value.dislike_user_count ? prev : value
      });
    }
    },
    GET_VIDEO(state, data) {
      state.videoId = data.id.videoId
    },
    CREATE_DIARY(state, data) {
      state.diaries = data
    },
    MOVIE_LIKE(state, data) {
      state.movie = data
    },
    DIARY_LIKE(state, data) {
      state.diaries = data
    },
    GET_RECOMMEND(state, data) {
      state.genres = data.genre
      state.count = data.count
      if (data.count >= 3) {
        const re_movies1 = state.movies.filter((el) => {
          const cnt_list = el.genres.filter((genre) => data.genre.includes(genre))
          const cnt = cnt_list.length
          return cnt === data.genre.length
        })
        const re_movies2 = state.movies.filter((el) => {
          const cnt_list = el.genres.filter((genre) => data.genre.includes(genre))
          const cnt = cnt_list.length
          return cnt === data.genre.length - 1
        })
        if (re_movies1.length > 30) {
          const re_movies = re_movies1.slice(30)
          console.log(re_movies.length)
          state.re_movies = re_movies
        }
        else {
          const reco_movies2 = re_movies2.slice(re_movies2.length - 30 +re_movies1.length)
          const re_movies = [...re_movies1, ...reco_movies2]
          state.re_movies = re_movies
        }
      }
    },
    GET_COMMENTS(state, data) {
      data.map((comment) => {
        const date = comment.created_at
        let format = date.slice(0,10) + ' ' +date.slice(11,16)
        comment.created_at = format
      })
      state.all_comments = data.sort(function(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }).reverse().slice(0,5)
    },
    GET_USER(state, data) {
      console.log(data)
      state.rank = data
    }
  },
  actions: {
    getActors(context, id) {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTZjNjZlZjAxZGIyN2FhMTViNzk3MDIzMmUyMWFmNCIsInN1YiI6IjYzZDMyNWEzYTQxMGM4MTFmOWUwOGNhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X6xh1H1Glf5RiT-ClmUCh80CvdFJtNdTeJeBqA0kJcs'
        }
      })
    .then((res) => {
    console.log(res.data)
    context.commit('GET_ACTORS',res.data)
    })
    .catch((err) => {
    console.log(err)
    })
    },
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URI}/movies/`
      })
      .then((res) => {
        context.commit('GET_MOVIES', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getMovie(context, id) {
      axios({
        method: 'get',
        url: `${API_URI}/movies/${id}/`,
        headers: {
          Authorization: `TOKEN ${context.state.account.token}`
        }
      })
      .then((res) => {
        context.commit('GET_MOVIE', res.data)
        this.dispatch('getTitle', res.data.id)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    createComment(context, payload) {
      const id = payload.id
      const content = payload.content

      axios({
        method: 'post',
        url: `${API_URI}/movies/${id}/comment/`,
        data: {content},
        headers: {
          Authorization: `TOKEN ${context.state.account.token}`
        }
      })
      .then((res) => {
        context.commit('CREATE_COMMENT', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    userWatch(context, id) {
      axios({
        method: 'post',
        url: `${API_URI}/movies/${id}/user_watched/`,
        headers: {
          Authorization: `TOKEN ${context.state.account.token}`
        }
      })
      .then((res) => {
        context.commit('USER_WATCH', res.data)
      })
    },
    getDiary(context, username) {
      axios({
        method: 'get',
        url: `${API_URI}/movies/mymovies/${username}/`,
        headers: {
          Authorization: `TOKEN ${context.state.account.token}`
        }
      })
      .then((res) => {
        context.commit('GET_DIARY', res.data)
      })
      .catch((err) => {
        alert('존재하지 않는 유저입니다.')
        router.push({name:'home'})
        console.log(err)
      })
    },
    upLike(context, payload) {
      const comment_pk = payload.id
      const movie_pk = payload.movie_pk
      
      axios({
        method: 'post',
        url: `${API_URI}/movies/${movie_pk}/comment/${comment_pk}/like/`,
        data: {movie_pk, comment_pk},
        headers: {
          Authorization: `TOKEN ${context.state.account.token}`
        }
      })
      .then((res) => {
        context.commit('UPLIKE', res.data)
      })
      .catch((err) => {
        alert('본인 댓글에는 좋아요를 할 수 없습니다.')
        console.log(err)
      })
    }, 
    downLike(context, payload) {
      const comment_pk = payload.id
      const movie_pk = payload.movie_pk
      
      axios({
        method: 'post',
        url: `${API_URI}/movies/${movie_pk}/comment/${comment_pk}/dislike/`,
        data: {movie_pk, comment_pk},
        headers: {
          Authorization: `TOKEN ${context.state.account.token}`
        }
      })
      .then((res) => {
        context.commit('DOWNLIKE', res.data)
      })
      .catch((err) => {
        alert('본인 댓글에는 싫어요를 할 수 없습니다.')

        console.log(err)
      })
    },
    getTitle(context, id) {
      axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTZjNjZlZjAxZGIyN2FhMTViNzk3MDIzMmUyMWFmNCIsInN1YiI6IjYzZDMyNWEzYTQxMGM4MTFmOWUwOGNhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X6xh1H1Glf5RiT-ClmUCh80CvdFJtNdTeJeBqA0kJcs'
          }
      })
      .then((res) => {
      this.dispatch('getVideo', res.data.original_title)
      })
      .catch((err) => {
      console.log(err)
      })
  },
    getVideo(context, query) {
      const keyword = query + 'trailer'
      const params = {key: API_KEY,
        part: 'snippet',
        type: 'video',
        q: keyword}
        axios({
            method: 'get',
            url: API_URL,
            params
        })
        .then((res) => {
        context.commit('GET_VIDEO',res.data.items[0])
        })
        .catch((err) => {
        console.log(err)
        })
    },
    createDiary(context, payload) {
    const people = payload.people
    const content = payload.content
    const date = payload.date
    const score = payload.score
    const username = payload.username
    const id = payload.id
    const is_open = payload.is_open
    const data = {people, content, date, score, is_open}

    axios({
      method: 'post',
      url: `${API_URI}/movies/mymovies/${username}/${id}/create/`,
      data,
      headers: {
        Authorization: `TOKEN ${context.state.account.token}`
      }
    })
    .then((res) => {
      alert('감상평이 작성되었습니다.')
      context.commit('CREATE_DIARY', res.data)
    })
    },
    movieLike(context, id) {
      axios({
        method: 'post',
        url: `${API_URI}/movies/${id}/like/`,
        headers: {
          Authorization: `TOKEN ${context.state.account.token}`
        }
      })
      .then((res) => {
        context.commit('MOVIE_LIKE', res.data)
      })
    },
    diaryLike(context, payload) {
      const username = payload.username
      const id = payload.id

      axios({
        method: 'post',
        url: `${API_URI}/movies/mymovies/${username}/${id}/like/`,
        headers: {
          Authorization: `TOKEN ${context.state.account.token}`
        }
      })
      .then((res) => {
        context.commit('DIARY_LIKE', res.data)
      })
      .catch((err)=> 
      {console.log(err)
      alert('자추는 추합니다.')}
      )
    },
    getRecommend(context) {
      axios({
        method: 'get',
        url: `${API_URI}/movies/recommend/`,
        headers: {
          Authorization: `TOKEN ${context.state.account.token}`
        }
      })
      .then((res) => {
        console.log(res.data)
        context.commit('GET_RECOMMEND', res.data)
      })
      .catch((err)=> console.log(err))
    },
    getComments(context) {
      axios({
        method: 'get',
        url: `${API_URI}/movies/comments/`,
      })
      .then((res) => {
        context.commit('GET_COMMENTS', res.data)
      })
      .catch((err)=> console.log(err))
    },
    getUser(context) {
      axios({
        method: 'get',
        url:`${API_URI}/accounts/user/`
      })
      .then((res) => {
        context.commit('GET_USER', res.data)
      })
    } 
  },
  modules: {
    account
  }
})
