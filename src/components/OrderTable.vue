<template>
	<div id="order-table">
		<div class="filter">
			<el-select v-model="filter.country" placeholder="选择国家" size="medium">
				<!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
			</el-select>
			<el-select v-model="filter.taskStatus" placeholder="选择任务状态" size="medium">
				<!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
			</el-select>
			<el-select v-model="filter.examine" placeholder="选择审核状态" size="medium">
				<!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
			</el-select>
			<el-input v-model="filter.keyword" placeholder="请输入搜索关键字" size="medium"><el-button slot="append">搜寻</el-button></el-input>
		</div>
		<!-- 操作按钮 -->
		<div class="btns">
			<el-button type="primary" size="small" style="background-color: #2D8BF0;border-color:  #2D8BF0;">批量付款</el-button>
			<el-button type="primary" size="small" style="background-color: #2DB7F5;border-color:  #2DB7F5;" @click="delMultiple">批量删除</el-button>
			<el-button type="success" size="small" @click="dialogVisible = true">添加产品</el-button>
		</div>
		<!-- 表格 -->
		<div class="table">
			<el-table
				ref="multipleTable"
				:data="tableData"
				@selection-change="handleSelectionChange"
				:row-style="textCenter"
				:header-cell-style="textCenter"
				v-loading="tabLoading"
				element-loading-text="加载中"
				height="100%"
			>
				<el-table-column type="selection" width="40"></el-table-column>
				<el-table-column label="测评序号" prop="id"></el-table-column>
				<el-table-column label="国家"></el-table-column>
				<el-table-column label="阿辛"></el-table-column>
				<el-table-column label="产品图片"></el-table-column>
				<el-table-column label="标题"></el-table-column>
				<el-table-column label="关键字"></el-table-column>
				<el-table-column label="留评" width="50"></el-table-column>
				<el-table-column label="产品费用">
					<el-table-column label="数量"></el-table-column>
					<el-table-column label="单价"></el-table-column>
					<el-table-column label="汇率"></el-table-column>
					<el-table-column label="合计"></el-table-column>
				</el-table-column>
				<el-table-column label="操作费用">
					<el-table-column label="数量"></el-table-column>
					<el-table-column label="单价"></el-table-column>
					<el-table-column label="合计"></el-table-column>
				</el-table-column>
				<el-table-column label="优惠券"></el-table-column>
				<el-table-column label="总合计"></el-table-column>
				<el-table-column label="测评状态"></el-table-column>
				<el-table-column label="操作" width="170">
					<template slot-scope="scope">
						<el-button size="small" style="margin-right: 1rem;" @click="editHander(scope.$index, scope.row)">编辑</el-button>
						<el-popconfirm
							confirmButtonText="好的"
							cancelButtonText="不用了"
							icon="el-icon-info"
							iconColor="red"
							title="这是一段内容确定删除吗？"
							@onConfirm="delCommodity(scope.row)"
						>
							<el-button slot="reference" type="danger" size="small">删除</el-button>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<div class="paging">
			<el-pagination
				@current-change="getTable"
				:current-page="pagingData.current"
				:page-size="pagingData.pageSize"
				layout="total,  prev, pager, next, jumper"
				:total="pagingData.total"
			></el-pagination>
		</div>

		<!--添加和编辑产品  -->
		<el-dialog :title="nextForm.id == null ? '添加新产品' : '编辑产品'" :visible.sync="dialogVisible" class="form-dialog" top="5vh">
			<transition name="el-fade-in-linear">
				<div v-show="nextForm.step == 1">
					<el-form :model="nextForm" ref="nextForm" :rules="rules.next" class="next-form">
						<el-form-item prop="target" label=" ">
							<el-input v-model="nextForm.target" :placeholder="nextForm.activeName == 1 ? '链接地址' : 'Asin码'">
								<el-select v-model="nextForm.activeName" slot="prepend" placeholder="请选择" style="width: 90px;">
									<el-option label="Url" :value="1"></el-option>
									<el-option label="Asin" :value="2"></el-option>
								</el-select>
							</el-input>
						</el-form-item>
						<div class="line-item">
							<el-form-item prop="country" label=" ">
								<el-select v-model="nextForm.country" placeholder="站点">
									<el-option label="Url" :value="1"></el-option>
									<el-option label="Asin" :value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="group" label=" ">
								<el-cascader v-model="nextForm.group" :options="options.group" clearable placeholder="产品分类"></el-cascader>
							</el-form-item>
						</div>
						<el-form-item prop="name" label=" "><el-input v-model="nextForm.name" placeholder="标题"></el-input></el-form-item>
						<el-form-item prop="keyword" label=" "><el-input v-model="nextForm.keyword" placeholder="关键字"></el-input></el-form-item>
						<el-form-item prop="describe" label=" "><el-input v-model="nextForm.describe" placeholder="产品描述"></el-input></el-form-item>
						<el-form-item prop="image" class="next-image">
							<el-input v-model="nextForm.image" v-show="false"></el-input>
							<p slot="label" style="display: inline-block;">
								产品图片
								<span style="font-size: 12px;color: #949494;line-height: 16px;">
									第一张图将作为主图展示，每张图片大小不能超过3M，最多上传五张，图片上传后自动提供放大镜功能
								</span>
							</p>
							<el-upload
								class="avatar-uploader"
								action="https://jsonplaceholder.typicode.com/posts/"
								list-type="picture-card"
								:on-remove="handleRemove"
								:on-success="handleAvatarSuccess"
								:on-preview="handlePictureCardPreview"
								:before-upload="beforeAvatarUpload"
								accept="image/*"
								:limit="5"
							>
								<i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
				</div>
			</transition>
			<transition name="el-fade-in-linear">
				<div v-show="nextForm.step == 2">
					<el-form :model="addForm" :rules="rules.add" ref="addForm" class="add-form">
						<div class="line-item">
							<el-form-item prop="number" label=" "><el-input v-model="addForm.number" type="number" placeholder="数量"></el-input></el-form-item>
							<el-form-item prop="price" label=" "><el-input v-model="addForm.price" type="number" placeholder="单价"></el-input></el-form-item>
						</div>
						<div class="line-item">
							<el-form-item prop="commission" label=" "><el-input v-model="addForm.commission" type="number" placeholder="每单佣金"></el-input></el-form-item>
							<el-form-item label=" "><el-input style="margin-left: 10px;" v-model="addForm.remark" placeholder="备注"></el-input></el-form-item>
						</div>
						<div class="line-item">
							<el-form-item prop="purchase" label=" ">
								<el-select v-model="addForm.purchase" placeholder="是否必须购买">
									<el-option label="必须购买" :value="1"></el-option>
									<el-option label="不用购买" :value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item prop="comment" label=" ">
								<el-select v-model="addForm.comment" placeholder="留评方式">
									<el-option label="留评即可" :value="1"></el-option>
									<el-option label="留评，且需要保留X天" :value="2"></el-option>
									<el-option label=" 不需要留评" :value="3"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<el-form-item prop="days" v-if="addForm.comment == 2"><el-input v-model="addForm.days" placeholder="保留天数"></el-input></el-form-item>
					</el-form>
				</div>
			</transition>
			<div slot="footer">
				<div v-show="nextForm.step == 1">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitNext('nextForm')">下一步</el-button>
				</div>
				<div v-show="nextForm.step == 2">
					<el-button @click="nextForm.step--">上一步</el-button>
					<el-button type="primary" @click="submitForm('addForm')">上传产品</el-button>
				</div>
			</div>
			<el-dialog :visible.sync="dialogImg" append-to-body top="2vh"><img width="75%" :src="dialogImageUrl" alt="" /></el-dialog>
		</el-dialog>
	</div>
