$(document).ready(function(){
	$('#navigation-bar').header({'width':'80%','height':'12%','top':'20px'},{'color':'red'},'.aboutus',false);  //加入导航栏，第一个参数为导航栏样式，第三个参数为指定链接，第二个参数为指定链接样式，第四个参数为true时把第三个参数的指定项移动到最前端
	$('#back-to-home').backToHome({'top':'95%'});  //返回首页
	$('#content').get(0).onselectstart = new Function('event.returnValue = false;');
	$('#content h1').css('font-size',$('#content').width() / 40 + 'px');
	$('#content p').css('font-size',$('#content').width() / 80 + 'px');
	$(window).resize(function() {
		$('#content h1').css('font-size',$('#content').width() / 40 + 'px');
		$('#content p').css('font-size',$('#content').width() / 80 + 'px');
	});
})