/**
 * Created by zhangxiaopeng on 2015/11/13.
 */
(function($){

function mittentroll(ele, opt){
     this.$element=ele;
     this.default={
         speed: 3000,
         pause: 4000,
         'direction':'left',
         mousePause: true
     }
     this.options = $.extend({}, this.defaults, opt);
 }
    mittentroll.prototype={
        'init':function(){
            var self=this;
            this.mtlist=self.$element.find("ul:first");
            this.mtilist=this.mtlist.find('li');
            this.outboxwid=this.mtilist.outerWidth(true);
            if(self.options.auto)
            {
                this.startInterval();
            }
            this.bindevent();

        },
        'SetRolldistance':function(){
            var itemwid=$(this.mtilist.eq(0)).width()+10;
            var amtwid=itemwid * this.mtilist.length;
            this.mtlist.css({
                'width':amtwid+'px'
            });
        },
        'bindevent':function(){
            var self=this;
            $(self.options.prexcls).on("click",function(){
                self.slidetoprex();
            });
            $(self.options.nextcls).on("click",function(){
                self.slidetonext();
            });
            if(self.options.auto)
            {
                this.$element.hover(function(){
                    self.stopInterval();
                },function(){
                    self.startInterval();
                });
            }

        },
        'slidetonext':function(){
            var self=this;
            var outboxwid=(-this.outboxwid)+'px';
            self.options.direction="right";
            self.$element.find("ul:first").animate({
                marginLeft:outboxwid
            },function(){
                $(this).css({marginLeft:"0px"}).find("li:first").appendTo(this);
            });
        },
        'slidetoprex':function(){
            var self=this;
            self.options.direction="left";
            var outboxwid=(-this.outboxwid)+'px';
            this.mtlist.css({
                'marginLeft':outboxwid
            });
            this.mtlist.find('li:last').prependTo(this.mtlist);
            this.mtlist.animate({
                marginLeft:'0px'
            },function(){
            });
        },
        'startInterval':function(){
            var self=this;
            this.intervalId=window.setInterval(function(){
                self.AutoScroll();
            },self.options.speed);
        },
        'AutoScroll':function(){
            var self=this;
            console.log(self.options.direction);
            self.options.direction=="left"?self.slidetoprex():self.slidetonext();
        },
        'stopInterval':function(){
            if(typeof this.intervalId !=='undefined')
            {
                window.clearInterval(this.intervalId);
            }

        }
    }
    $.fn.mittentroll=function(options){
         var mitobj=new mittentroll(this,options);
        mitobj.init();

    }

})(jQuery);