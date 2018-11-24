$(document).ready(function(){
	$('#bgm').bgm({'top':'70%'});   //加入bgm
	// $('#navigation-bar').header({'top':'10px'});  //加入导航栏
	// $('#back-to-top').backToTop({'speed':'30'});  //返回顶部
	var allCards = {
			postGraduate : {
				cardValue: $('.card-nav').find('.postgraduate'),
				timer: ''
			},
			recycle : {
				cardValue: $('.card-nav').find('.recycle'),
				timer: ''
			},
			information : {
				cardValue: $('.card-nav').find('.information'),
				timer: ''
			},
			afe : {
				cardValue: $('.card-nav').find('.afe'),
				timer: ''
			},
			rent : {
				cardValue: $('.card-nav').find('.rent'),
				timer: ''
			},
			aboutus : {
				cardValue: $('.card-nav').find('.aboutus'),
				timer: ''
			}
	},
		cardWidth = allCards.postGraduate.cardValue.width(),
		cardHeight = allCards.postGraduate.cardValue.height()
	$('.card-nav a').css('line-height',cardHeight / 6 + 'px');
	$('.card-nav').css('font-size',cardWidth / 4 + 'px');
	$(window).resize(function(){
		cardWidth = allCards.postGraduate.cardValue.width();
		$('.card-nav a').css('line-height',cardHeight / 6 + 'px');
		$('.card-nav').css('font-size',cardWidth / 4 + 'px');
		for(var prop in allCards) {
			(function(thisCard) {
				thisCard.cardValue.css('border-radius',cardWidth / 2);  //所有卡片设置圆角
			}(allCards[prop]));
		}
	})

	for(var prop in allCards) {
		(function(thisCard){
			thisCard.cardValue.css('border-radius',cardWidth / 2);  //所有卡片设置圆角
			thisCard.cardValue.hover(
				function() {
					clearTimeout(thisCard.timer);
					if(!thisCard.cardValue.hasClass('flip')) {
						thisCard.cardValue.addClass('flip');
					}
				},
				function(){
					thisCard.timer = setTimeout(function(){
						thisCard.cardValue.removeClass('flip');
					},1000);
				}
			)
		}(allCards[prop]))
	}
})