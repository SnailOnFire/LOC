$(document).ready(function(){
	$('#bgm').bgm({'top':'70%'});   //加入bgm
	// $('#navigation-bar').header({'top':'10px'});  //加入导航栏
	// $('#back-to-top').backToTop({'speed':'30'});  //返回顶部
	var allCards = {
			postGraduate : {
				card: $('.card-nav').find('.postgraduate'),
				cardValue: '<br>川<br>大<br>考<br>研<br>',
				timer: ''
			},
			recycle : {
				card: $('.card-nav').find('.recycle'),
				cardValue: '<br>旧<br>物<br>回<br>收<br>',
				timer: ''
			},
			information : {
				card: $('.card-nav').find('.information'),
				cardValue: '<br>最<br>新<br>资<br>讯<br>',
				timer: ''
			},
			afe : {
				card: $('.card-nav').find('.afe'),
				cardValue: '<br>便<br>利<br>生<br>活<br>',
				timer: ''
			},
			rent : {
				card: $('.card-nav').find('.rent'),
				cardValue: '<br>川<br>大<br>租<br>房<br>',
				timer: ''
			},
			aboutus : {
				card: $('.card-nav').find('.aboutus'),
				cardValue: '<br>关<br>于<br>我<br>们<br>',
				timer: ''
			}
	},
		cardWidth = allCards.postGraduate.card.width(),
		cardHeight = allCards.postGraduate.card.height()
	$('.card-nav a').css('line-height',cardHeight / 6 + 'px');
	$('.card-nav').css('font-size',cardWidth / 4 + 'px');
	$(window).resize(function(){
		cardWidth = allCards.postGraduate.card.width();
		$('.card-nav a').css('line-height',cardHeight / 6 + 'px');
		$('.card-nav').css('font-size',cardWidth / 4 + 'px');
		for(var prop in allCards) {
			(function(thisCard) {
				thisCard.card.css('border-radius',cardWidth / 2);  //所有卡片设置圆角
			}(allCards[prop]));
		}
	})

	for(var prop in allCards) {
		(function(thisCard){
			thisCard.card.css('border-radius',cardWidth / 2);  //所有卡片设置圆角
			thisCard.card.hover(
				function() {
					clearTimeout(thisCard.timer);
					if(!thisCard.card.hasClass('flip')) {
						thisCard.card.addClass('flip');
						setTimeout(function(){
							thisCard.card.html(thisCard.cardValue);
						},250);
					}
				},
				function(){
					thisCard.timer = setTimeout(function(){
						thisCard.card.removeClass('flip');
						setTimeout(function(){
							thisCard.card.html('');
						},250);
					},1000);
				}
			)
		}(allCards[prop]))
	}
})