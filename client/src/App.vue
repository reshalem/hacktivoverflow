<template>
    <div id="app">
        <nav class="navbar navbar-expand-sm navbar-light mb-5 mt-2">
            <div class="container">
                <a id="home-nav" class="navbar-brand text-secondary">
                    H<i class="fab fa-xing"></i>-<i class="fab fa-servicestack"></i>
                </a>
                <button class="navbar-toggler" data-toggle="collapse" data-target="div-main-nav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="div-main-nav">
                    <ul class="navbar-nav font-weight-bold ml-auto" id="main-nav">
                        <li class="nav-item mr-2">
                            <router-link id="nav-link-btn" to="/questions" class="nav-link">
                                Questions
                                <i class="far fa-question-circle ml-1"></i>
                            </router-link>
                        </li>
                        <li class="nav-item dropdown mr-2" v-if="!isLogin">
                            <router-link id="nav-link-btn" to="/register" class="nav-link">
                                Register
                                <i class="fas fa-scroll ml-1"></i>
                            </router-link>
                        </li>
                        <li class="nav-item dropdown mr-2" v-if="!isLogin">
                            <router-link id="nav-link-btn" to="/" class="nav-link">
                                Login
                                <i class="fas fa-user-astronaut ml-1"></i>
                            </router-link>
                        </li>
                        <li class="nav-item mr-2" v-if="isLogin">
                            <router-link id="nav-link-btn" to="/profile" class="nav-link">
                                Profile
                                <i class="fas fa-user-injured ml-1"></i>
                            </router-link>
                        </li>
                        <li class="nav-item dropdown mr-2" v-if="isLogin">
                            <a class="nav-link" @click="logout" style="cursor: pointer">
                                Log Out
                                <i class="fas fa-sign-out-alt ml-1"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <router-view :checktoken="checkToken" :isLogin="isLogin" @sendEmail="updateEmail($event)" :userEmail="userEmail"/>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false,
      userEmail: ''
    }
  },
  methods: {
      checkToken: function() {
          let token = localStorage.getItem('token')
          if (token) {
              this.isLogin = true
          } else {
              this.isLogin = false
              this.$router.push('/')
          }
      },
      logout: function() {
          localStorage.clear()
          this.checkToken()
          this.$router.push('/')
          var auth2 = gapi.auth2.getAuthInstance()
          auth2.signOut().then(function () {
            console.log('User signed out.')
          });
      },
      updateEmail: function(value) {
          this.userEmail = value
      }
  },
  created() {
        this.checkToken();
        this.userEmail = localStorage.getItem('email');
  },
  watch: {
    isLogin() {
      this.checkToken()
    }
  }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    width: 250px;
    padding: 10px;
}

#top-nav {
    background-color: #133337 !important;
    /* background-color: #005744; */
}

#home-nav {
    /* font-family: 'Oswald', sans-serif; */
    font-family: 'Roboto Slab', serif;
    font-size: 30px;
    cursor: pointer;
}

#search-nav {
    border-color: #cccccc;
    -webkit-box-shadow: none;
    box-shadow: none;
}

#main-nav {
    font-family: Lato;
    font-size: 18px;
}

#nav-link-btn {
    /* background-color: #11a29a; */
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

#comment-symbol {
    font-size: 20px;
}

.link_active {
    outline: 0;
}

.myLink {
    outline: 0;
}

@media (min-width: 34em) {
    .card-columns {
        -webkit-column-count: 2;
        -moz-column-count: 2;
        column-count: 2;
    }
}

#btn-post:hover {
    background-color: #ffa500;
    color: white;
}

#btn-post {
    background-color: #133337;
    color: white;
}

#span-comment {
    font-size: 18px;
}
</style>