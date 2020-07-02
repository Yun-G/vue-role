<template>
	<div id="noFount">
		<div class="warp">
			<p>您访问的页面不存在</p>
			<div class="link">
				<a @click="toHome">返回首页</a>
				<a @click="toLast">返回上一页</a>
			</div>
		</div>
		<div class="bg-img"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		toHome() {
			this.$router.push({
				path: '/'
			});
		},
		toLast() {
			if (window.history.length == 2) {
				this.toHome();
			} else {
				this.$router.go(-1);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
#noFount {
	min-height: 550px;
	width: 100%;
	display: flex;
	.warp {
		flex: 3.5;
		padding: 4rem 0 0 4rem;
		& > p {
			font-size: 4rem;
			color: #333;
		}
		& > .link {
			margin-top: 2rem;
			a {
				color: #ff5c00;
				margin-right: 2rem;
				font-size: 20px;
				cursor: pointer;
			}
		}
	}
	.bg-img {
		flex: 6.5;
		background: url(../../assets/404.png) no-repeat;
		background-size: 100% 100%;
	}
}
</style>