</template>

<script>
export default {
	props: {
		auth: {
			type: Number,
			default: null
		}
	},
	data() {
		var checkNumber = (rule, value, callback) => {
			let name = '';
			switch (rule.field) {
				case 'number':
					name = '数量';
					break;
				case 'price':
					name = '价格';
					break;
				case 'commission':
					name = '佣金';
					break;
			}
			if (!value) {
				return callback(new Error(name + '不能为空'));
			}
			if (value <= 0) {
				callback(new Error(name + '必须大于0'));
			} else {
				callback();
			}
		};
		return {
			filter: {
				country: null,
				taskStatus: null,
				examine: null,
				keyword: null
			},
			tableData: [],
			multiple: null,
			textCenter: { 'text-align': 'center' },
			tabLoading: false,
			pagingData: {
				pageSize: 10,
				total: 0,
				current: 1
			},
			nextForm: {
				id: null,
				step: 1,
				name: null,
				keyword: null,
				activeName: 1,
				target: null,
				imageUrl: '',
				group: null,
				image: null,
				describe: null,
				country: null
			},
			addForm: {
				number: null,
				price: null,
				commission: null,
				remark: null,
				purchase: null,
				comment: null,
				days: null
			},
			dialogVisible: false,
			rules: {
				next: {
					target: [{ required: true, message: '必填项' }],
					name: [{ required: true, message: '请输入标题' }],
					describe: [{ required: true, message: '请输入描述' }],
					keyword: [{ required: true, message: '请输入关键字' }],
					image: [{ required: true, message: '请选择产品图片' }],
					group: [{ required: true, message: '请选择产品分类' }],
					country: [{ required: true, message: '请选择站点' }]
				},
				add: {
					number: [{ required: true, validator: checkNumber }],
					price: [{ required: true, validator: checkNumber }],
					commission: [{ required: true, validator: checkNumber }],
					purchase: [{ required: true, message: '请选择产品是否需要购买' }],
					comment: [{ required: true, message: '请选择是否需要留评' }],
					days: [{ required: true, message: '请输入留评保留天数' }]
				}
			},
			options: {
				group: [
					{
						label: '分类1',
						value: 1
					}
				]
			},
			//查看大图
			dialogImg: false,
			dialogImageUrl: ''
		};
	},
	methods: {
		getTable(flag) {
			if (flag == true) {
				this.tabLoading = true;
			}

			for (let i = 0; i < 10; i++) {
				this.tableData.push({
					id: i + 1000
				});
			}
			this.pagingData.total = this.tableData.length;
			this.tabLoading = false;
		},
		handleSelectionChange(val) {
			this.multiple = val;
		},
		async delMultiple() {
			if (!this.multiple || this.multiple.length == 0) {
				this.$message({
					message: '未选择数据',
					type: 'warning'
				});
			} else {
				this.$confirm('此操作将永久删除选择的产品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})
					.catch(() => {});
			}
		},
		async delCommodity(row) {
			console.log(row);
			this.getTable();
		},
		//下一步
		submitNext(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.nextForm.step++;
				} else {
					return false;
				}
			});
		},
		//提交产品
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let params = Object.assign({}, this.nextForm, this.addForm);
					console.log(params);
				} else {
					return false;
				}
			});
		},
		//主图上传成功
		handleAvatarSuccess(res, file) {
			this.nextForm.image = 'success';
			this.nextForm.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const pattren = /^image/;
			const isJPG = pattren.test(file.type);
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('请选择图片文件');
			}
			if (!isLt2M) {
				this.$message.error('上传的图片大小不能超过 2MB');
			}
			return isJPG && isLt2M;
		},
		//移除前
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogImg = true;
		},
		editHander(index, row) {
			this.nextForm.id = row.id;
			this.dialogVisible = true;
		}
	},
	created() {
		this.getTable(true);
	}
};
</script>

