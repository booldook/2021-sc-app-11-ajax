/* var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if(xhr.status === 200 && xhr.readyState === 4) {
		console.log(JSON.parse(xhr.responseText));
	}
}
xhr.open('GET', 'https://dapi.kakao.com/v2/search/web?query=블랙핑크');
xhr.setRequestHeader('Authorization', 'KakaoAK f17d0ae4d1d2ec94f5d272fd59b55b7f');
xhr.send(); */

$.ajax({
	url: 'https://dapi.kakao.com/v2/search/web',
	type: 'GET',
	dataType: 'json',
	data: { query: '블랙핑크' },
	beforeSend: onBefore,
	success: onSuccess,
	error: onError
});

function onBefore(xhr) {
	xhr.setRequestHeader('Authorization', 'KakaoAK f17d0ae4d1d2ec94f5d272fd59b55b7f')
}

function onSuccess(v) {
	console.log(v);
}

function onError(xhr, status, error) {
	console.log(xhr, status, error);
}