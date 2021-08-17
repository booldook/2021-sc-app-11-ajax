/*
['홍길동', '홍길만', '홍길순'].join(', ')  -> "홍길동, 홍길만, 홍길순"
'0000 0000'.replace(' ', ' / ');  ->  "0000 / 0000"
*/

/*************** global init **************/
var auth = 'KakaoAK f17d0ae4d1d2ec94f5d272fd59b55b7f';
var kakaoURL = 'https://dapi.kakao.com/';


/************** user function *************/
function getPath(cate) {
	return kakaoURL+(cate === 'book' ? 'v3' : 'v2')+'/search/'+cate;
}

function getParams(query) {
	return {
		params: { query: query },
		headers: { Authorization: auth }
	}
}

function setTotalCnt(cnt) {
	$('.result-cnt').html(numberFormat(cnt));
}

function setWebLists(r) {
	$('.lists').empty().attr({'class': 'lists web', 'style': ''});
	r.forEach(function(v, i) {
		var html = '<li class="list">';
		html += '<a class="title" href="'+v.url+'" target="_blank">'+v.title+'</a>';
		html += '<p class="content">'+v.contents+'</p>';
		html += '<a class="link" href="'+v.url+'" target="_blank">'+v.url+'</a>';
		html += '<div class="dt">'+moment(v.datetime).format('YYYY-MM-DD HH:mm:ss')+'</div>';
		html += '</li>';
		$('.lists').append(html);
	});
}

function setBlogLists(r) {
	$('.lists').empty().attr({'class': 'lists blog', 'style': ''});
	var html = '';
	r.forEach(function(v, i) {
		html  = '<li class="list">';
		html += '<a class="thumbs" href="'+v.url+'" target="_blank">';
		html += '<img src="'+v.thumbnail+'" alt="'+v.title+'" class="w100">';
		html += '</a>';
		html += '<div class="contents">';
		html += '<a class="title" href="'+v.url+'" target="_blank">'+v.title+'</a>';
		html += '<p class="content">'+v.contents+'</p>';
		html += '<a class="name" href="'+v.url+'" target="_blank">'+v.blogname+'</a> | <a href="'+v.url+'" class="link" target="_blank">'+v.url+'</a>';
		html += '<div class="dt">'+moment(v.datetime).format('YYYY-MM-DD HH:mm:ss')+'</div>';
		html += '</div>';
		html += '</li>';
		$('.lists').append(html);
	});
}

function setImageLists(r) {
	$('.lists').empty().attr({'class': 'lists image grid-wrap', 'style': ''});
	$('.lists').append('<li class="list grid-sizer"></li>');
	r.forEach(function(v, i) {
		var info = JSON.stringify({
			collection: v.collection,
			width: v.width,
			height: v.height,
			src: v.image_url,
			thumb: v.thumbnail_url,
			name: v.display_sitename,
			url: v.doc_url,
			dt: v.datetime
		});
		var html = '<li class="list grid-item" data-info=\''+info+'\'>';
		html += '<img src="'+v.thumbnail_url+'" class="w100">';
		html += '<div class="info"></div>';
		html += '</li>';
		$(html).appendTo('.lists').click(onModalShow);
	});
	var $grid = $('.grid-wrap').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});
	$grid.imagesLoaded().progress(function() {
		$grid.masonry('layout');
		$grid.masonry('reloadItems');
	});
}

function setClipLists(r) {
	$('.lists').empty().attr({'class': 'lists clip', 'style': ''});
	var html = '';
	r.forEach(function(v, i) {
		html  = '<li class="list">';
		html += '<a class="thumbs" href="'+v.url+'" target="_blank">';
		html += ' <img src="'+v.thumbnail+'" alt="'+v.title+'" class="w100">';
		html += '</a>';
		html += '<div class="contents">';
		html += ' <a class="title" href="'+v.url+'" target="_blank">'+v.title+'</a>';
		html += ' <div>';
		html += '  <a class="author" href="'+v.url+'" target="_blank">'+v.author+'</a> | ';
		html += '  <span class="play-time">'+getPlayTime(v.play_time)+'</span>';
		html += ' </div>';
		html += ' <a href="'+v.url+'" class="link" target="_blank">'+v.url+'</a>';
		html += ' <div class="dt">'+moment(v.datetime).format('YYYY-MM-DD HH:mm:ss')+'</div>';
		html += '</div>';
		html += '</li>';
		$('.lists').append(html);
	});
}

