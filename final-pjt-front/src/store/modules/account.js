import axios from 'axios'
import router from '@/router'

const account = {
  namespaced: true,
  state: {
    token: null,
    username: null
  },
  getters: {
    isLogin(state) {
      return state.token ? true:false
    }
  },
  mutations: {
    LOGIN(state, data) {
      state.token = data.token
      state.username = data.username
      router.push({name:'home'})
    },
    SAVE_TOKEN(state, data) {
      state.token = data.token
      state.username = data.username
      router.push({name:'home'})
    },
    LOGOUT(state, token) {
      state.token = token
      state.username = null
      router.push({name:'home'})
      localStorage.clear()
    }
  },
  actions: {
    login(context, payload) {
      const username = payload.username
      const password = payload.password

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/login/',
        data: {username, password}
      })
      .then((res) => {
        const payload = {username, token:res.data.key}
        console.log(res.data)
        context.commit('LOGIN', payload)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    signup(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: {username, password1, password2}
      })
      .then((res) => {
        const payload = {username, token:res.data.key}
        context.commit('SAVE_TOKEN', payload)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    logout(context) {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/logout/'
      })
      .then((res) => {
        context.commit('LOGOUT', res.data.key)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}

export default account