<template>
	<div class="cartcontrol">
		<transition name="slide-fade">
			<div class="cart-decrease " v-show="food.count>0" @click.stop="decrease">
				<div class="inner icon-remove_circle_outline"></div>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0" key="cart-count">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default{
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addCart(event){
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
				this.$parent.$emit('cart.add',event.target);
			},
			decrease(event){
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--;
				}
			}
		}
	};
</script>

<style lang="scss">
	.cartcontrol{
		font-size:0;
		.slide-fade-enter-active {
			transition: all 0.3s ease;
		}
		.slide-fade-leave-active {
			transition: all 0.3s ease;
			transform:translate3D(24px,0,0);
		}
		.slide-fade-enter,.slide-fade-leave-active {
			opacity: 0;
			transform:translate3D(24px,0,0);
		}
		.cart-decrease{
			display:inline-block;
			padding:6px;
			&.slide-fade-enter,&.slide-fade-leave-active {
				.inner{
					transform:rotate(180deg);
				}
			}
			.inner{
				display:inline-block;
				line-height:24px;
				font-size:24px;
				color:rgb(0,160,220);
				transition:all 0.3s linear;
				transform:rotate(0);
			}
		}
		.cart-count{
			display:inline-block;
			vertical-align:top;
			width:12px;
			padding-top:6px;
			line-height:24px;
			text-align:center;
			font-size:10px;
			color:rgb(147,153,159);
		}
		.cart-add{
			display:inline-block;
			padding:6px;
			line-height:24px;
			font-size:24px;
			color:rgb(0,160,220);
		}
	}
</style>