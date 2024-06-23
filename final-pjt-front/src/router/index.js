import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyMovieView from'@/views/MyMovieView'
import DetailMovie from '@/views/DetailMovieView'
import AllMovieView from'@/views/AllMovieView'
import LoginView from '@/views/LoginView'
import LogoutView from '@/views/LogoutView'
import SignupView from '@/views/SignupView'
import SearchMovieView from '@/views/SearchMovieView'
import NotFoundView from'@/views/NotFoundView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mymovie/:username/',
    name: 'myMovie',
    component:MyMovieView
  },
  {
    path: '/movie/:movieid/',
    name: 'detail',
    component:DetailMovie
  },
  {
    path: '/movie/',
    name: 'All',
    component:AllMovieView 
  },
  {
    path: '/login/',
    name: 'login',
    component:LoginView
  },
  {
    path: '/logout/',
    name: 'logout',
    component:LogoutView
  },
  {
    path: '/signup/',
    name: 'signup',
    component:SignupView
  },
  {
    path: '/search/:keyword/',
    name: 'search',
    component: SearchMovieView
  },
  {
    path: '/404/',
    name: 'NotFound404',
    component: NotFoundView
  },
  {
    path: '*',
    redirect: '/404'
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
