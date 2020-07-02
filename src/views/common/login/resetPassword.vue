<template>
	<div id="reset">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>忘记密码</span>
				<!-- <p>输入邮箱或者手机号</p> -->
			</div>
			<el-form :model="form" ref="form" :rules="RULES">
				<el-form-item prop="username">
					<el-input v-model="form.username" placeholder="邮箱 / 手机号 / 用户名" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="btnloading" type="primary" @click="toReset" style="width:100%">重置密码</el-button>
				</el-form-item>
			</el-form>
			<p class="login"><i @click="()=>{$router.push('/login')}">返回登录</i></p>
		</el-card>


	</div>
</template>

<script>
	import {
		mapActions
	} from "vuex"
	export default {
		components: {
			comHeader: () => import('@/components/Header')
		},
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
			toReset() {
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
								this.$xStorage.setItem("token", token, 1000 * 60 * 30)
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
					type: "error",
					message: "长时间未操作，请重新登录"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#reset {
		background: #e4e4e4;
	    height: 100%;
		padding-top: 5rem;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;

		.box-card {
			width: 500px;
			margin: 0 auto;
			padding-bottom: 2rem;

			/deep/.el-card__header {
				padding: 3rem 0;
			}

			/deep/.el-card__body {
				padding: 20px 3rem;
			}

		}

		.clearfix {
			display: flex;
			flex-direction: column;
			text-align: center;

			span {
				font-size: 2.5rem;
				color: #333;
				font-weight: bold;
			}

			p {
				font-size: 1.6rem;
				color: #4a4a4a;
			}
		}

		.el-form {
			padding: 2rem 4rem;
			padding-bottom: 0rem;

			/deep/.el-form-item:nth-of-type(2) {
				margin-bottom: 0;
			}
		}

		.login {
			color: #409eFF;
			width: 100%;
			text-align: right;
			padding-right: 4rem;
			font-size: 1.4rem;
			margin-top: 2rem;


			span {
				color: #4a4a4a;
			}

			i {
				cursor: pointer;

				&:hover {
					color: #0071E1;
				}
			}

		}

	}

	@media screen and (max-width:990px) {
		#reset {
			.box-card {
				width: 100%;
			}
		}
	}
</style>
