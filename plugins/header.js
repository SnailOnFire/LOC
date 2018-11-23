(function($){
    $.fn.extend({
        header: function(options){
            var defaults = {
                'width':'900px',
                'height':'80px',
                'top':'10px',
                'word-spacing':'20px',
                'letter-spacing':'-3px',
                'font-size':'1.8em'
            };
            var htmlAndCss = {
                htmlDom:'<!-------------------- 导航栏开始 --------------------></link>\
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
                        "padding":" 0",
                        "position":" relative",
                        "margin":" 0 auto",
                        "top":" 0",
                        "width":" 0px",
                        "height":" 0px",
                        "line-height":" 0px",
                        "background":" #FFEC8B",
                        "border-radius":" 0px",
                        "-moz-border-radius":" 0px",
                        "-webkit-border-radius":" 0px",
                        "text-align":" center",
                        "white-space":" nowrap",
                        "word-spacing":" 0px",
                        "letter-spacing":" 0px",
                        "overflow":"hidden"
                    },
                    
                    ".nav-sorts a":{
                        "position":" relative",
                        "margin":" auto 10px",
                        "text-decoration":" none",
                        "font-family":" KaiTi",
                        "font-size":" 0",
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
                oCss[".nav-sorts"].wordSpacing = o['word-spacing'];
                oCss[".nav-sorts"].letterSpacing = o['letter-spacing'];
                oCss[".nav-sorts a"].fontSize = o['font-size'];
                oCss[".nav-sorts"].lineHeight = o.height;
                oCss[".nav-sorts"]["border-radius"] = parseInt(o.height) / 2 + 'px';
                oCss[".nav-sorts"]["-moz-border-radius"] = parseInt(o.height) / 2 + 'px';
                oCss[".nav-sorts"]["-webkit-border-radius"] = parseInt(o.height) / 2 + 'px';
                for(var prop in oCss) {
					$(this).find(prop).css(oCss[prop]);
                }
                
                $(this).find('.nav-sorts a').hover(function(){
                    $(this).css(htmlAndCss.action[".nav-sorts a:hover"]);
                },function(){
                    $(this).css(htmlAndCss.action[".nav-sorts a:normal"]);
                });
            });
        }
    })
}(jQuery));