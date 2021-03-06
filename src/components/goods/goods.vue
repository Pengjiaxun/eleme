<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
						<span class="text border-1px">
							<icon v-show="item.type>0" :itype="item.type" :size="3"></icon>
							{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodWrapper">
				<ul>
					<li v-for="item in goods" class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
								<div class="icon">
									<img :src="food.icon" alt="" width="57">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">¥ {{food.price}}</span>
										<span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol :food="food"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		</div>
		<food :food="selectedFood" ref="food"></food>
	</div>
</template>

<script>
	import icon from 'components/icon/icon';
	import BScroll from 'better-scroll';
	import shopcart from 'components/shopcart/shopcart';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import food from 'components/food/food';

	const ERR_OK = 0;

	export default {
		props:{
			seller: {
				type:Object
			}
		},
		data() {
			return {
				goods:[],
				listHeight:[],
				scrollY: 0,
				selectedFood:{}
			};
		},
		computed: {
			currentIndex() {
				for(let i=0;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count){
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created() {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if(response.erron === ERR_OK){
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
			this.$on('cart.add',this.cartAdd);
		},
		methods:{
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click: true
				});
				this.foodScroll = new BScroll(this.$refs.foodWrapper,{
					probeType:3,
					click: true
				});
				this.foodScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight() {
				let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectMenu(index,event) {
				if(!event._constructed){
					return;
				}
				this.foodScroll.scrollTo(0,-this.listHeight[index]);
				this.scrollY = this.listHeight[index];
			},
			cartAdd(target) {
				this._drop(target);
			},
			_drop(target) {
				//体验优化，异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});
			},
			selectFood(food,event){
				if(!event._constructed){
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
			}
		},
		components:{
			icon,
			shopcart,
			cartcontrol,
			food
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
				&.current{
					position:relative;
					z-index:10;
					margin-top:-1px;
					background: #fff;
					font-weight:700;
					.text{
						@include border-none();
					}
				}
			}
		}
		.foods-wrapper{
			flex:1;
			.title{
				padding-left:14px;
				height:26px;
				line-height:26px;
				border-left:2px solid #d9dde1;
				font-size:12px;
				color:rgb(147,153,159);
				background: #f3f5f7;
			}
			.food-item{
				display:flex;
				margin:18px;
				padding-bottom:18px;
				@include border-1px(rgba(7,17,27,0.1));
				&:last-child{
					@include border-none();
					margin-bottom:0;
				}
				.icon{
					flex:0 0 57px;
					margin-right:10px;
				}
				.content{
					flex:1;
					.name{
						margin:2px 0 8px 0;
						height:14px;
						line-height:14px;
						font-size:14px;
						color:rbg(7,17,27);
					}
					.desc,.extra{
						line-height:10px;
						font-size:10px;
						color:rgb(147,153,159);
					}
					.desc{
						margin-bottom:8px;
						line-height:12px;
					}
					.extra{
						line-height:10px;
						.count{
							margin-right:12px;
						}
					}
					.price{
						font-weight:700;
						line-height:24px;
						.now{
							color:rgb(240,20,20);
						}
						.old{
							text-decoration:line-through;
							font-size:10px;
							color:rgb(147,153,159);
						}
					}
					.cartcontrol-wrapper{
						position:absolute;
						right:0;
						bottom:12px;
					}
				}
			}
		}
	}
</style>