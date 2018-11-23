$(document).ready(function(){
	$('#bgm').bgm({'top':'70%'});   //加入bgm
	// $('#navigation-bar').header({'top':'10px'});  //加入导航栏
	// $('#back-to-top').backToTop({'speed':'30'});  //返回顶部
	var allCards = {
			postGraduate : $('.card-nav').find('.postgraduate'),
			recycle : $('.card-nav').find('.recycle'),
			information : $('.card-nav').find('.information'),
			afe : $('.card-nav').find('.afe'),
			rent : $('.card-nav').find('.rent'),
			aboutus : $('.card-nav').find('.aboutus')
	}
	var	cardWidth = allCards.postGraduate.width() / 2;
	$('.card-nav a').css('line-height',allCards.postGraduate.height() / 6 + 'px');
	$('.card-nav').css('font-size',allCards.postGraduate.width() / 4 + 'px');
	allCards.postGraduate.css('border-radius',cardWidth);
	allCards.recycle.css('border-radius',cardWidth);
	allCards.information.css('border-radius',cardWidth);
	allCards.afe.css('border-radius',cardWidth);
	allCards.rent.css('border-radius',cardWidth);
	allCards.aboutus.css('border-radius',cardWidth);
	$(window).resize(function(){
		$('.card-nav a').css('line-height',allCards.postGraduate.height() / 6 + 'px');
		$('.card-nav').css('font-size',allCards.postGraduate.width() / 4 + 'px');
	})
	for(var prop in allCards) {
		(function(allCards){
			allCards.mouseenter(function(event) {
				event.stopPropagation();
				if(!allCards.hasClass('flip')) {
					allCards.addClass('flip');
					setTimeout(function(){
						allCards.removeClass('flip');
					},2100);
				}
			})
		}(allCards[prop]))
	}
})