/*
function myFn(fn, option) {
	var root = option.root = 'hi';
	var opt = option.rootMargin+"%";
	fn(this, root, opt);
}

myFn(onFn, option);
function onFn(el, rootValue, option) {
	console.log(el, rootValue, option);
}
*/


var observer;
var option = {
	root: null,
	rootMargin: '0px',
}
observer = new IntersectionObserver(onIntersection, option);
observer.observe(document.querySelector('.wrapper'));

function onIntersection(el, observer) {
	console.log(el, observer);
}


