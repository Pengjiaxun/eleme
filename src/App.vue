<template>
	<div>
		<v-header></v-header>
		<div class="tab">
			<div class="tab-item">
				<router-link to="/goods" class="tab-link">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/ratings" class="tab-link">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/seller" class="tab-link">商家</router-link>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import header from './components/header/header.vue';
	export default {
		components: {
			'v-header': header
		}
	};
</script>

<style lang="scss" scoped>
//scoped创建独立命名空间
.tab{
	display:flex;
	width:"100%";
	height:40px;
	line-height:40px;
	.tab-item{
		flex:1;
		text-align:center;
		.tab-link{
			display:block;
			font-size:14px;
			color:rgb(77,85,93);
			&.active{
				color:rgb(240,20,20);
			}
		}
	}
}		
</style>