(function($){
    $.fn.extend({
        backToTop: function(options) {
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
        backToHome: function(options){
            var defaults = {
                width: '30px',
                height: '30px',
                top: '88%',
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
                oCss.top = o.top;
                oCss.right = o.right;
                $(this).find('.go-home').css(oCss);
            })
        }
    });
}(jQuery));