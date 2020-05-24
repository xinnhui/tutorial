(function ($) {
    'use strict'

    function Slider($elem, options) {
        this.$elem = $elem;
        this.options = options;

        this.$items = this.$elem.find('.slider-item');
        this.$indicators = this.$elem.find('.slider-indicator');


        this.$controlLeft = this.$elem.find('.slider-control-left');
        this.$controlRight = this.$elem.find('.slider-control-right');
        this.$controls = this.$elem.find('.slider-control');

        this.itemNum = this.$items.length;
        this.curIndex = this._getCorrectIndex(this.options.activeIndex);
        this._init();
    }

    Slider.DEFAULTS = {
        css3: true,
        js: true,
        animation: "fade",//slide
        activeIndex: 0,
        interval: 0,
        loop: false
    }

    Slider.prototype._init = function () {
        var self = this;
        //init show
        this.$indicators.removeClass('slider-indicator-active');
        this.$indicators.eq(this.curIndex).addClass('slider-indicator-active');
        this.$elem.trigger('slider-show', [this.curIndex, this.$items[this.curIndex]])

        //to
        if (this.options.animation === 'slide') {
            //slide
            this.$elem.addClass('slider-slide');
            this.$items.eq(this.curIndex).css('left', 0);

            //send slide message    发生两个动画，1.当前的隐藏，2.指定的显示
            this.$items.on('move moved', function (e) {
                var index = self.$items.index(this);
                if (e.type === 'move') {
                    if (index === self.curIndex) {//当前的幻灯片正在隐藏
                        self.$elem.trigger('slider-hide', [self.$items.index(this), this])
                    } else {//指定的
                        self.$elem.trigger('slider-show', [self.$items.index(this), this])
                    }

                } else { //moved
                    if (index === self.curIndex) {//指定的完成后 this.curIndex = index
                        self.$elem.trigger('slider-shown', [self.$items.index(this), this])
                    } else {//当前的幻灯片隐藏完毕 
                        self.$elem.trigger('slider-hidden', [self.$items.index(this), this])
                    }
                }
                self.$elem.trigger('slider-' + e.type, [this])
            })
            //move init
            this.$items.move(this.options);
            this.itemWidth = this.$items.eq(0).width();
            this.transitionClass = this.$items.eq(0).hasClass('transition') ? 'transition' : '';
            this.to = this._slide;

        } else {
            //fade

            this.$elem.addClass('slider-fade');
            this.$items.eq(this.curIndex).show();
            //send fade message 
            this.$items.on('show shown hide hidden', function (e) {
                self.$elem.trigger('slider-' + e.type, [self.$items.index(this), this])
            })
            // showHide init
            this.$items.showHide(this.options);

            this.to = this._fade;
        }

        //bind event 

        this.$elem
            .hover(function () {
                self.$controls.show();
            }, function () {
                self.$controls.hide();
            })
            .on('click', '.slider-control-left', function () {
                self.to(self._getCorrectIndex(self.curIndex - 1), 1);
            })
            .on('click', '.slider-control-right', function () {
                self.to(self._getCorrectIndex(self.curIndex + 1), -1);
            })
            .on('click', '.slider-indicator', function () {
                self.to(self._getCorrectIndex(self.$indicators.index(this)));
            })

        // auto
        if (this.options.interval && !isNaN(this.options.interval)) {
            this.$elem.hover($.proxy(this.pause, this), $.proxy(this.auto, this));
            this.auto();
        }
    }
    Slider.prototype._getCorrectIndex = function (index) {
        if (isNaN(Number(index))) return 0;
        if (Number(index) < 0) return this.itemNum - 1;
        if (Number(index) > this.itemNum - 1) return 0;
        return index;
    }
    Slider.prototype._activateIndicators = function (index) {
        this.$indicators.eq(this.curIndex).removeClass('slider-indicator-active');
        // this.$indicators.removeClass('slider-indicator-active');
        this.$indicators.eq(index).addClass('slider-indicator-active');
    }
    Slider.prototype._fade = function (index) {
        if (this.index === index) return;

        this.$items.eq(this.curIndex).showHide('hide');
        this.$items.eq(index).showHide('show');
        //激活indicator
        this._activateIndicators(index);

        this.curIndex = index;
    }
    Slider.prototype._slide = function (index, direction) {
        var self = this;
        if (index === this.curIndex) return;
        //确定滑入滑出的方向
        if (!direction) {//click indicator
            if (index > this.curIndex) {
                direction = -1;
            } else if (index < this.curIndex) {
                direction = 1;
            }
        }
        //指定滑入幻灯片的初始位置
        this.$items.eq(index).removeClass(this.transitionClass).css('left', -1 * direction * this.itemWidth)

        //进行滑动 当前幻灯片滑出可视区域，下一张幻灯片滑入可视区域
        setTimeout(function () {
            self.$items.eq(self.curIndex).move('x', direction * self.itemWidth);
            self.$items.eq(index).addClass(self.transitionClass).move('x', 0);
            self.curIndex = index;
        }, 20)

        //激活indicator
        this._activateIndicators(index);
    }
    Slider.prototype.auto = function () {
        var self = this;
        this.intervalId = setInterval(function () {
            self.to(self._getCorrectIndex(self.curIndex + 1), -1);
        }, this.options.interval)
    }
    Slider.prototype.pause = function () {
        clearInterval(this.intervalId);
    }
    $.fn.extend({
        slider: function (option) {
            return this.each(function () {
                var $this = $(this);
                var slider = $this.data('slider');
                var options = $.extend({}, Slider.DEFAULTS, $this.data(), typeof option === 'object' && option);
                if (!slider) {
                    $this.data('slider', slider = new Slider($this, options));
                }
                if (typeof slider[option] === 'function') {
                    slider[option]();
                }

            })
        }
    })
})(jQuery)