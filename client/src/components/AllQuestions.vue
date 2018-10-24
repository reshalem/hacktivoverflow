<template>
    <div class="">
        <div class="h2 mb-3 text-left">Questions Asked</div>
        <div v-for="question in questions" class="card mb-4">
            <div class="card-body">
                <div v-if="isLogin && userEmail === question.poster.email" class="d-flex justify-content-end align-items-center mb-4">
                    <i class="fas fa-fingerprint text-danger mr-2" id="btn-fingerprint"></i>
                    Your Question
                </div>
                <EditModal :questionId="question._id" :getquestions="getQuestions"></EditModal>
                <h4 class="card-title text-left mb-5">{{ question.title }}</h4>
                <p class="card-text text-left mb-5">{{ question.description }}</p>
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="font-weight-bold">From {{ question.poster.username }}</div>
                    <i class="far fa-lightbulb mr-1" id="comment-symbol"></i>
                </div>
                <button class="btn btn-block font-weight-bold" id="btn-post" @click="goToLink(question._id)">
                    Click to reply
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import EditModal from '@/components/EditModal.vue'

export default {
    name: 'AllQuestions',
    props: ['shouldUpdate', 'isLogin', 'userEmail', 'getquestions'],
    components: {
        EditModal
    },
    data() {
        return {
            questions: [],
            question: {
                title: '',
                description: ''
            }
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
                })
        },
        goToLink: function(paramsId) {
            this.$router.push(`/questions/${paramsId}`)
        },
        deleteQuestion: function(questionId) {
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/questions/${questionId}`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getQuestions()
                    this.getquestions()
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
        shouldUpdate() {
            this.getQuestions()
        }
    }
}
</script>

<style>
#btn-edit-delete {
    font-size: 20px;
    cursor: pointer;
}

#btn-fingerprint {
    color: #3a606e;
}
</style>
