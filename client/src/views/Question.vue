<template>
    <div>
        <div class="row mb-3">
            <div class="col-lg-9">
                <div class="d-flex flex-column">
                    <div class="card mb-3" v-if="isLogin">
                        <div class="card-body">
                            <p>Ask a question</p>
                            <form @submit.prevent="createQuestion()" class="mb-2">
                                <div class="form-group">
                                    <input type="text" v-model="createdQuestion.title" class="form-control" placeholder="Title">
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control" v-model="createdQuestion.description" id="message" rows="3" placeholder="Description"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block font-weight-bold">Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card">
                    <div class="card-header">Question List</div>
                    <div class="card-body">
                        <div class="d-flex flex-column justify-content-start">
                            <ul class="navbar-nav">
                                <li class="nav-item mb-3" v-for="question in questions">
                                    <router-link :to="{ name: 'id', params: { id: question._id }}">{{ question.title }}</router-link>
                                </li>
                            </ul>
                            <router-link class="" to="/questions">
                                See All Questions
                                <i class="far fa-question-circle ml-1"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <router-view :shouldUpdate="shouldUpdate" :isLogin="isLogin" :userEmail="userEmail" :getquestions="getQuestions" :checktoken="checktoken"></router-view>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Question',
    props: ['isLogin', 'userEmail', 'checktoken'],
    data() {
        return {
            questions: [],
            createdQuestion: {
                title: '',
                description: ''
            },
            shouldUpdate: 0,
            keyword: ''
        }
    },
    methods: {
        getQuestions: function() {
            axios({
                method: 'GET',
                url: `http://localhost:3000/questions`
            })
                .then((questions) => {
                    this.questions = questions.data
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        createQuestion: function() {
            axios({
                method: 'POST',
                url: `http://localhost:3000/questions/create`,
                data: {
                    title: this.createdQuestion.title,
                    description: this.createdQuestion.description
                },
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getQuestions()
                    this.createdQuestion = {}
                    this.shouldUpdate += 1
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    created() {
        this.getQuestions()
    },
    watch: {
        questions() {
            
        }
    }
}
</script>
