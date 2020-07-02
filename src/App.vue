<template>
	<div id="app"><router-view /></div>
</template>

<script>
export default {
	name: 'app',
	mounted() {
		setTimeout(function() {
			let loader = document.getElementById('loader-wrapper');
			document.body.removeChild(loader);
		}, 500);
	}
};
</script>

<style></style>
