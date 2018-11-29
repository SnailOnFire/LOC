(function($){
	$.fn.extend({
		bgm:function (options) {    //背景音乐模块
			var defaults = {   //默认结构以及布局
				width: '410px',
				height: '100px',
				top: '70%',
				left: '0',
			};
			var htmlDomCss = {
				htmlDom: '<div class="background-music">\
							<audio id="playing-song" autoplay="autoplay">\
								<source src="/plugins/music/Carly Rae Jepsen-Curiosity.mp3" type="audio/mpeg">\
								<embed src="/plugins/music/Carly Rae Jepsen-Curiosity.mp3">\
							</audio>\
							<div class="control-button"></div>\
							<div class="player">\
								<p class="song-name"></p>\
								<div class="control-list">\
									<div class="controllers">\
										<div class="controller last-song"></div>\
										<div class="controller pause-play"></div>\
										<div class="controller next-song"></div>\
										<div class="controller time">\
											<div class="show-time">00:00/00:00</div>\
											<div class="progress-bar">\
												<div class="time-bars dark-progress-bar"></div>\
												<div class="time-bars darker-progress-bar"></div>\
												<div class="time-bars white-progress-bar"></div>\
											</div>\
										</div>\
										<div class="controller volume">\
											<div class="volume-button"></div>\
											<div class="volume-bar">\
												<div class="volume-bars background-volume-bar"></div>\
												<div class="volume-bars mask-volume-bar"></div>  <!--奇奇怪怪的是直接修改current-volume-bar的height会导致当点击到current-volume-bar上时volume-bar的event.offsetY值变化，且变化的值为current-volume-bar的height变化的一半-->\
												<div class="volume-bars current-volume-bar"></div>\
											</div>\
										</div>\
										<div class="controller mode"></div>\
									</div>\
								</div>\
							</div>\
						</div>',
				htmlCss:{
					'.background-music': {
						"width":"0",
						"height":"0",
						"margin": "0",
						"padding": "0",
						"font-family": "arial",
						"position": "fixed",
						"top": "0",
						"left": "0",
						"display": "flex",
						"flex-wrap": "nowrap",
						"justify-content": "flex-start",
						"align-items": "center",
						"overflow": "hidden",
						"z-index": "100"
					},
					
					'.control-button': {
						"position": "relative",
						"left": "-20px",
						"width": "30px",
						"height": "60px",
						"font-family": "STXingkai",
						"font-size": "18px",
						"color": "#FFC125",
						"font-weight": "bold",
						"line-height": "60px",
						"padding": "0 0 0 10px",
						"text-align": "center",
						"overflow": "hidden",
						"border-radius": "0 30px 30px 0",
						"-moz-border-radius": "0 30px 30px 0",
						"-webkit-border-radius": "0 30px 30px 0",
						"background": "#54FF9F"
					},
					
					'.player': {
						"display": "none",
						"position": "relative",
						"left": "-30px",
						"width": "0px",
						"height": "60px",
						"border-radius": "0 30px 30px 0",
						"-moz-border-radius": "0 30px 30px 0",
						"-webkit-border-radius": "0 30px 30px 0",
						"background": "#54FF9F",
						"cursor": "default"
					},
					
					'.song-name': {
						"position": "absolute",
						"left": "10%",
						"width": "80%",
						"height": "25px",
						"line-height": "25px",
						"text-align": "center",
						"font-size": "16px",
						"color": "white",
						"white-space": "nowrap",
						"overflow": "hidden",
						"cursor": "default"
					},
					
					'.control-list': {
						"position": "absolute",
						"left": "10%",
						"top": "25px",
						"width": "80%",
						"height": "35px"
					},
					
					'.controllers': {
						"position": "absolute",
						"top": "50%",
						"margin-top": "-12.5px",
						"width": "100%",
						"height": "100%",
						"white-space": "nowrap"
					},
					
					'.controller': {
						"cursor": "pointer",
						"display": "inline-block",
						"width": "7.8125%",
						"height": "25px",
						"overflow": "hidden"
					},
					
					'.last-song': {
						"margin-right": "5px",
						"background": "url('/plugins/icons/last_icon.png') no-repeat"
					},
					
					'.pause-play': {
						"margin-right": "5px",
						"background": "url('/plugins/icons/pause_icon.png') no-repeat"
					},
					
					'.next-song': {
						"background": "url('/plugins/icons/next_icon.png') no-repeat"
					},
					
					'.time': {
						"position": "relative",
						"width": "50%",
						"cursor": "default"
					},
					
					'.show-time': {
						"display": "inline-block",
						"width": "40%",
						"height": "25px",
						"line-height": "25px",
						"font-size": "12px",
						"color": "white",
						"text-align": "center",
						"overflow": "hidden"
					},
					
					'.progress-bar': {
						"display": "inline-block",
						"position": "absolute",
						"top": "50%",
						"margin-left": "4px",
						"margin-top": "-2px",
						"width": "55%",
						"height": "4px",
						"cursor": "pointer"
					},
					
					'.time-bars': {
						"display": "inline-block",
						"position": "absolute",
						"top": "0",
						"left": "0",
						"height": "100%",
						"border-radius": "2px",
						"-moz-border-radius": "2px",
						"-webkit-border-radius": "2px"
					},
					
					'.white-progress-bar': {
						"width": "0%",
						"background": "white"
					},
					
					'.darker-progress-bar': {
						"width": "0%",
						"background": "#7CFC00"
					},
					
					'.dark-progress-bar': {
						"width": "100%",
						"background": "grey"
					},
					
					'.volume': {
						"position": "relative",
						"overflow": "visible",
						"margin-right": "5px"
					},
					
					'.volume-button': {
						"width": "100%",
						"height": "100%",
						"background": "url('/plugins/icons/volume_icon.png') no-repeat"
					},
					
					'.volume-bar': {
						"display": "none",
						"position": "absolute",
						"bottom": "0",
						"left": "50%",
						"margin-left": "-5px",
						"width": "40%",
						"height": "50px"
					},
					
					'.volume-bars': {
						"position": "absolute",
						"left": "0",
						"width": "100%",
						"height": "100%",
						"border-radius": "5px",
						"-moz-border-radius": "5px",
						"-webkit-border-radius": "5px"
					},
					
					'.background-volume-bar': {
						"top": "0",
						"background": "grey"
					},
					
					'.mask-volume-bar': {
						"top": "0",
						"z-index": "200"
					},
					
					'.current-volume-bar': {
						"bottom": "0",
						"background": "white"
					},
					
					'.mode': {
						"background": "url('/plugins/icons/quene_icon.png') no-repeat"
					}
				}
			};
			var o = $.extend(defaults,options),
				bgmCss = htmlDomCss.htmlCss;
			return this.each(function() {
				$(this).html(htmlDomCss.htmlDom);  //插入DOM元素
				//下面开始进行样式设置
				bgmCss['.background-music'].width = o.width;
				bgmCss['.background-music'].height = o.height;
				bgmCss['.background-music'].top = o.top;
				bgmCss['.background-music'].left = o.left;
				for(var prop in bgmCss) {
					$(this).find(prop).css(bgmCss[prop]);
				}
				//样式设置结束

				var backgroundMusicName = ['Carly Rae Jepsen-Curiosity', 'Coldplay-Viva La Vida', 'Delacey-Dream It Possible', 'Passenger-Let Her Go', 'The Chainsmokers  Coldplay-Something Just Like This', '韩雪-想起', '姚斯婷 -A Little Love', '郁可唯-时间煮雨'],
				songNum = 0,   			//正在播放的编号，默认第一首
				backgroundMusicNum = backgroundMusicName.length,  	//当前歌曲列表长度
				textScrollTimer,  		//定时让歌曲名字滚动
				playerShowTimeTimer,  	//刷新当前播放进度
				volumeSettingTimer,  	//定时弹出音量调节框
				hideControlButtonTimer,	//隐藏小圆球的定时器
				playingSongName = backgroundMusicName[songNum],		//正在播放的歌曲的名字，默认第一首
				songDuration,			//歌曲时间
				songMinutes,   			//歌曲时间分钟部分
				songSeconds,   			//歌曲时间秒钟部分
				tempVolume,	   			//记录静音前的音量，在取消静音后恢复之前的音量
				controlButton = $('.background-music').find('.control-button'),  		 //页面小圆球
				audioPlayingSong = $('.background-music').find('#playing-song').get(0),  //正在播放的歌曲的信息
				audioPlayer = $('.background-music').find('.player'),  					 //播放器主界面
				showingSongName = $('.background-music').find('.song-name'),  			 //播放器内展示歌曲名
				controlList = $('.background-music').find('.control-list'),				 //控制栏
				lastSongButton =$('.background-music').find('.last-song'),  			 //上一首
				playPauseButton = $('.background-music').find('.pause-play'), 		 	 //播放/暂停
				nextSongButton =$('.background-music').find('.next-song'),  			 //下一首
				showingTime = $('.background-music').find('.show-time'),  				 //时间显示
				progressBar = $('.background-music').find('.progress-bar'),  			 //进度条背景
				loadedProgress = $('.background-music').find('.darker-progress-bar'),  	 //已加载的进度
				currentProgress = $('.background-music').find('.white-progress-bar'),  	 //播放进度条
				volumeButton = $('.background-music').find('.volume-button'),  			 //音量键
				volumeBar = $('.background-music').find('.volume-bar'),  				 //音量条
				currentVolume = $('.background-music').find('.current-volume-bar'),  	 //当前音量
				modeButton = $('.background-music').find('.mode');  					 //模式切换
				
				$('.background-music').get(0).onselectstart=new Function('event.returnValue=false;');  //取消复制功能

				showingSongName.text(playingSongName);  //刷新默认歌曲名

				$('.background-music').mouseleave(function(event) {   //点击鼠标之后有一段时间无法识别player的mouseleave，将其绑定在它的父级上即可解决
					clearTimeout(hideControlButtonTimer);
					event.stopPropagation();
					audioPlayer.stop();
					audioPlayer.animate({'width':'0px'});
					textScrollStop();
					playerHideTime();
					showingSongName.hide();
					controlList.hide();
					hideControlButtonTimer = setTimeout(function() {
						audioPlayer.hide();
						controlButton.show();
						controlButton.animate({'width':'30px'});
					},500);
				});

				audioPlayer.mouseleave(function(event) {
					event.stopPropagation();
				});

				controlButton.mouseenter(function(event) {
					event.stopPropagation();
					clearTimeout(hideControlButtonTimer);
					$(this).stop();
					$(this).animate({'width':'100px'});
					$(this).text('背景音乐');
					$(this).css('cursor','pointer');
				});

				controlButton.mouseleave(function(event) {
					event.stopPropagation();
					$(this).stop();
					$(this).animate({'width':'30px'});
					$(this).text('');
				});

				controlButton.click(function(event) {
					event.stopPropagation();
					$(this).stop();
					$(this).css({'width':'0px'});
					$(this).hide();
					audioPlayer.show();
					getPlayerShowTime();
					audioPlayer.animate({'width':'400px'},function() {
						showingSongName.show();
						controlList.show();
						if(!audioPlayingSong.paused) {
							textScroll();
							playerShowTime();
						}
					});
				});

				lastSongButton.click(function(event) {
					event.stopPropagation();
					if(songNum) {
						songNum--;
					}
					else{
						songNum = backgroundMusicNum - 1;
					}
					changeSong();
				});

				nextSongButton.click(function(event) {
					event.stopPropagation();
					nextSong();
				});

				playPauseButton.click(function(event) {
					event.stopPropagation();
					if(audioPlayingSong.paused) {
						audioPlayingSong.play();
						$(this).css('background-image','url("/plugins/icons/pause_icon.png")');
						textScroll();
						playerShowTime();
						return;
					}
					audioPlayingSong.pause();
					$(this).css('background-image','url("/plugins/icons/play_icon.png")');
					textScrollStop();
					playerHideTime();
				});

				volumeButton.click(function(event) {
					event.stopPropagation();
					clearTimeout(volumeSettingTimer);
					if(audioPlayingSong.volume) {
						tempVolume = audioPlayingSong.volume;
						audioPlayingSong.volume = 0;
						$(this).css('background-image','url("/plugins/icons/mute_icon.png")');
					}
					else{
						if(0.5 == tempVolume && 0 == currentVolume.height()) {
							currentVolume.css('height','50%');
						}
						audioPlayingSong.volume = tempVolume;
						$(this).css('background-image','url("/plugins/icons/volume_icon.png")');
					}
				});

				volumeButton.mouseenter(function(event) {
					event.stopPropagation();
					volumeSettingTimer = setTimeout(function() {
						volumeBar.show();
						volumeButton.hide();
					},1000)
				});

				volumeButton.mouseleave(function(event) {
					event.stopPropagation();
					clearTimeout(volumeSettingTimer);
				});

				volumeBar.click(function(event) {
					event.stopPropagation();
					var volumeBarHeight = volumeBar.height();
					currentVolume.css('height',function() {
						return (volumeBarHeight - event.offsetY) / volumeBarHeight * 100 + '%';
					});
					audioPlayingSong.volume = (volumeBarHeight - event.offsetY) / volumeBarHeight;
					if(audioPlayingSong.volume < 0.1) {
						audioPlayingSong.volume = 0;
						tempVolume = 0.5;
						currentVolume.css('height','0%');
					}
					else if(audioPlayingSong.volume > 0.9) {
						audioPlayingSong.volume = 1;
						currentVolume.css('height','100%');
					}

					if(audioPlayingSong.volume) {
						volumeButton.css('background-image','url("/plugins/icons/volume_icon.png")');
					}else {
						volumeButton.css('background-image','url("/plugins/icons/mute_icon.png")');
					}
				});

				volumeBar.mousemove(function(event) {
					event.stopPropagation();
				});

				audioPlayer.mousemove(function(event) {
					event.stopPropagation();
					volumeButton.show();
					volumeBar.hide();
				});

				progressBar.click(function(event) {
					audioPlayingSong.ended = false;
					event.stopPropagation();
					var progressBarWidth = progressBar.width(),
						playingPercent = event.offsetX / progressBarWidth * 100;
					currentProgress.css('width',playingPercent + '%');
					audioPlayingSong.currentTime = (event.offsetX / progressBarWidth) * songDuration;
					getPlayerShowTime();
				});

				modeButton.click(function(evevt) {
					event.stopPropagation();
					if(audioPlayingSong.loop) {
						audioPlayingSong.loop = false;
						modeButton.css('background','url("/plugins/icons/quene_icon.png")');
					}
					else {
						audioPlayingSong.loop = true;
						modeButton.css('background','url("/plugins/icons/loop_icon.png")');
					}
				});

				audioPlayingSong.addEventListener('canplay',function() {
					songDuration = audioPlayingSong.duration;
					var tempSongDuration = Math.ceil(audioPlayingSong.duration);
					songMinutes = Math.floor(tempSongDuration / 60);
					songSeconds = Math.ceil(tempSongDuration % 60);
					if(songMinutes < 10) {
						songMinutes = '0' + songMinutes;
					}
					if(songSeconds < 10) {
						songSeconds = '0' + songSeconds;
					}
				});

				audioPlayingSong.addEventListener('ended',function() {
					// playerHideTime();
					// playPauseButton.css('background-image','url("/plugins/icons/play_icon.png")');  //只播放一首歌结束
					nextSong();   //继续播放下一首
				});

				function changeSong() {
					audioPlayingSong.ended = false;
					audioPlayingSong.paused = false;
					playingSongName = backgroundMusicName[songNum];  //正在播放的歌曲的名字
					audioPlayingSong.src = '/plugins/music/' + playingSongName + '.mp3';
					textScroll();  //刷新歌曲名
					getPlayerShowTime();  //刷新时间信息
				}

				function nextSong() {
					if(songNum == backgroundMusicNum - 1) {
						songNum = 0;
					}
					else{
						songNum ++;
					}
					changeSong();
				}

				function textScroll() {
					clearInterval(textScrollTimer);
					var songName =  '                    ' + playingSongName + '----------',
						songNameArr = songName.split('');
					textScrollTimer = setInterval(function() {
						var tempText = songNameArr.shift();
						songNameArr.push(tempText);
						var	tempSongNameArr = songNameArr.join('');
						showingSongName.text(tempSongNameArr);
					},80);
				}

				function textScrollStop() {
					clearInterval(textScrollTimer);
					showingSongName.text(playingSongName);
				}
				
				function playerShowTime() {
					playerShowTimeTimer = setInterval(function() {
						getPlayerShowTime();
					},500);
				}

				function playerHideTime() {
					clearInterval(playerShowTimeTimer);
				}

				function getPlayerShowTime() {
					var time = Math.ceil(audioPlayingSong.currentTime),
						playingPercent = audioPlayingSong.currentTime / songDuration * 100,
						minutes = Math.floor(time / 60),
						seconds = Math.ceil(time % 60),
						timeRanges = audioPlayingSong.buffered,
						timeBuffered,
						bufferPercent;
						if(timeRanges.length) {
							timeBuffered = timeRanges.end(timeRanges.length - 1);
							bufferPercent = timeBuffered / audioPlayingSong.duration * 100;
							loadedProgress.css('width',bufferPercent + '%');
						}
					currentProgress.css('width',playingPercent + '%');
					if(minutes < 10) {
						minutes = '0' + minutes;
					}
					if(seconds < 10) {
						seconds = '0' + seconds;
					}
					showingTime.text(minutes + ':' + seconds + '/' + songMinutes + ':' + songSeconds);
				}
			});
        },
        header: function(options,cssOpitions,target,change){    //导航栏模块
            var defaults = {
                'width':'900px',
                'height':'80px',
                'top':'10px',
            };
            var htmlAndCss = {
                htmlDom:'<!-------------------- 导航栏开始 -------------------->\
                        <div class="nav-sorts">\
                            <a href="/postgraduate/postgraduate.html" class="postgraduate">川大考研</a>\
                            <a href="/recycle/recycle.html" class="recycle">旧物回收</a>\
                            <a href="/information/information.html" class="information">最新资讯</a>\
                            <a href="/afe/afe.html" class="afe">便利生活</a>\
                            <a href="/rent/rent.html" class="rent">川大租房</a>\
                            <a href="/aboutus/aboutus.html" class="aboutus">关于我们</a>\
                        </div>\
                        <!-------------------- 导航栏结束 -------------------->',
                css:{
                    ".nav-sorts":{
                        "position":" absolute",
						"top":" 0",
						"left":" 0",
                        "width":" 0px",
						"height":" 0px",
						'min-width':'800px',
                        "background":" #FFEC8B",
                        "text-align":" center",
                        "white-space":" nowrap",
                        "letter-spacing":" 0px",
                        "overflow":"hidden"
                    },
                    
                    ".nav-sorts a":{
						"display" : "inline-block",
						"position":" relative",
						"width": "15%",
						"height": "100%",
                        "text-decoration":" none",
                        "font-family":" KaiTi",
                        "font-weight":" bold",
                        "color":" #8A2BE2"
                    } 
                },
                action: {
                    ".nav-sorts a:visited":{
                        "color":" #8A2BE2"
                    },
                    
                    ".nav-sorts a:hover":{
                        "color":" #CD0000",
                        "left":" -0.1em",
                        "top":" -0.1em",
                        "text-shadow":" 0.1em 0.1em #999"
                    },

                    ".nav-sorts a:normal":{
                        "color":" #8A2BE2",
                        "left":" 0",
                        "top":" 0",
                        "text-shadow":" none"
                    }
                }
            };
            var o = $.extend(defaults,options),
                oCss = htmlAndCss.css;
            return this.each(function(){
                $(this).html(htmlAndCss.htmlDom);
                oCss[".nav-sorts"].width = o.width;
                oCss[".nav-sorts"].height = o.height;
				oCss[".nav-sorts"].top = o.top;
                oCss[".nav-sorts"].letterSpacing = o['letter-spacing'];
                for(var prop in oCss) {
					$(this).find(prop).css(oCss[prop]);
				}
				setCss();

				$(window).resize(function(){
					setCss();
				})
				
                $(this).find('.nav-sorts a').hover(function(){
                    $(this).css(htmlAndCss.action[".nav-sorts a:hover"]);
                },function(){
                    $(this).css(htmlAndCss.action[".nav-sorts a:normal"]);
				});

				if($('.nav-sorts').find(target).length) {
					changeNavCssAndOrder();
				}

				function setCss() {
					$(".nav-sorts").css({'left': ($('.warpper').width() - $('.nav-sorts').width()) / 2 +'px',
									lineHeight: $('.nav-sorts').height() + 'px',
									'border-radius':$('.nav-sorts').height() / 2 + 'px',
									'-moz-border-radius':$('.nav-sorts').height() / 2 + 'px',
									'-webkit-border-radius':$('.nav-sorts').height() / 2 + 'px',
									'letter-spacing': 0 - $('.nav-sorts').width() / 250 + 'px',
									'word-spacing': $('.nav-sorts').width() / 50 + 'px'});
					$('.nav-sorts a').css('font-size', $('.nav-sorts').width() / 28 + 'px');
				}

				function changeNavCssAndOrder(){
					var defaults = {
						"color":"red",
						"left":" -0.1em",
						"top":" -0.1em",
						"font-size":'',
                        "text-shadow":" 0.1em 0.1em #999"
					},
						that;
					var o = $.extend(defaults,cssOpitions);
					that = $('.nav-sorts').find(target);
					that.unbind();
					o.fontSize = $('.nav-sorts').width() / 28 + 'px';
					that.css(o);
					if(change) {
						that.clone().insertBefore($('.nav-sorts').find('.postgraduate'));
						that.eq(0).remove();
					}
				}
            });
		},
		backToTop: function(options) {    //返回顶部
            var defaults = {
                width: '30px',
                height: '30px',
                top: '93%',
                right: '1%',
                speed: '30'
            }
            var htmlAndCss = {
                htmlCss: {
                    'display': 'none',
                    'position': 'fixed',
                    'width': '',
                    'height': '',
                    'line-height': '',
                    'top': '',
                    'right': '',
                    'text-align':'center',
                    'font-size': '12px',
                    'background-color':'white',
                    'opacity':'0.7',
                    'color':'#999',
                    'border-radius':'50%',
                    '-webkit-border-radius':'50%',
                    '-moz-border-radius':'50%',
                    'cursor':'pointer',
                    'z-index':'1000'
                }
            }
            var o = $.extend(defaults,options),
                oCss = htmlAndCss.htmlCss;
            return this.each(function(){
                $(this).text('TOP');
                oCss.width = o.width;
                oCss.height = o.height;
                oCss['line-height'] = o.height;
                oCss.top = o.top;
                oCss.right = o.right;
                $(this).css(oCss);
                var that = $(this),
                    timer,
                    start = false;
                setTimeout(function(){
                    start = true;
                },10)
                $(window).scroll(function(){  //页面加载会触发一次scroll，start用来防止加载页面时出现按钮
                    if(start) {
                        clearTimeout(timer);
                        that.css('display','block');
                        timer = setTimeout(function(){
                            that.css('display','none');
                        },2000)
                    }
                })
                that.click(function(event){
                    event.stopPropagation();
                    var timer = setInterval(function(){
                        start = false;
                        that.css('display','none');
                        if($(window).get(0).pageYOffset > 0) {
                            $(window).get(0).scrollBy(0,0-o.speed);
                        }else {
                            setTimeout(function(){
                                start = true;
                            },10);
                            clearInterval(timer);
                        }
                    },1)
                })
            })
        },
        backToHome: function(options){    //返回首页
            var defaults = {
                width: '30px',
                height: '30px',
				top: '88%',
				bottom:'',
				left:'',
                right: '1%',
            }
            var htmlAndCss = {
                htmlDom:'<a class="go-home" href="/">首页</a>',
                htmlCss:{
                    'position': 'fixed',
                    'width': '',
                    'height': '',
                    'line-height': '',
					'top': '',
					'bottom':'',
					'left':'',
                    'right': '',
                    'text-align':'center',
                    'font-size': '12px',
                    'background-color':'white',
                    'opacity':'0.7',
                    'color':'#999',
                    'border-radius':'50%',
                    '-webkit-border-radius':'50%',
                    '-moz-border-radius':'50%',
                    'cursor':'pointer',
                    'text-decoration':'none',
                    'overflow':'hidden',
                    'z-index':'1000'
                }
            }
            var o = $.extend(defaults,options),
                oCss = htmlAndCss.htmlCss;
            return this.each(function(){
                $(this).html(htmlAndCss.htmlDom);
                oCss.width = o.width;
                oCss.height = o.height;
                oCss['line-height'] = o.height;
				if(options.bottom) {
					oCss.bottom = o.bottom;
				}
				else {
					oCss.top = o.top;
				}
				if(options.left) {
					oCss.left = o.left;
				}
				else {
					oCss.right = o.right;
				}
                $(this).find('.go-home').css(oCss);
            })
		}
	})
}(jQuery))