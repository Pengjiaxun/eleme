//解析url参数
//@example ?id=123&a=b
//return Object {id:123,a:b}

export function urlParse(){
	let url = window.location.search;
	let obj = {};
	let reg = /[?$][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	//['?id=123','&a=b']
	if(arr){
		arr.forEach((item) => {
			let temArr = item.substring(1).split('=');
			let key = decodeURLComponent(temArr[0]);
			let val = decodeURLComponent(temArr[1]);
			obj[key] = val;
		});
	}
	return obj;
};