<template>
    <div class="row" v-if="isLogin">
        <div class="col-lg-5">
            <div class="d-flex flex-column">
                <div class="card mb-3">
                    <div class="card-header">User Profile</div>
                    <div class="card-body">
                        <img class="card-img-top img-fluid mb-4" v-bind:src="user.avatarURL" alt="">
                        <p>Username: {{user.username}}</p>
                        <p class="mb-0">Email: {{user.email}}</p>
                    </div>
                </div>
                <div class="card mb-5">
                    <div class="card-header">Your Question List</div>
                    <div class="card-body">
                        <div class="d-flex flex-column justify-content-start">
                            <ul class="navbar-nav">
                                <li class="nav-item mb-3" v-for="question in questions">
                                    <router-link :to="{ name: 'id', params: { id: question._id }}">{{ question.title }}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-7">
            <div class="d-flex flex-column">
                <div v-for="question in questions" class="card mb-4">
                    <div class="card-body">
                        <div v-if="isLogin && userEmail === question.poster.email" class="d-flex justify-content-end align-items-center mb-3">
                            <i class="fas fa-fingerprint text-danger mr-2" id="btn-fingerprint"></i>
                            Your Question
                        </div>
                        <h4 class="card-title text-left ml-3 mb-4">{{ question.title }}</h4>
                        <p class="card-text text-left ml-3 mb-4">{{ question.description }}</p>
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <div class="font-weight-bold ml-5">By {{ question.poster.username }}</div>
                            <i class="far fa-lightbulb mr-5" id="comment-symbol"></i>
                        </div>
                        <button class="btn btn-block font-weight-bold" id="btn-post" @click="goToLink(question._id)">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
    name: 'Profile',
    props: ['isLogin', 'userEmail', 'checktoken'],
    data() {
        return {
            questions: [],
            user: {},
            shouldUpdate: 0
        }
    },
    methods: {
        getUserProfile: function() {
            axios({
                method: 'GET',
                url: `${config.port}/users/profile`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((user) => {
                    this.user = user.data
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        goToLink: function(paramsId) {
            this.$router.push(`/questions/${paramsId}`)
        },
        getUserQuestion: function() {
            axios({
                method: 'GET',
                url: `${config.port}/questions/ownsquestion/user`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((questions) => {
                    this.questions = questions.data
                    console.log(questions)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    created() {
        this.getUserQuestion()
        this.getUserProfile()
    },
    mounted() {
        this.checktoken();
    }
}
</script>

<style>

</style>

