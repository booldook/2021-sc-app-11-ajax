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
	// root: null,
	// rootMargin: '0px',
	// threshold: 0
	// threshold: [0, .25, .5, .75, 1],
}
observer = new IntersectionObserver(onIntersection, option);
observer.observe(document.querySelector('.wrapper'));

function onIntersection(el, observer) {
	el.forEach(function(v, i) {
		if(v.isIntersecting) {
			if(v.intersectionRatio < .25) {
				$(v.target).css('background-color', 'red');
			}
			else if(v.intersectionRatio >= .25 && v.intersectionRatio < .5) {
				$(v.target).css('background-color', 'green');
			}
			else if(v.intersectionRatio >= .5 && v.intersectionRatio < .75) {
				$(v.target).css('background-color', 'blue');
			}
			else if(v.intersectionRatio >= .75) {
				$(v.target).css('background-color', 'purple');
			}
		}
		else {
			$(v.target).css('background-color', 'beige');
		}
		console.log(v.isIntersecting);
	});
	// console.log(el, observer);
}


