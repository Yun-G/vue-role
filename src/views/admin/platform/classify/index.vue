<!-- 
	@Description: 分类管理
	@Author:zxg 
-->
<template>
	<div id="pl-classify">
		<div class="header">
			<el-input v-model="search" placeholder="搜索分类"></el-input>
			<el-button type="primary" @click="handleAdd">添加分类</el-button>
		</div>
		<el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" row-key="id" border>
			<el-table-column label="分类名称" prop="name" header-align="center">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.name" @input="editIndex = scope.$index" @change="editClass"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="添加时间" prop="date" header-align="center" align="center"></el-table-column>
			<el-table-column label="状态" prop="status" header-align="center" align="center">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status" @change="switchStatu($event, scope.$index)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					<el-button v-if="typeof scope.row.children === 'object'" size="mini" type="primary" @click="handleAdd(scope.$index, scope.row)">添加子分类</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加分类 -->
		<el-dialog :title="dialogName" :visible.sync="dialogFormVisible" :show-close="false" :before-close="resetForm">
			<el-form :model="form" ref="addForm" :rules="rules">
				<el-form-item label="分类名称" label-width="90px" prop="name"><el-input v-model="form.name" autocomplete="off"></el-input></el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('addForm')" :loading="submitLoad">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [
				{
					id: 1,
					date: '2016-05-02',
					name: '王小虎',
					status: 2,
					children: []
				},
				{
					id: 2,
					date: '2016-05-04',
					name: '王小虎',
					status: true,
					children: []
				},
				{
					id: 3,
					date: '2016-05-01',
					name: '王小虎',
					status: 2,
					children: [
						{
							id: 31,
							date: '2016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄'
						},
						{
							id: 32,
							date: '2016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄'
						}
					]
				},
				{
					id: 4,
					date: '2016-05-03',
					name: '王小虎',
					status: 1,
					children: []
				}
			],
			search: '',
			editIndex: null,
			dialogFormVisible: false,
			form: {
				name: null
			},
			submitLoad: false,
			rules: {
				name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
			},
			dialogName: null
		};
	},
	methods: {
		async editClass() {
			if (this.editIndex != null) {
				console.log(this.tableData[this.editIndex].name);
			}
		},
		async handleDelete(index, row) {
			let iterator = 0;
			let flag = true;
			for (let i = 0; i < this.tableData.length && flag; i++) {
				if (iterator == index) {
					this.tableData.splice(i, 1);
					flag = false;
				} else {
					iterator++;
					for (let j = 0; j < this.tableData[i].children.length && flag; j++) {
						if (iterator == index) {
							this.tableData[i].children.splice(j, 1);
							flag = false;
						}
						iterator++;
					}
				}
			}
		},
		handleAdd(index, row) {
			if (row) {
				this.dialogName = '添加子分类';
				this.editIndex = index;
			} else {
				this.dialogName = '添加分类';
				this.editIndex = null;
			}
			console.log(index, row);
			this.form.name = null;
			this.dialogFormVisible = true;
		},
		//提交
		submitForm(formName) {
			this.submitLoad = true;
			this.$refs[formName].validate(valid => {
				if (valid) {
					alert('submit!');
				} else {
					return false;
				}
			});
			if (this.editIndex == null) {
				this.tableData.push({
					id: this.editIndex + 2,
					date: '2016-05-04',
					name: '王小虎',
					status: true,
					children: []
				});
			} else {
				this.tableData[this.editIndex].children.push({
					id: this.editIndex + 55,
					date: '2016-06-04',
					name: '王小虎',
					status: true
				});
			}
			this.dialogFormVisible = false;
			this.submitLoad = false;
		},
		//修改状态
		async switchStatu(value, index) {
			console.log(value);
		},
		resetForm(done) {
			if (!this.submitLoad)return;
			this.$refs['addForm'].resetFields();
			done();
		}
	}
};
</script>

<style lang="scss" scoped>
#pl-classify {
	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		.el-input {
			width: 25%;
		}
	}
	.el-table {
		width: 100%;
		.el-table__expand-icon + .el-input {
			padding-left: 0px;
		}
		.el-input {
			padding-left: 22px;
			width: auto;
		}
	}
}
</style>
