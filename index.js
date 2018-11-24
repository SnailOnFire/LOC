$(document).ready(function(){
	$('#bgm').bgm({'top':'70%'});   //加入bgm
	// $('#navigation-bar').header({'top':'10px'});  //加入导航栏
	// $('#back-to-top').backToTop({'speed':'30'});  //返回顶部
	var	allCards = {
			postGraduate : {
				cardValue: $('.card-nav').find('.postgraduate'),
				hoverCard: $('.card-nav').find('.first-hover'),
				timer: ''
			},
			recycle : {
				cardValue: $('.card-nav').find('.recycle'),
				hoverCard: $('.card-nav').find('.second-hover'),
				timer: ''
			},
			information : {
				cardValue: $('.card-nav').find('.information'),
				hoverCard: $('.card-nav').find('.third-hover'),
				timer: ''
			},
			afe : {
				cardValue: $('.card-nav').find('.afe'),
				hoverCard: $('.card-nav').find('.fourth-hover'),
				timer: ''
			},
			rent : {
				cardValue: $('.card-nav').find('.rent'),
				hoverCard: $('.card-nav').find('.fifth-hover'),
				timer: ''
			},
			aboutus : {
				cardValue: $('.card-nav').find('.aboutus'),
				hoverCard: $('.card-nav').find('.sixth-hover'),
				timer: ''
			}
	},
		firstBlock = $('.card-nav').find('.first-block'),
		cardWidth = firstBlock.width(),
		cardHeight = firstBlock.height();
	$('.card-nav').css({'line-height':cardHeight / 6 + 'px','font-size':cardWidth / 4 + 'px'});
	$('.card-nav>div *').css({'border-radius':cardWidth / 2});  //所有卡片设置圆角
	$(window).resize(function(){
		cardWidth = firstBlock.width();
		cardHeight = firstBlock.height();
		$('.card-nav').css({'line-height':cardHeight / 6 + 'px','font-size':cardWidth / 4 + 'px'});
		$('.card-nav>div *').css({'border-radius':cardWidth / 2});  //所有卡片设置圆角
	})

	for(var prop in allCards) {
		(function(thisCard){
			thisCard.hoverCard.hover(
				function() {
					console.log('enter');
					clearTimeout(thisCard.timer);
					if(!thisCard.cardValue.hasClass('flip')) {
						thisCard.cardValue.addClass('flip');
					}
				},
				function(){
					console.log('leave');
					thisCard.timer = setTimeout(function(){
						thisCard.cardValue.removeClass('flip');
					},1000);
				}
			)
		}(allCards[prop]))
	}
})