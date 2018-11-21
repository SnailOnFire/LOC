$(document).ready(function(){
	(function backgroundMusic() {    //背景音乐模块
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
		controlButton = $('.warpper').find('.control-button'),  		//页面小圆球
		audioPlayingSong = $('.warpper').find('#playing-song').get(0),  //正在播放的歌曲的信息
		audioPlayer = $('.warpper').find('.player'),  					//播放器主界面
		showingSongName = $('.warpper').find('.song-name'),  			//播放器内展示歌曲名
		controlList = $('.warpper').find('.control-list'),				//控制栏
		lastSongButton =$('.warpper').find('.last-song'),  				//上一首
		playPauseButton = $('.warpper').find('.pause-play'), 		 	//播放/暂停
		nextSongButton =$('.warpper').find('.next-song'),  				//下一首
		showingTime = $('.warpper').find('.show-time'),  				//时间显示
		progressBar = $('.warpper').find('.progress-bar'),  			//进度条背景
		loadedProgress = $('.warpper').find('.darker-progress-bar'),  	//已加载的进度
		currentProgress = $('.warpper').find('.white-progress-bar'),  	//播放进度条
		volumeButton = $('.warpper').find('.volume-button'),  			//音量键
		volumeBar = $('.warpper').find('.volume-bar'),  				//音量条
		currentVolume = $('.warpper').find('.current-volume-bar'),  	//当前音量
		modeButton = $('.warpper').find('.mode');  						//模式切换
		
		$('.warpper').get(0).onselectstart=new Function('event.returnValue=false;');  //取消复制功能

		showingSongName.text(playingSongName);  //刷新默认歌曲名

		$('.warpper .background-music').mouseleave(function(event) {   //点击鼠标之后有一段时间无法识别player的mouseleave，将其绑定在它的父级上即可解决
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
				$(this).css('background-image','url("/LOC/image/pause_icon.png")');
				textScroll();
				playerShowTime();
				return;
			}
			audioPlayingSong.pause();
			$(this).css('background-image','url("/LOC/image/play_icon.png")');
			textScrollStop();
			playerHideTime();
		});

		volumeButton.click(function(event) {
			event.stopPropagation();
			clearTimeout(volumeSettingTimer);
			if(audioPlayingSong.volume) {
				tempVolume = audioPlayingSong.volume;
				audioPlayingSong.volume = 0;
				$(this).css('background-image','url("/LOC/image/mute_icon.png")');
			}
			else{
				audioPlayingSong.volume = tempVolume;
				$(this).css('background-image','url("/LOC/image/volume_icon.png")');
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
				currentVolume.css('height','0%');
			}
			else if(audioPlayingSong.volume > 0.9) {
				audioPlayingSong.volume = 1;
				currentVolume.css('height','100%');
			}

			if(audioPlayingSong.volume) {
				volumeButton.css('background-image','url("/LOC/image/volume_icon.png")');
			}else {
				volumeButton.css('background-image','url("/LOC/image/mute_icon.png")');
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
				modeButton.css('background','url("/LOC/image/quene_icon.png")');
			}
			else {
				audioPlayingSong.loop = true;
				modeButton.css('background','url("/LOC/image/loop_icon.png")');
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
			// playPauseButton.css('background-image','url("/LOC/image/play_icon.png")');  //只播放一首歌结束
			nextSong();   //继续播放下一首
		});

		function changeSong() {
			audioPlayingSong.ended = false;
			audioPlayingSong.paused = false;
			playingSongName = backgroundMusicName[songNum];  //正在播放的歌曲的名字
			audioPlayingSong.src = '/LOC/music/' + playingSongName + '.mp3';
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
	}());
})