<style lang="scss">
#order-table {
	height: 100%;
	box-shadow: 0 0 4px #e1e0e099;
	padding: 1rem;
	.filter {
		width: 60%;
		display: flex;
		.el-select {
			margin-right: 1rem;
		}
	}
	.btns {
		margin: 1rem 0;
		position: relative;
		& > :last-child {
			position: absolute;
			right: 0;
		}
	}
	.table {
		height: 80%;
		margin-bottom: 1rem;
	}
	.form-dialog {
		.el-dialog {
			/deep/.el-form-item__content {
				.avatar-uploader .el-upload {
					border: 1px dashed #d9d9d9;
					border-radius: 6px;
					cursor: pointer;
					position: relative;
					overflow: hidden;
				}
				.avatar-uploader .el-upload:hover {
					border-color: #409eff;
				}
				.avatar-uploader-icon {
					font-size: 28px;
					color: #8c939d;
					width: 150px;
					height: 150px;
					line-height: 150px;
					text-align: center;
				}
				.avatar {
					width: 150px;
					height: 150px;
					display: block;
				}
			}
			//公共
			.line-item {
				display: flex;
				& > :last-child {
					margin-left: 1rem;
				}
			}
			//下一步
			.next-form {
				.el-form-item__label {
					width: 1px;
				}
				.next-image {
					.el-form-item__label {
						width: auto;
					}
				}
				.el-input {
					width: 95%;
				}
				.line-item {
					.el-form-item {
						flex: 1;
						.el-cascader,
						.el-select {
							width: 95%;
						}
						.el-select {
							.el-input {
								width: 100%;
							}
						}
					}
				}
			}
			//添加
			.add-form {
				.el-form-item {
					flex: 1;
					.el-form-item__label {
						width: 1px;
					}
					.el-input {
						width: 95%;
					}
					.el-select {
						width: 95%;
						.el-input {
							width: 100%;
						}
					}
				}
			}

			.el-dialog__footer {
				border-top: 1px solid #e2e2e2;
				padding: 15px 20px;
			}
		}
	}
}
@media all and (max-width: 1440px) {
	#order-table {
		.filter {
			width: 65%;
			.el-select {
				// margin-right: 1rem;
			}
			.el-input-group {
				width: 400px;
			}
		}
	}
}
@media all and (max-width: 1024px) {
	#order-table {
		.filter {
			flex-wrap: wrap;
			width: 100%;
			.el-select {
				width: 50%;
				margin-right: 0;
				margin-bottom: 1rem;
			}
			.el-input-group {
				width: 50%;
			}
		}
	}
}
</style>
