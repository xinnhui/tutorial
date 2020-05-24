(function ($) {
    'use strict'
//缓存
var cache = {
    data: {},
    count: 0,
    addData: function (key, value) {
        if(!this.data[key]){
            this.data[key] = value;
            this.count++;
        }
        
    },
    readData: function (key) {
        return this.data[key];
        this.count--;
    },
    deleteDataByKey: function (key) {
        delete this.data[key];
    },
    deleteDataByNum: function (num) {
        var count = 0;
        for( var p in this.data) {
            if(count >= num){
                break;
            }
            this.deleteDataByKey[p];
            count++;
        }
    }
}
    function Search($elem, option) {
        this.$elem = $elem,
            this.option = option;

        this.$search = $('.search'),
            this.$input = $('.search-inputbox', this.$elem),
            this.$btn = $('.search-btn', this.$elem),
            this.$layer = $('.search-layer', this.$elem),
            this.$form = $('.search-form', this.$elem),
            this.loaded = false;
        this.$elem.on('click', '.search-btn', $.proxy(this.submit, this));
        if (this.option.autocomplete) {
            this.autocomplete();
        }
    }
    Search.DEFAULTS = {
        css: false,
        js: false,
        antimation: 'fade',
        url: 'https://suggest.taobao.com/sug?area=c2c&code=utf-8&callback=jsonp_5352966&q=',
        autocomplete: false,
        getDataInterval: 200
    };
    Search.prototype.submit = function () {
        if (this.getInputVal() === '') {
            return false;
        }
        this.$form.submit();
    };
    Search.prototype.autocomplete = function () {
        var self = this,
        timer = null;
        this.$input
            .on('input',function () {
                if(self.option.getDataInterval){
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        self.getData();
                    },self.option.getDataInterval)
                }else{
                    self.getData();
                }
               
            })
            .on('focus', $.proxy(this.showLayer, this))
            .on('click', function () {
                return false;
            });
        this.$layer.showHide(this.option);
        $(document).on('click', $.proxy(this.hideLayer, this))
    };
    Search.prototype.getData = function () {
        var self = this,
            html = '',
            maxNum = 5,
            inputVal = this.getInputVal();
            if(cache.readData(inputVal)) return  self.$elem.trigger('search-getData', cache.readData(inputVal))
        if (inputVal === '') return self.$elem.trigger('search-noData');
        if(this.jqXHR)  this.jqXHR.abort();
         this.jqXHR = $.ajax({
            url: self.option.url + inputVal,
            dataType: 'jsonp'
        })
            .done(function (data) {
                console.log(data);
                cache.addData(inputVal, data);
                console.log(cache.data)
                console.log(cache.count)
                self.$elem.trigger('search-getData', [data])
            })
            .fail(function () {
                self.$elem.trigger('search-noData')
            })
            .always(function () {
                this.jqXHR = null;
            });
    };
    Search.prototype.showLayer = function () {
        if (!this.loaded) return;
        this.$layer.showHide('show');
    };
    Search.prototype.hideLayer = function () {
        this.$layer.showHide('hide');
    };
    Search.prototype.getInputVal = function () {
        return $.trim(this.$input.val());
    };
    Search.prototype.appendLayer = function (html) {
        this.$layer.html(html)
        this.loaded = !!html;
    };
    Search.prototype.setInputVal = function (value) {
        this.$input.val(removeHtmlTags(value));
        function removeHtmlTags(str) {
            return str.replace(/<(?:[^>'"]|'[^']*'|"[^"]*")*>/g, '');
        }
    };
    $.fn.extend({
        search: function (option, value) {
            return this.each(function () {
                var $this = $(this);
                var options = $.fn.extend({}, Search.DEFAULTS, $this.data(), typeof option === 'object' && option)
                var search = $this.data('search');

                if (!search) {
                    $this.data('search', search = new Search($this, options));
                }
                if (typeof search[option] === 'function') {
                    search[option](value);
                }
            })
        }
    })
})(jQuery)
    // (function ($) {
    //     'use strict'
    //     var $search = $('.search'),
    //         $input = $('.search-inputbox'),
    //         $btn = $('.search-btn'),
    //         $layer = $('.search-layer'),
    //         $form = $('.search-form');
    //     $form.on('submit', function () {
    //         console.log($.trim($input.val()));
    //         if ($.trim($input.val()) === '') {
    //             return false;
    //         }
    //     })
    //     //自动完成

    //     $input.on('input', function () {
    //         var url = 'https://suggest.taobao.com/sug?area=c2c&code=utf-8&callback=jsonp_5352966&q=' + encodeURIComponent($.trim($input.val()));

    //         $.ajax({
    //             url: url,
    //             dataType: 'jsonp'
    //         })
    //             .done(function (data) {
    //                 var html = '',
    //                     dataNum = data['result'].length,
    //                     maxNum = 5;
    //                 if (dataNum === 0 || maxNum === 0) {
    //                     $layer.hide().html('');
    //                     return;
    //                 }

    //                 for (var i = 0; i < dataNum; i++) {
    //                     if (i >= maxNum) break;
    //                     html += '<li class="search-layer-item text-ellipise">' + data.result[i][0] + '</li>'
    //                 }
    //                 $layer.show().html(html);
    //             })
    //             .fail(function () {
    //                 console.log(1);
    //                 $layer.hide().html('');
    //             })
    //             .always(function () {
    //                 console.log('always done');
    //             });
    //     })

    //     $layer.on('click', '.search-layer-item', function () {
    //         $input.val($(this).text());
    //         $form.submit();
    //     })

    //     $input.on('focus', function () {
    //         console.log('focus');
    //         $layer.show();
    //     }).on('click', function () {
    //         return false;
    //     });
    //     $(document).on('click', function () {
    //         $layer.hide();
    //     })
    // })(jQuery)