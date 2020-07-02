//在这里配置路由页面
/* Layout */
import Layout from '@/views/adminLayout/layout'

//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [{
	path: '',
	name: '',
	component: () => import('../views/common/index/index'),
	children: [
		//首页
		{
			path: '/',
			name: '/',
			component: () => import('../views/common/index/main'),

		},
		//登录
		{
			path: '/login',
			name: 'Login',
			component: () => import('../views/common/login/login'),
		},
		//重置密码
		{
			path: '/resetPassword',
			name: 'ResetPassword',
			component: () => import('../views/common/login/resetPassword'),
		},
		//注册
		{
			path: '/register',
			name: 'Register',
			component: () => import('../views/common/login/register'),
		},
		//产品列表
		{
			path: '/products',
			name: 'Products',
			component: () => import('../views/common/products'),
		},

	]
}]

//异步挂载的路由
//动态需要根据权限加载的路由表 
//role表（buyer买家）（seller卖家）（admin平台）
export const asyncRouterMap = [
	/*************************  买家的路由  ************************/
	//首页
	{
		path: '/manage',
		name: 'Manage',
		component: Layout,
		redirect: '/manage/index',
		meta: {role: ['buyer']},
		children: [{
			path: 'index',
			name: 'Index',
			component: () => import('@/views/buyer/manage/index'),
			meta: {
				title: '首页',
				icon: 'el-icon-house'
			}
		}]
	},
	/*************************   卖家和平台的路由  ************************/
	//首页
	{
		path: '/manage',
		name: 'Manage',
		component: Layout,
		redirect: '/manage/index',
		meta: {role: ['admin','seller']},
		children: [{
			path: 'index',
			name: 'Index',
			component: () => import('@/views/seller/manage/index'),
			meta: {
				title: '首页',
				icon: 'el-icon-house',
			}
		}]
	},
	//我的产品
	{
		path: '/order',
		name: 'Order',
		component: Layout,
		redirect: '/order/list',
		meta: {
			title: '我的产品',
			icon: 'el-icon-s-grid',
			show: true,
			role: ['admin','seller']
		},
		children: [{
			path: 'list',
			name: 'List',
			component: () => import('@/views/seller/manage/order/list'),
			meta: {
				title: '产品列表',
			}
		}, ]
	},
	//财务管理
	{
		path: '/finance',
		name: 'Finance',
		component: Layout,
		redirect: '/finance/recharge',
		meta: {
			title: '财务管理',
			icon: 'el-icon-money',
			role: ['admin','seller']
		},
		children: [{
				path: 'recharge',
				name: 'Recharge',
				component: () => import('@/views/seller/manage/index'),
				meta: {
					title: '账号充值',
				}
			},
			{
				path: 'withdrawal',
				name: 'Withdrawal',
				component: () => import('@/views/seller/manage/index'),
				meta: {
					title: '账号提现',
				}
			},
			{
				path: 'detailed',
				name: 'Detailed',
				component: () => import('@/views/seller/manage/index'),
				meta: {
					title: '充值明细',
				}
			},
			{
				path: 'bill',
				name: 'Bill',
				component: () => import('@/views/seller/manage/index'),
				meta: {
					title: '账单明细',
				}
			},
		]
	},
	//测评订单任务
	{
		path: '/task',
		name: 'Task',
		component: Layout,
		redirect: '/task/add',
		meta: {
			title: '测评订单任务',
			icon: 'el-icon-s-grid',
			role: ['admin','seller']
		},
		children: [{
				path: 'add',
				name: 'Add',
				component: () => import('@/views/seller/manage/index'),
				meta: {
					title: '添加测评任务',
				}
			},
			{
				path: 'examine',
				name: 'Examine',
				component: () => import('@/views/seller/manage/index'),
				meta: {
					title: '任务审核',
				}
			},
		]
	},
	//意见反馈
	{
		path: '',
		name: '',
		component: Layout,
		children: [{
			path: '/feedback',
			name: 'Feedback',
			component: () => import('@/views/seller/manage/index'),
			meta: {
				title: '意见反馈',
				icon: 'el-icon-tickets',
			}
		}, ]
	},
	/**************************************** 平台管理   ***********************************/
	{
		path: '/platform',
		name: 'Platform',
		component: Layout,
		redirect: '/platform/classify',
		meta: {
			title: '平台管理',
			icon: 'el-icon-setting',
			role: ['admin']
		},
		children: [{
				path: 'classify',
				name: 'Classify',
				component: () => import('@/views/admin/platform/classify'),
				meta: {
					title: '分类管理',
				}
			},
			{
				path: 'examine',
				name: 'Examine',
				meta: {
					title: '审核任务',
				},
				redirect: '/platform/examine/receive',
				children: [{
						path: 'receive',
						name: 'Receive',
						component: () => import('@/views/seller/manage/index'),
						meta: {
							title: '审核领取的任务',
						}
					},
					{
						path: 'submit',
						name: 'Submit',
						component: () => import('@/views/seller/manage/index'),
						meta: {
							title: '审核提交的任务',
						}
					},
				]
			},
			{
				path: 'feedback',
				name: 'Feedback',
				component: () => import('@/views/seller/manage/index'),
				meta: {
					title: '异常反馈管理',
				}
			},
			{
				path: 'proposal',
				name: 'Proposal',
				component: () => import('@/views/seller/manage/index'),
				meta: {
					title: '意见建议箱',
				}
			},
		]
	},
	/**************************************** 其他   ***********************************/
	{
		path: "/404",
		name: "notFound",
		component: () => import('../views/error/404'),
	},
	{
		path: "*", // 此处需特别注意置于最底部
		redirect: "/404"
	}
];
