<template>
 <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 mt-5">
        <div class="card">
          <div class="card-header bg-black text-warning">
            <h3 class="text-center fw-bolder">SignUp</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="signup">
              <div class="form-group">
                <label for="ID">ID</label>
                <input type="ID" class="form-control" id="ID" placeholder="Enter ID" v-model="username">
              </div>
              <div class="form-group">
                <label for="password1">Password</label>
                <input type="password" class="form-control" id="password1" placeholder="Enter password" v-model="password1">
              </div>
              <div class="form-group">
                <label for="password2">Password Check</label>
                <input type="password" class="form-control" id="password2" placeholder="Enter password check" v-model="password2">
              </div>
              <button type="submit" class="btn btn-warning btn-block  fw-semibold">SignUp</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'SignupView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null
    }
  },
  methods: {
    signup() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      const payload = {username, password1, password2}

      this.$store.dispatch('account/signup', payload)
    }
  }
}
</script>

<style>
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