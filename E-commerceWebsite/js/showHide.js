(function ($) {
    var transition = window.mt.transition;
    var init = function ($elem, hiddenCallback) {
        if ($elem.is(':hidden')) {
            $elem.data('status', 'hide');
            if (typeof hiddenCallback === 'function') {
                hiddenCallback();
            }
        } else {
            $elem.data('status', 'show');
        }
    };

    var show = function ($elem, callback) {
        if ($elem.data('status') === 'show') return;
        if ($elem.data('status') === 'shown') return;
        $elem.data('status', 'show').trigger('show');
        callback();

    };

    var hide = function ($elem, callback) {
        if ($elem.data('status') === 'hide') return;
        if ($elem.data('status') === 'hidden') return;
        $elem.data('status', 'hide').trigger('hide');
        callback();
    }

    var silent = {
        init: init,
        show: function ($elem) {
            show($elem, function () {
                $elem.show();
                $elem.data('status', 'shown').trigger('shown');
            })


        },
        hide: function ($elem) {
            hide($elem, function () {
                $elem.hide();
                $elem.data('status', 'hidden').trigger('hidden');
            })

        }
    };
    var css3 = {

        fade: {
            init: function ($elem) {
                css3._init($elem, 'fadeOut');
            },
            show: function ($elem) {
                css3._show($elem, 'fadeOut');
            },
            hide: function ($elem) {
                css3._hide($elem, 'fadeOut');
            }
        },

        slideUpDown: {
            init: function ($elem) {
                $elem.height('auto').height($elem.height());
                css3._init($elem, 'slideUpDownCollapse');
            },
            show: function ($elem) {
                css3._show($elem, 'slideUpDownCollapse');
            },
            hide: function ($elem) {
                css3._hide($elem, 'slideUpDownCollapse');
            }
        },
        slideLeftRight: {
            init: function ($elem) {
                $elem.width($elem.width());
                css3._init($elem, 'slideLeftRigthCollapse');
            },
            show: function ($elem) {

                css3._show($elem, 'slideLeftRigthCollapse');

            },
            hide: function ($elem) {

                css3._hide($elem, 'slideLeftRigthCollapse');



            }
        },
        fadeSlideUpDown: {
            init: function ($elem) {
                $elem.height('auto').height($elem.height());
                init($elem, css3._init($elem, 'slideUpDownCollapse fadeOut'));
            },
            show: function ($elem) {
                css3._show($elem, 'slideUpDownCollapse fadeOut');
            },
            hide: function ($elem) {
                css3._hide($elem, 'slideUpDownCollapse fadeOut');
            }
        },
        fadeSlideLeftRight: {
            init: function ($elem) {
                $elem.width($elem.width());
                init($elem, css3._init($elem, 'slideLeftRigthCollapse fadeOut'));
            },
            show: function ($elem) {

                css3._show($elem, 'slideLeftRigthCollapse fadeOut');

            },
            hide: function ($elem) {

                css3._hide($elem, 'slideLeftRigthCollapse fadeOut');



            }
        }
    };
    css3._init = function ($elem, className) {
        $elem.addClass('transition');
        init($elem, function () {
            $elem.addClass(className);
        })
    };
    css3._show = function ($elem, className) {
        show($elem, function () {
            // $elem.on('transiationend', function () {
            //     console.log('showTest');
            // })
            $elem.off(transition.end).one(transition.end, function () {
                $elem.data('status', 'shown').trigger('shown');
              
            })
            $elem.show();
            setTimeout(function () {
                $elem.removeClass(className);
            }, 20);
        })


    };

    css3._hide = function ($elem, className) {
        hide($elem, function () {
    
            $elem.off(transition.end).one(transition.end, function () {
                $elem.hide(); 
                $elem.data('status', 'hidden').trigger('hidden');
            })
            $elem.addClass(className);
        })

    };
    var js = {
        fade: {
            init: function ($elem) {
                js._init($elem);
            },
            show: function ($elem) {
                js._show($elem, 'fadeIn');
            },
            hide: function ($elem) {
                js._hide($elem, 'fadeOut');

            }
        },

        slideUpDown: {
            init: function ($elem) {
                js._init($elem);
            },
            show: function ($elem) {
                console.log('=====');
                js._show($elem, 'slideDown');
            },
            hide: function ($elem) {
                js._hide($elem, 'slideUp');
            }
        },
        slideLeftRigt: {
            init: function ($elem) {
                js._customInit($elem, {
                    'width': 0,
                    'padding-left': 0,
                    'padding-right': 0
                });

            },
            show: function ($elem) {
                js._customShow($elem);

            },
            hide: function ($elem) {
                js._customHide($elem, {
                    'width': 0,
                    'padding-left': 0,
                    'padding-right': 0
                });

            }
        },
        fadeSlideUpDown: {
            init: function ($elem) {
                js._customInit($elem, {
                    'opacity': 0,
                    'height': 0,
                    'padding-top': 0,
                    'padding-bottom': 0
                });

            },
            show: function ($elem) {
                js._customShow($elem);

            },
            hide: function ($elem) {
                js._customHide($elem, {
                    'opacity': 0,
                    // 'height': 0,
                    'padding-top': 0,
                    'padding-bottom': 0
                });

            }
        },
        fadeSlideLeftRight: {
            init: function ($elem) {
                js._customInit($elem, {
                    'opacity': 0,
                    'width': 0,
                    'padding-left': 0,
                    'padding-right': 0
                });

            },
            show: function ($elem) {
                js._customShow($elem);

            },
            hide: function ($elem) {
                js._customHide($elem, {
                    'opacity': 0,
                    'width': 0,
                    'padding-left': 0,
                    'padding-right': 0
                });

            }
        }
    }

    js._init = function ($elem, callback) {
        $elem.removeClass('transition');
        init($elem, callback);
    };
    js._customInit = function ($elem, options) {
        var styles = {};
        for (var p in options) {
            styles[p] = $elem.css(p);
        }
        $elem.data('styles', styles);

        js._init($elem, function () {
            $elem.animate(options);
        })
    }
    js._show = function ($elem, mode) {
        show($elem, function () {
            $elem.stop()[mode](function () {
                $elem.data('status', 'shown').trigger('shown');
            });
        })
    };

    js._customShow = function ($elem) {
        show($elem, function () {
            var styles = $elem.data('styles');

            $elem.show();
            $elem.stop().animate(styles, function () {
                $elem.data('status', 'shown').trigger('shown');
            });
        })
    }

    js._hide = function ($elem, mode) {
        hide($elem, function () {
            $elem.stop()[mode](function () {
                $elem.data('status', 'hidden').trigger('hidden');
            })
        });
    }

    js._customHide = function ($elem, options) {
        hide($elem, function () {
            $elem.stop().animate(options, function () {
                $elem.hide();
                $elem.data('status', 'hidden').trigger('hidden');
                console.log($elem.data('styles'));
            });
        })
    }
    var defaults = {
        css3: false,
        js: false,
        animation: 'fade'
    }
    function showHide($elem, options) {
        var mode = null;
        if (options.css3 && transition.isSupport) {//css3
            mode = css3[options.animation] || css3[defaults.animation];
        } else if (options.js) { //js
            console.log($elem.attr('class'));
            if($elem.attr('class') === 'search-layer') {
                debugger
            }
            mode = js[options.animation] || js[defaults.animation];
        } else {//无动画
            mode = silent;

        }

        mode.init($elem);
        return {
            show: $.proxy(mode.show, this, $elem),
            hide: $.proxy(mode.hide, this, $elem)
        }
    }

    // window.mt = window.mt || {};
    // window.mt.showHide = showHide;
    $.fn.extend({
        showHide: function (option) {
            return this.each(function () {
                var $this = $(this),
                options = $.extend({}, defaults, typeof option === 'object' && option),
                    mode = $this.data('showHide');

                    if(!mode) {
                        $this.data('showHide', mode = showHide($this, options));
                    }
                if (typeof mode[option] === 'function') {
                    mode[option]();
                }
            })
        }
    })
})(jQuery)
