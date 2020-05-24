(function ($) {
    'use strict';

    function Dropdown($elem, option) {
        this.$elem = $elem;
            this.activeClass = option.active + '-active';
            this.option = option;
            this.$layer = $('.dropdown-layer', this.$elem);
        this._init();
    }

    Dropdown.prototype._init = function () {
        var self = this;
        this.$layer.showHide(this.option);
        this.$layer.on('show shown hide hidden', function (e) {
            self.$elem.trigger('dropdown-' + e.type
            // , function () {
            //     self.$layer.height('auto').height(self.$layer.height());
            // }
            )
            // self.$layer.height('auto').height(self.$layer.height());
        })
        if (this.option.event === 'click') {
            this.$elem.click(function (e) {
                self.show();
                e.stopPropagation();
            });
            $(document).on('click', $.proxy(this.hide, this));
        } else {
            this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this));
        }
    }
    Dropdown.prototype.show = function () {
        var self = this;
        if (this.option.delay) {
            this.timer = setTimeout(function () {
                _show();
            }, this.option.delay)
        } else {
            _show();
        }
        function _show() {
            self.$layer.showHide('show');
            self.$elem.addClass(self.activeClass);
        }
    }

    Dropdown.prototype.hide = function () {
        clearTimeout(this.timer);
        this.$layer.showHide('hide');
        this.$elem.removeClass(this.activeClass);
    }
    Dropdown.DEFAULTS = {
        event: 'hover',
        css3: true,
        js: true,
        animation: 'fade',
        active: 'dropdown',
        delay: 0
    }


    $.fn.extend({
        dropdown: function (option) {
            return this.each(function () {
                var $this = $(this);
                var options = $.extend({}, Dropdown.DEFAULTS, $this.data(), typeof option === 'object' && option)
                var dropdown =  $this.data('dropdown');
                if (!dropdown) {
                    $this.data('dropdown', dropdown = new Dropdown($this, options));
                }
                if (typeof dropdown[option] === 'function') {
                    dropdown[option]();
                }
            })
        }
    })
})(jQuery);