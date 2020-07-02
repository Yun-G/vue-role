<template>
	<div id="login">
		<div class="btn-group">
			<el-button type="primary">登录</el-button>
			<el-button  @click="$router.replace('/register')">注册</el-button>
		</div>
		<el-form :model="form" ref="form" :rules="RULES" label-width="100px">
			<el-form-item label="用户名 :" prop="username">
				<el-input v-model="form.username" placeholder="" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码 :" prop="password">
				<el-input @keyup.native.enter="toLogin" type="password" v-model="form.password" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-link :underline="false" type="primary" @click="toForgetpw">忘记密码</el-link>
			</el-form-item>
			<el-form-item>
				<el-button :loading="btnloading" type="info" @click="toLogin">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		mapActions
	} from "vuex"
	export default {
		data() {
			return {
				form: {
					username: null,
					password: null,
				},
				RULES: {
					username: [{
						required: true,
						message: '请输入您的用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入您的密码',
						trigger: 'blur'
					}],
				},
				btnloading: false
			}
		},
		methods: {
			...mapActions("user", ['setToken']),
			toLogin() {
				this.$refs.form.validate(valid => {
					this.$xStorage.setItem("token", "asasa")
					return;
					if (valid) {
						if (this.form.username.length < 5 || this.form.password.length < 6) {
							this.$notify({
								type: 'info',
								message: "用户名或密码格式不正确"
							})
							return
						}
						this.btnloading = true;
						this.$http.user.login(this.form).then(resp => {
							if (resp.code == 200) {
								let token = "Bearer " + resp.data.token
								this.$xStorage.setItem("token", token,1000*60*30)
								this.setToken(token)
								let tips = this.$notify({
									message: '登录成功，即将跳转',
									type: 'success'
								})
								setTimeout(() => {
									let url = this.$route.query.redirect;
									if (url) {
										this.$router.replace(url)
									} else {
										this.$router.replace('/index')
									}
									this.btnloading = false;
									tips.close()
								}, 1000)
							} else {
								this.btnloading = false;
							}
						})
					}
				})
			},
			toForgetpw() {
				this.$router.replace('/forgetpw')
			}
		},
		mounted() {
			if (this.$route.query.code == 403) {
				this.$notify({
					type:"error",
					message:"长时间未操作，请重新登录"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#login {
		padding: 0 10rem;

		.el-form {
			.el-form-item:nth-of-type(2) {
				margin-bottom: 0;
			}

			.el-form-item:nth-of-type(3) {
				margin-bottom: 0;

				/deep/.el-form-item__content {
					width: 79%;
					display: flex;
					justify-content: flex-end;
				}
			}

			.el-form-item {
				margin-bottom: 2.2rem;

				/deep/.el-form-item__content {
					display: flex;
					justify-content: center;

					.el-input {
						width: 95%;
					}

					.el-button {
						width: 95%;
					}
				}
			}
		}
	}
</style>
