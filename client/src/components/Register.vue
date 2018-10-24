<template>
	<div class="col-12 mb-5">
		<Header></Header>
		<div class="col-lg-4 m-auto">
			<div class="card text-center card-form mb-3">
				<div class="card-body">
					<h3>Register</h3>
					<p>Please fill out this form to register</p>
					<form @submit.prevent="register()">
						<div class="form-group">
							<input type="text" v-model="registerUser.username" class="form-control" placeholder="Username" autofocus>
						</div>
						<div class="form-group">
							<input type="email" v-model="registerUser.email" class="form-control" placeholder="Email">
						</div>
						<div class="form-group">
							<input type="password" v-model="registerUser.password" class="form-control" placeholder="Password">
							<small id="passwordHelpBlock" class="form-text text-muted text-left">
								Your password must be 4-10 characters long.
							</small>
						</div>
						<input type="submit" value="Register" class="btn btn-danger btn-block font-weight-bold">
					</form>
				</div>
			</div>
			<div class="mb-2">or</div>
			<div class="mb-3">Sign Up With Google Account?</div>
			<div class="d-flex justify-content-center mb-3" id="my-signin2"></div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
	name: 'Register',
	props: ['checktoken'],
  data () {
	  return {
			registerUser: {
				username: '',
				email: '',
				password: '',
			}
	  }
  },
  components: {
	  Header
  },
  methods: {
		register: function() {
			axios({
				method: 'POST',
				url: `http://localhost:3000/register`,
				data: {
					username: this.registerUser.username,
					email: this.registerUser.email,
					password: this.registerUser.password,
				}
			})
				.then((result) => {
					this.registerUser.username = '',
					this.registerUser.email = '',
					this.registerUser.password = ''
					this.$router.push('/');
				})
				.catch((err) => {
					console.log(err)
				})
		},
		onSuccess: function(googleUser) {
			var id_token = googleUser.getAuthResponse().id_token;
			axios({
				method: 'POST',
				url: `http://localhost:3000/googlelogin`,
				data: {
					googleToken: id_token
				}
			})
				.then((result) => {
					console.log(result)
					localStorage.setItem('token', result.token)
					localStorage.setItem('email', result.email)
					const email = localStorage.getItem('email')
					this.checktoken()
					this.$emit('sendEmail', email)
					this.$router.push('/questions')
				})
				.catch((err) => {
					console.log(err)
				})
		},
		renderButton: function() {
			gapi.signin2.render('my-signin2', {
				'scope': 'profile email',
				'width': 240,
				'height': 50,
				'longtitle': true,
				'theme': 'dark',
				'onsuccess': this.onSuccess,
				'onfailure': this.onFailure
			});
		}
	},
	mounted() {
		this.renderButton()
	}
}
</script>

<style>

</style>
