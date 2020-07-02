<template>
	<div id="main-wrapper-header">
		<header>
			<div class="header-left">
				<h3 @click="()=>{$router.push('/')}">Logo</h3>
				<div class="category">
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
						<el-submenu index="2">
							<template slot="title">CATEGRORIES</template>
							<el-menu-item index="2-1" @click="()=>{$router.push('/products')}">选项1</el-menu-item>
							<el-menu-item index="2-2">选项2</el-menu-item>
							<el-menu-item index="2-3">选项3</el-menu-item>
							<el-submenu index="2-4">
								<template slot="title">选项4</template>
								<el-menu-item index="2-4-1">选项1</el-menu-item>
								<el-menu-item index="2-4-2">选项2</el-menu-item>
								<el-menu-item index="2-4-3">选项3</el-menu-item>
							</el-submenu>
						</el-submenu>
						<el-menu-item index="3">DEALS</el-menu-item>
						<el-menu-item index="4">V SHOW</a></el-menu-item>
					</el-menu>
				</div>
				<div class="moblie-category">
					<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>导航一</span>
							</template>
							<el-menu-item-group>
								<template slot="title">分组一</template>
								<el-menu-item index="1-1">选项1</el-menu-item>
								<el-menu-item index="1-2">选项2</el-menu-item>
							</el-menu-item-group>
							<el-menu-item-group title="分组2">
								<el-menu-item index="1-3">选项3</el-menu-item>
							</el-menu-item-group>
							<el-submenu index="1-4">
								<template slot="title">选项4</template>
								<el-menu-item index="1-4-1">选项1</el-menu-item>
							</el-submenu>
						</el-submenu>
						<el-menu-item index="2">
							<i class="el-icon-menu"></i>
							<span slot="title">导航二</span>
						</el-menu-item>
						<el-menu-item index="3" disabled>
							<i class="el-icon-document"></i>
							<span slot="title">导航三</span>
						</el-menu-item>
						<el-menu-item index="4">
							<i class="el-icon-setting"></i>
							<span slot="title">导航四</span>
						</el-menu-item>
					</el-menu>
				</div>
				<div class="search">
					<el-select v-model="searchType" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-input v-model="search"></el-input>
					<el-button type="primary">Search</el-button>
				</div>
				<div class="moblie-login">
					<p @click="()=>{$router.push('/login')}">Login In</p>
				</div>
			</div>
			<div class="header-right">
				<ul>
					<li @click="()=>{$router.push('/login')}">Login In / Sign In</li>
					<el-button type="primary" plain> Sell Center</el-button>
				</ul>
			</div>
		</header>
	</div>
</template>

<script>
	export default {
		name: 'CommonHeader',
		data() {
			return {
				search: '',
				searchType: '',
				options: [],
				activeIndex: null
			}
		},
		methods: {
			handleSelect() {

			},
			handleOpen(){
				
			},
			handleClose(){
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	#main-wrapper-header {
		min-width: 100%;
		width: 100%;
		position: fixed;
		z-index: 2000;
		top: 0;
		left: 0;
		background: #fff;
		height: 8rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		max-width: 1400px;
		min-width: 300px;
		margin: 0 auto;
		box-sizing: border-box;
		height: 8rem;
		padding: 0 3rem;
		align-items: center;
		h3{
			font-weight: bold;
			color: #4A4A4A;
			font-size: 3rem;
			text-align: center;
			margin-right: 2rem;
			
		}

	}


	.header-left {
		display: flex;
		width: 70%;
		.category {
			height: 4.2rem;
			display: flex;
			align-items: center;
			margin-right: 2rem;

			/deep/.el-menu {
				border: none;

				/deep/.el-menu-item {
					padding: 0 1rem;
					color: #333;
					font-size: 1.9rem;
				}

				/deep/.el-submenu__title {
					color: #333;
					font-size: 1.9rem;
					border-bottom-color: transparent;
				}

				/deep/.el-submenu__icon-arrow {
					display: none;
				}
			}
		}
		.moblie-category{
			display: none;
		}
		.moblie-login{
			display:none;
		}

		.search {
			display: flex;
			height: 4.2rem;
			overflow: hidden;
			justify-content: space-between;
			box-sizing: border-box;

			/deep/.el-select {
				.el-input {
					width: 10rem;

					/deep/.el-input__inner {

						border-radius: .4rem 0 0 .4rem;
					}
				}
			}

			/deep/.el-input {
				width: 15rem;
			}

			/deep/.el-input__inner {
				height: 4.2rem;
				line-height: 4.2rem;
				border: 1px solid #EEE;
				border-right: none;
				box-sizing: border-box;
				border-radius: 0;
			}

			/deep/.el-button {
				border-radius: 0 .4rem .4rem 0;
				padding: 5px 16px;
				font-size: 1.6rem;
				font-weight: bold;

			}
		}
	}

	.header-right {
		width: 30%;

		ul {
			display: flex;
			height: 3.5rem;
			align-items: center;
			justify-content: flex-end;

			li {
				font-size: 1.6rem;
				color: #6D6D6D;
				padding: 0 2rem;
				font-weight: bold;
				cursor: pointer;
			}

			// li:first-child {
			// 	color: #409eFF;
			// }

			/deep/.el-button {
				padding: 10px 20px;
				margin-left: 2rem;
			}
		}
	}
	@media screen and (max-width:990px){
		header{
			padding: 0rem 2rem;
			height: auto;
			background: #fff;
		}
		.header-left{
			flex-direction: column;
			width: 100%;
			h3{
				margin: 2rem 0;
			}
			.category{
				display: none;
			}
		}
		.header-right{
			display: none;
		}
		
	}
</style>