function setBookLists(r) {
	$('.lists').empty().attr({'class': 'lists book', 'style': ''});
	var html = '';
	r.forEach(function(v, i) {
		var author = v.authors.join(', ');
		var thumbnail = v.thumbnail !== '' ? v.thumbnail : 'http://via.placeholder.com/120x174/eee?text=No+image';
		var translator = v.translators.join(', ');
		var salePrice = v.sale_price > -1 ? numberFormat(v.sale_price)+'원' : '판매중지';
		var isbn = v.isbn.replace(' ', ' / ');
		var dt = moment(v.datetime).format('YYYY-MM-DD');
		html  = '<li class="list">';
		html += '<a class="title" href="'+v.url+'" target="_blank">'+v.title+'</a>';
		html += '<div class="info-wrap">';
		html += '<a class="thumb-wp" href="'+v.url+'" target="_blank">';
		html += '<img src="'+thumbnail+'" alt="" class="w100">';
		html += '</a>';
		html += '<div class="info-wp">';
		html += '<div class="authors">';
		html += '<span class="author">'+author+'</span>';
		if(v.translators.length) html += '<span class="translator"> (역: '+translator+')</span>';
		html += '</div>';
		html += '<div class="prices">';
		html += '<span class="price">'+numberFormat(v.price)+'</span> | ';
		html += '<span class="sale-price">'+salePrice+'</span>';
		if(v.status) html += '<span class="status"> ['+v.status+']</span>';
		html += '</div>';
		html += '<div class="publisher">'+v.publisher+'</div>';
		html += '<div class="isbn">'+isbn+'</div>';
		html += '<div class="dt">'+dt+'</div>';
		html += '</div>';
		html += '</div>';
		html += '<a class="content" href="'+v.url+'" target="_blank">'+v.contents+'</a>';
		html += '</li>';
		$('.lists').append(html);
	});
}

function setCafeLists(r) {
	$('.lists').empty().attr({'class': 'lists cafe', 'style': ''});
	var html = '';
	r.forEach(function(v, i) {
		html  = '<li class="list">';
		html += '<a class="thumbs" href="'+v.url+'" target="_blank">';
		html += '<img src="'+v.thumbnail+'" alt="'+v.title+'" class="w100">';
		html += '</a>';
		html += '<div class="contents">';
		html += '<a class="title" href="'+v.url+'" target="_blank">'+v.title+'</a>';
		html += '<p class="content">'+v.contents+'</p>';
		html += '<a class="name" href="'+v.url+'" target="_blank">'+v.cafename+'</a> | <a href="'+v.url+'" class="link" target="_blank">'+v.url+'</a>';
		html += '<div class="dt">'+moment(v.datetime).format('YYYY-MM-DD HH:mm:ss')+'</div>';
		html += '</div>';
		html += '</li>';
		$('.lists').append(html);
	});
}


/************** event callback ************/
function onLoadError(el) {
	$('.modal-wrapper .img-wp img').attr('src', $(el).data('thumb'));
}

function onModalShow() {
	var v = $(this).data('info');
	$('.modal-wrapper').show();
	$('.modal-wrapper .img-wp img').attr('src', v.src);
	$('.modal-wrapper .img-wp img').data('thumb', v.thumb);
	$('.modal-wrapper .size-wp').html(v.width + ' x ' + v.height);
	$('.modal-wrapper .collection').html('['+v.collection+'] ');
	$('.modal-wrapper .name').html(v.name);
	$('.modal-wrapper .link').attr('href', v.url).html(v.url);
	$('.modal-wrapper .dt').html(moment(v.datetime).format('YYYY-MM-DD HH:mm:ss'));
}

function onSubmit(e) {
	e.preventDefault();
	var cate = $(this).find('select[name="category"]').val().trim();
	var query = $(this).find('input[name="query"]').val().trim();
	if(cate && cate !== '' && query && query !== '')
		axios.get(getPath(cate), getParams(query)).then(onSuccess).catch(onError);
	else
		$(this).find('input[name="query"]').focus();
}

function onSuccess(res) {
	console.log(res);
	var cate = res.config.url.split('/').pop();
	var v = res.data;
	setTotalCnt(v.meta.total_count);
	switch(cate) {
		case 'web':
			setWebLists(v.documents);
			break;
		case 'image':
			setImageLists(v.documents);
			break;
		case 'vclip':
			setClipLists(v.documents);
			break;
		case 'blog':
			setBlogLists(v.documents);
			break;
		case 'book':
			setBookLists(v.documents);
			break;
		case 'cafe':
			setCafeLists(v.documents);
			break;
	}
	
}

function onError(err) {
	console.log(err);
}


/*************** event init ***************/
$('.search-form').submit(onSubmit);


/*************** start init ***************/