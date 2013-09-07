function loadTrendDescriptions(){$("#trends a").each(function(){var e=$(this);var t=e.parent().find("em");if(t.length){var n=e.text();var r=t.text().replace(new RegExp(n.replace(/([^\w])/gi,"\\$1"),"gi"),"<strong>"+n+"</strong>");var i=e.attr("title").length?e.attr("title"):e.attr("name");page.trendDescriptions[i]=[n,r]}})}function FrontPage(){return $.extend(this,{$trends:$("#trends"),$trendTip:$(".trendtip:eq(0)")})}window.twttr=window.twttr||{};var processSummizeInternal=function(e){var t=page.trendDescriptions[page.query];if(t){$("#trend_info").hide();$("#trend_description span").text(_("%{trend} is a popular topic on Twitter right now.",{trend:t[0]}));$("#trend").text(_("%{trend}",{trend:t[0]}));$("#trend_description p").html(t[1]);$("#trend_description").show()}else{$("#trend_description").hide();$("#trend_info").show()}t&&t[1].length>0?$(".trenddesc").show():$(".trenddesc").hide()};$.fn.isSearchLink=function(e){return this.each(function(){var e=$(this);e.click(function(e){$("#trends_list li.active a").removeClass("active")})})};$(document).ready(function(){page.trendDescriptions={};loadTrendDescriptions()});window.twttr.bounds=window.twttr.bounds||{};$.extend(twttr.bounds,{Bounds:function(e,t,n,r){this.x=e;this.y=t;this.width=n;this.height=r}});$.extend(twttr.bounds.Bounds.prototype,{encloses:function(e,t){return e>this.x&&e<this.x+this.width&&t>this.y&&t<this.y+this.height},toString:function(){return"("+this.x+","+this.y+") "+this.width+"x"+this.height}});(function(e){e.fn.extend({bounds:function(){var e=this.eq(0);var t=e.offset();return new twttr.bounds.Bounds(t.left,t.top,e.outerWidth(),e.outerHeight())}})})(jQuery);(function(e){e.extend(window,{TrendTip:{parseIntDefault:function(e,t){t=t||0;var n=parseInt(e);return isNaN(n)?t:n},clearBounds:function(){this.data("bounds",[])},addToBounds:function(e){if(!this.data("bounds")){this.data("bounds",[])}this.data("bounds").push(e)},enclosing:function(t,n){if(!this.data("bounds")){this.data("bounds",[])}var r=false;e.each(this.data("bounds"),function(e,i){if(i.encloses(t,n)){r=true}});return r},clearScrollInterval:function(){clearInterval(this.data("interval"))},setScrollInterval:function(e){if(this.data("interval")){this.clearScrollInterval()}this.data("interval",setInterval(e,30))},duplicateContent:function(t){var n=0;t.children().each(function(){n+=e(this).outerWidth(true);t.append(e(this).clone())});t.css({zoom:1,width:2*n+"px"});return n},initScroller:function(){var e=this;var t=this.duplicateContent(e);var n=TrendTip.parseIntDefault(e.css("left"),0);var r=function(){n=n%t-1;e.css({left:n})};e.bind("trendEnter",function(){e.clearScrollInterval()}).bind("trendLeave",function(){e.setScrollInterval(r)}).trigger("trendLeave")}}});e.extend(e.fn,{trendTip:function(){var t=false;var n=e(this);e.extend(n,TrendTip);n.initScroller();n.find("li a").each(function(){var r=e(this).closest("li");var i={mouseenter:function(t){var r=e(this);e("#trends .inner").trigger("trendLeave");if(n.oldCapturedTrend){n.oldCapturedTrend.trigger("trendLeave")}n.oldCapturedTrend=r;n.addToBounds(r.bounds());if(n.enclosing(t.pageX,t.pageY)){e("#trends .inner").trigger("trendEnter");r.trigger("trendEnter");var i=function(t){if(!n.enclosing(t.pageX,t.pageY)){e("#trends .inner").trigger("trendLeave");r.trigger("trendLeave")}};e(document).bind("mousemove",i);r.bind("trendLeave",function(t){n.clearBounds();e(document).unbind("mousemove",i)})}},trendenter:function(){if(!n.hoveringTrend){var i=e(".trendtip");var s=e(this).offset();var o=Math.round(e(this).outerWidth()/2);var u=Math.round(i.outerWidth()/2);var a=r.find("a").text();var f=r.find("em.description").html();i.find(".trendtip-trend").html(a);i.find(".trendtip-trend").attr("href",e(this).attr("href")).attr("name",a);if(e.trim(f)!=""){i.find(".trendtip-why").show();i.find(".trendtip-desc").html(f)}else{i.find(".trendtip-why").hide()}t=setTimeout(function(){clearTimeout(t);r.find("a.search_link").addClass("active");i.css({top:s.top+35,left:s.left+o-u,position:"absolute",zIndex:1e4});i.fadeIn("fast",function(){n.hoveringTrend=true});n.addToBounds(i.bounds())},400)}},trendleave:function(r){clearTimeout(t);e("#trends a.search_link").removeClass("active");if(n.hoveringTrend){var i=e(".trendtip");i.fadeOut("fast");n.hoveringTrend=false}}};e(this).mouseenter(i.mouseenter).bind("trendEnter",i.trendenter).bind("trendLeave",i.trendleave)});return this}})})(jQuery);$.extend(FrontPage.prototype,{init:function(){this.initTrendHover()},initTrendHover:function(){this.hoveringTrend=false;var e=this;$("#trends ul").trendTip()}});jQuery