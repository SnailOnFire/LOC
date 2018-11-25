$(document).ready(function(){
	$('#bgm').bgm({'top':'70%'});   //加入bgm
	// $('#navigation-bar').header({'top':'10px'});  //加入导航栏
	// $('#back-to-top').backToTop({'speed':'30'});  //返回顶部
	var allCards = {
			postGraduate : {
				card: $('.card-nav').find('.postgraduate'),
				cardValue: '<br>川<br>大<br>考<br>研<br>',
				timer: '',
				cssTimer: '',
				num: 0
			},
			recycle : {
				card: $('.card-nav').find('.recycle'),
				cardValue: '<br>旧<br>物<br>回<br>收<br>',
				timer: '',
				cssTimer: '',
				num: 0
			},
			information : {
				card: $('.card-nav').find('.information'),
				cardValue: '<br>最<br>新<br>资<br>讯<br>',
				timer: '',
				cssTimer: '',
				num: 0
			},
			afe : {
				card: $('.card-nav').find('.afe'),
				cardValue: '<br>便<br>利<br>生<br>活<br>',
				timer: '',
				cssTimer: '',
				num: 0
			},
			rent : {
				card: $('.card-nav').find('.rent'),
				cardValue: '<br>川<br>大<br>租<br>房<br>',
				timer: '',
				cssTimer: '',
				num: 0
			},
			aboutus : {
				card: $('.card-nav').find('.aboutus'),
				cardValue: '<br>关<br>于<br>我<br>们<br>',
				timer: '',
				cssTimer: '',
				num: 0
			}
	},
		cardWidth = allCards.postGraduate.card.width(),
		cardHeight = allCards.postGraduate.card.height(),
		num = 0,
		thisCard,  //鼠标经过的最后一张卡牌
		lastCard;  //鼠标经过的倒数第二张卡牌
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

	$('.warpper').mousemove(function(){
		if(thisCard) {
			recoverCss(thisCard);
			thisCard = 0;
		}
	});

	$('.warpper .card-nav').mousemove(function(event){
		event.stopPropagation();
	});

	for(var prop in allCards) {
		(function(thisCard){
			thisCard.card.css('border-radius',cardWidth / 2);  //页面初始加载时设置所有卡片的圆角
			thisCard.card.hover(
				function() {
					num++;
					thisCard.num = num;  //根据该数值可以判断鼠标移动到6张卡牌上的顺序
					changeCss(thisCard);  //鼠标在卡牌上时卡牌变大
					clearTimeout(thisCard.timer);  //清除该卡牌上的翻转会原状的定时器
					if(!thisCard.card.hasClass('flip')) {
						flip(thisCard);  //翻转卡牌
					}
					getHoverOrder();
					if(lastCard) {
						recoverCss(lastCard);				
					}
				},
				function(){
					thisCard.timer = setTimeout(function(){
						recover(thisCard);
					},2000);
				}
			)
		}(allCards[prop]))
	}

	function getHoverOrder() {
		var num = [allCards.postGraduate.num, allCards.recycle.num, allCards.information.num, allCards.afe.num, allCards.rent.num, allCards.aboutus.num],
			prop = [allCards.postGraduate, allCards.recycle, allCards.information, allCards.afe, allCards.rent, allCards.aboutus]
			maxNum = 0,
			first = 0,
			second = 0;
		for(var i = 0, len = num.length; i < len; i ++) {
			if(num[i] > maxNum) {
				first = i;
				maxNum = num[i]
			}
		}
		maxNum = 0;
		for(var i = 0, len = num.length; i < len; i ++) {
			if(i == first) {
				continue;
			}
			if(num[i] > maxNum) {
				second = i;
				maxNum = num[i]
			}
		}
		thisCard = prop[first];
		lastCard = prop[second];  //鼠标所在卡牌数字最大，经过的上一张卡牌第二，依此类推可以知道鼠标经过卡牌的顺序
	}

	function changeCss(which) {
		if(which.cardValue == '<br>川<br>大<br>考<br>研<br>') {
			which.card.css({'width':'16%','margin-left':'1%','margin-right':'1%','top':'-5%'});
		}else {
			which.card.css({'width':'16%','margin-left':'-1%','margin-right':'1%','top':'-5%'});
		}  //本张卡牌变大
	}

	function recoverCss(which) {
		if(which.cardValue == '<br>川<br>大<br>考<br>研<br>') {
			which.card.css({'width':'14%','margin-left':'2%','margin-right':'2%','top':'0'});
		}else {
			which.card.css({'width':'14%','margin-left':'0','margin-right':'2%','top':'0'});
		}
	}

	function flip(which) {
		which.card.removeClass('no-flip');
		which.card.addClass('flip');
		setTimeout(function(){
			which.card.html(which.cardValue);
		},250);
	}

	function recover(which) {
		clearTimeout(which.timer);
		which.card.addClass('no-flip');
		which.card.removeClass('flip');
		setTimeout(function(){
			which.card.html('');
		},250);
	}
})