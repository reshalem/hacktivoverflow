<template>
    <div class="col-12">
        <Header></Header>
        <div class="col-lg-4 m-auto">
            <div class="card text-center card-form">
                <div class="card-body">
                    <h3>Login</h3>
                    <p>Please fill out this form to login</p>
                    <form @submit.prevent="login()">
                        <div class="form-group">
                            <input type="email" v-model="loginUser.email" class="form-control" placeholder="Email" autofocus>
                        </div>
                        <div class="form-group">
                            <input type="password" v-model="loginUser.password" class="form-control" placeholder="Password">
                        </div>
                        <input type="submit" value="Login" class="btn btn-block font-weight-bold" id="btn-login">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Login',
  props: ['checktoken'],
  components: {
      Header
  },
  data() {
      return {
          loginUser: {
              email: '',
              password: ''
          }
      }
  },
  methods: {
    login: function() {
        axios({
            method: 'POST',
            url: `http://localhost:3000/login`,
            data: {
                email: this.loginUser.email,
                password: this.loginUser.password
            }
        })
            .then((result) => {
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('email', this.loginUser.email)
                this.checktoken()
                this.$emit('sendEmail', this.loginUser.email)
                this.$router.push('/questions')
            })
            .catch((err) => {
                console.log(err)
            })
    }
  }
}
</script>

<style>
#btn-login {
    background-color: #F48024;
    color: white;
}
</style>
