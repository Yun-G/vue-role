<template>
	<div id="demo-index">
		<comHeader></comHeader>
		<div class="content">
			<router-view />
		</div>

	</div>
</template>

<script>
	export default {
		components: {
			comHeader: () => import('@/components/Header')
		}
	};
</script>
<style lang="scss" scoped="scoped">
	#demo-index {
		height: 100vh;
		.content{
           padding-top: 8rem;
		   height: 100vh;
		}




	}
</style>
