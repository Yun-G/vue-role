<template>
	<div id="products">
		<!-- 筛选区域 -->
		<div class="wrapper">
			<div class="filter-condition common">
				<div class="price common-div">
					<h3>PRICE</h3>
					<div class="line">
						<i>$</i> <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字" controls-position="right" ></el-input-number>
						<span>--</span>
						<i>$</i> <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字" controls-position="right" ></el-input-number>	
					</div>
				</div>
				<div class="discount common-div">
					<h3>DISCOUNT</h3>
					<div class="line">
						<el-select></el-select>
					</div>
				</div>
				<div class="price common-div">
					<h3>FULFILLMENT</h3>
					<div class="line">
						<el-select></el-select>
					</div>

				</div>
				<div class="price common-div">
					<h3>STATUS</h3>
					<div class="line">
						<el-select></el-select>
					</div>

				</div>
				<div class="price common-div">
					<h3>CATEGORY</h3>
					<div class="line">
						<el-select></el-select>
					</div>

				</div>
				<div class="price common-div">
					<h3>SORTING   <span>RESET ALL</span></h3>
					<div class="line">
						<el-select></el-select>
					</div>
				</div>

			</div>
		</div>

	</div>

</template>

<script>
	export default{
		data(){
		 return{
			num1:null,
			num2:null
			}
		},
		methods:{
			handleChange(){
				
			}
		}
		
		
		
	}
</script>

<style lang="scss" scoped="scoped">
	#products {
		background: #f3f3f3;
		height: 100%;

		.wrapper {
			width: 100%;
			min-width: 100%;
		}

		.common {
			max-width: 1400px;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 3rem;
		}

		.filter-condition {
			display: flex;
		}

		.common-div {
			padding: 1.5rem;
			flex: 1;
			background: #fff;
			border-right: 1px solid #efefef;

			h3 {
				font-size: 14px;
				line-height: 17px;
				color: #131313;
				cursor: pointer;
				display: flex;
				justify-content: space-between;
				span{
					color: #409eFF;
					cursor: pointer;
				}
			}

			.line {
				display: flex;
				margin-top: 1rem;
				color: #333;
				font-size: 1.4rem;
				/deep/.el-select{
					width: 100%;
				}

				/deep/.el-input__inner {
					border: 1px solid #f3f3f3;
					height: 3rem;
					line-height: 3rem;
					width: 100%;
					padding: 0 10px;
					box-sizing: border-box;
					color: #333;
					font-size: 1.4rem;
					border-radius: .1rem;
				}
				/deep/.el-input__icon{
					display: none;
				}
				
			}
		}
		.price{
			.line{
				display: flex;
				align-items: center;
				&>div{
				  flex: 1;	
				}
				i{
					line-height: 3rem;
					font-weight: bold;
					margin-right: .5rem;
				}
				span{
					width: 15px;
					margin: 0 5px;
				}
				/deep/.el-input-number{
					width: 8rem;
					height: 3rem;
					line-height: 1;
				}
				/deep/.el-input__inner{
					width: 70%;
				}
				/deep/.el-input-number__decrease{
					width: 3rem;
					line-height: 16px;
				}
				/deep/ .el-input-number__increase{
					width: 3rem;
					line-height: 15px;
				}
			}
		}



	}
</style>
