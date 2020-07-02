<template>
	<div id="content">
		<div class="banner">
			<el-carousel  autoplay arrow="never" >
				<el-carousel-item>
					<img src="@/assets/img/img1.jpg" alt="">
				</el-carousel-item>
				<el-carousel-item>
					<img src="@/assets/img/img2.png" alt="">
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="wrapper">
			<div class="service common">
				<h3>Popular professional services</h3>
				<div class="service-content">
					<el-carousel arrow="always" indicator-position="none" trigger="click">
						<el-carousel-item>
							<div class="imgs">
								<div>
									<h4>
										<p>Build Your Brand</p>
										<span>Logo Design</span>
									</h4>
									<img src="@/assets/banner/eg1.jpg" alt="">
								</div>
								<div>
									<h4>
										<p>Build Your Brand</p>
										<span>Logo Design</span>
									</h4>
									<img src="@/assets/banner/eg1.jpg" alt="">
								</div>
								<div>
									<h4>
										<p>Build Your Brand</p>
										<span>Logo Design</span>
									</h4>
									<img src="@/assets/banner/eg1.jpg" alt="">
								</div>
								<div>
									<h4>
										<p>Build Your Brand</p>
										<span>Logo Design</span>
									</h4>
									<img src="@/assets/banner/eg1.jpg" alt="">
								</div>
								<div>
									<h4>
										<p>Build Your Brand</p>
										<span>Logo Design</span>
									</h4>
									<img src="@/assets/banner/eg1.jpg" alt="">
								</div>
							</div>
						</el-carousel-item>
						<el-carousel-item>
							<div class="imgs">
								<div>
									<h4>
										<p>Build Your Brand</p>
										<span>Logo Design</span>
									</h4>
									<img src="@/assets/banner/eg2.jpg" alt="">
								</div>
								<div>
									<h4>
										<p>Build Your Brand</p>
										<span>Logo Design</span>
									</h4>
									<img src="@/assets/banner/eg2.jpg" alt="">
								</div>
								<div>
									<h4>
										<p>Build Your Brand</p>
										<span>Logo Design</span>
									</h4>
									<img src="@/assets/banner/eg2.jpg" alt="">
								</div>
								<div>
									<h4>
										<p>Build Your Brand</p>
										<span>Logo Design</span>
									</h4>
									<img src="@/assets/banner/eg2.jpg" alt="">
								</div>
								<div>
									<h4>
										<p>Build Your Brand</p>
										<span>Logo Design</span>
									</h4>
									<img src="@/assets/banner/eg2.jpg" alt="">
								</div>

							</div>
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped="scoped" lang="scss">
	.banner {
		width: 100%;
		min-width: 100%;
		height: 480px;

		/deep/.el-carousel__container {
			height: 480px;

			img {
				height: 480px;
				width: 100%;
				display: block;
			}
		}
	}

	.wrapper {
		width: 100%;
		min-width: 100%;
		margin-top: 6rem;
	}

	.common {
		max-width: 1400px;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 3rem;

		h3 {
			font-size: 2.4rem;
			line-height: 3rem;
			padding-bottom: 3rem;
			color: #4a4a4a;
			font-weight: bold;
		}
	}

	.service {
		.imgs {
			display: flex;
			justify-content: space-between;

			img {
				height: 30rem;
				border-radius: .4rem;
				opacity: 1;
				transition: all .3s;
			}

			&>div {
				position: relative;
				cursor: pointer;

				h4 {
					position: absolute;
					z-index: 1;
					font-size: 2rem;
					line-height: 2.3rem;
					color: #fff;
					padding: 1.5rem;
					font-weight: bold;

					p {
						font-size: 1.6rem;
						font-weight: normal;
					}
				}

				&:hover {
					img {
						opacity: .8;
					}
				}
			}
		}

		/deep/.el-carousel__arrow {
			background-color: #fff;
			z-index: 4;
			top: 50%;
			width: 48px;
			height: 48px;
			margin-top: -24px;
			text-align: center;
			-webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .15);
			box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .15);
			border: 0;
			i{
				color: #333;
				font-size: 2.5rem;
				font-weight: bold;
			}
		}
	}
</style>
