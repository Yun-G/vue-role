<template>
	<order-list></order-list>
</template>

<script>
export default {
	components: {
		OrderList: () => import('@/components/OrderTable')
	},
	data() {
		return {};
	}
};
</script>

<style></style>
