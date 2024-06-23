<template>
  <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 mt-5">
          <div class="card">
            <div class="card-header bg-black text-warning">
              <h3 class="text-center fw-bolder">Login</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="ID">ID</label>
                  <input type="ID" class="form-control" id="ID" placeholder="Enter ID" v-model="username">
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="Enter password"
                  v-model="password">
                </div>
                <button type="submit" class="btn btn-warning btn-block fw-semibold">Login</button>
                <hr>
              </form>
              <router-link class='link rounded fw-semibold' :to="{name:'signup'}">SignUp</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
  export default {
    name:'TheLogin',
    data() {
      return {
        username: null,
        password: null,
      }
    },
    methods: {
      login() {
        const username = this.username
        const password = this.password
        const payload = {username, password}
        
        this.$store.dispatch('account/login', payload)
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .login-container h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .btn-warning {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    text-align: center;
    background-color: #ffca18;
    border: none;
    color: black;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn:hover {
    color: white;
  }
  .card{
    height: 400px;
  }
  .link{
    padding: 8px;
    border: black;
    color: black; /* 링크의 색상 제거 */
    text-decoration-line: none;
    background-color: #ffca18;
  }
  .link:hover {
    color: white;
  }
  </style>