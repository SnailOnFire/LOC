$(document).ready(function(){
	// $('#bgm').load('/bgm/bgm.html');   //加入bgm
	$.ajax({
		url:'/bgm/bgm.html',
		success:function(result){
			$('#bgm').html(result);
		},
		error:function(){
			alert('oops，背景音乐加载失败！可刷新重试~');
		}
	});

	$.ajax({
		url:'/header/header.html',
		success:function(result){
			$('#navigation-bar').html(result);
		},
		error:function(){
			alert('oops，导航栏加载失败！可刷新重试~');
		}
	});
})