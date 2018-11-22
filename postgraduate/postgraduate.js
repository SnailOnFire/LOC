$(document).ready(function(){
    $.ajax({
		url:'/header/header.html',
		success:function(result){
			$('#navigation-bar').html(result);
			var postgraduate = $('#navigation-bar').find('.postgraduate');
			postgraduate.css({'color':'grey'});
		},
		error:function(){
			alert('oops，导航栏加载失败！可刷新重试~');
		}
	});
})