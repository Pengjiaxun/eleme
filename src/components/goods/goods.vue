<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text border-1px">
						<icon v-show="item.type>0" :itype="item.type" :size="3"></icon>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper">

		</div>
	</div>
</template>

<script>
	import icon from 'components/icon/icon';

	const ERR_OK = 0;

	export default {
		props:{
			seller: {
				type:Object
			}
		},
		data() {
			return {
				goods:[]
			};
		},
		created() {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if(response.erron === ERR_OK){
					this.goods = response.data;
				}
			});
		},
		components:{
			icon
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../common/scss/mixin.scss";

	.goods{
		display:flex;
		position:absolute;
		top:174px;
		bottom:46px;
		width:100%;
		overflow:hidden;
		.menu-wrapper{
			flex:0 0 80px;
			width:80px;
			background-color: #f3f5f7;
			.menu-item{
				display:table;
				width:56px;
				height:54px;
				line-height:14px;
				padding:0 12px;
				.text{
					display:table-cell;
					width:56px;
					vertical-align:middle;
					@include border-1px(rgba(7,17,27,0.1));
					font-size:12px;
				}
			}
		}
		.foods-wrapper{
			flex:1;
		}
	}
</style>