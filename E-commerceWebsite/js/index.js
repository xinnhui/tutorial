(function ($) {

    'use strict';
    //menu
    var dropdown = {};
    //按需加载
    $('.menu')
        .on('dropdown-show', function (e) {
            dropdown.loadOnce($(this), dropdown.buildMenuItem);
        })
        .dropdown({
            css3: false,
            js: true,
            animation: 'slideUpDown',
        });
    //创建菜单

    dropdown.buildMenuItem = function ($elem, data) {
        var html = '',
            $layer = $elem.find('.dropdown-layer');
        if (data.length === 0) return;
        for (var i = 0; i < data.length; i++) {
            html += ' <li><a href="' + data[i].url + '" target="_blank" class="menu-item">' + data[i].name + '</a></li>'
        }
        $layer.html(html);
        $layer.height("auto").height($layer.height());
    }
    // serarch-form
    var search = {};
    search.$headerSearch = $('#header-search'),
        search.$headerSearch.maxNum = 5,
        search.$headerSearch.html = '';
    search.$headerSearch
        .on('search-getData', function (e, data) {
            var $this = $(this);
            search.$headerSearch.html = search.$headerSearch.createHeaderSearchLayer(data, search.$headerSearch.maxNum);
            // $layer.html(html);
            search.$headerSearch.search('appendLayer', search.$headerSearch.html);
            if (search.$headerSearch.html) {
                $this.search('showLayer');
            } else {
                $this.search('hideLayer');
            }
        })
        .on('search-noData', function () {
            $(this).search('hideLayer');
            search.$headerSearch.search('appendLayer', '');
        })
        .on('click', '.search-layer-item', function () {
            search.$headerSearch.search('setInputVal', $(this).text());
            search.$headerSearch.search('submit');
        })
    search.$headerSearch.search({
        css3: true,
        js: true,
        animation: 'slideUpDown',
        autocomplete: true,
        getDataInterval: 0
    })
    //创建卖家中心html
    // function createSellerHtml(data) {
    //     var html = '';
    //     for (var i = 0; i < data.length; i++) {
    //         html += ' <li><a href="' + data[i].url + '" target="_blank" class="menu-item">' + data[i].name + '</a></li>'
    //     }
    //     return html;
    // }
    //创建搜索html
    search.$headerSearch.createHeaderSearchLayer = function (data, maxNum) {
        var html = '',
            dataNum = data['result'].length;
        if (dataNum === 0 || maxNum === 0) {
            return '';
        }

        for (var i = 0; i < dataNum; i++) {
            if (i >= maxNum) break;
            html += '<li class="search-layer-item text-ellipise">' + data.result[i][0] + '</li>'
        }
        return html;
    };


    //cart 
    $('#cart')
        .on('dropdown-show', function () {
            dropdown.loadOnce($(this), function ($elem, data) {
                dropdown.buildCartItem($elem, data);
                dropdown.updateCart($elem, data);
            });
        })
        .dropdown({
            css3: true,
            js: false,
            animation: 'slideUpDown',
        });
    //创建购物车的html 
    dropdown.buildCartItem = function ($elem, data) {
        var html = "";
        if (data.length === 0) { // no goods
            html += '<div class="cart-nogoods"><i class="icon cart-nogoods-icon fl">&#xe600;</i><div class="cart-nogoods-text fl">购物车里还没有商品<br />赶紧去选购吧！</div></div>';
            $elem.find('.dropdown-layer').html(html);
            return;
        }

        html += '<h4 class="cart-title">最新加入的商品</h4><ul class="cart-list">';

        for (var i = 0; i < data.length; i++) {
            html += '<li class="cart-item"><a href="###" target="_blank" class="cart-item-pic fl"><img src="' + data[i].pic + '" alt="" /></a><div class="fl"><p class="cart-item-name text-ellipsis"><a href="###" target="_blank" class="link">' + data[i].name + '</a></p><p class="cart-item-price"><strong>￥' + data[i].price + ' x ' + data[i].num + '</strong></p></div><a href="javascript:;" title="删除" class="cart-item-delete link fr">X</a></li>';
        }

        html += '</ul><div class="cart-info"><span class="fl">共 <strong class="cart-total-num">0</strong> 件商品　共计<strong class="cart-total-price">￥ 0.00</strong></span><a href="###" target="_blank" class="cart-info-btn btn fr">去购物车</a></div>';

        // setTimeout(function(){
        $elem.find('.dropdown-layer').html(html).height("auto").height($elem.find('.dropdown-layer').height());
        // },1000);a
    }
    //更新数据
    dropdown.updateCart = function ($elem, data) {
        var $cartNum = $elem.find('.cart-num'),
            $cartTotalNum = $elem.find('.cart-total-num'),
            $cartTotalPrice = $elem.find('.cart-total-price'),
            dataNum = data.length,
            totalNum = 0,
            totalPrice = 0;

        if (dataNum === 0) { // no goods
            return;
        }

        for (var i = 0; i < dataNum; i++) {
            totalNum += +data[i].num;
            totalPrice += +data[i].num * +data[i].price;
        }

        $cartNum.html(totalNum);
        $cartTotalNum.html(totalNum);
        $cartTotalPrice.html('￥' + totalPrice);
    };

    //category
    $('#focus-category').find('.dropdown')
        .on('dropdown-show', function () {
            dropdown.loadOnce($(this), dropdown.createCategoryDetails);
        })
        .dropdown({
            css: true,
            js: false,
            animation: "fadeSlideLeftRight"
        })
    //按需加载，创建分类详情
    dropdown.createCategoryDetails = function ($elem, data) {
        // debugger
        var html = '',
            $layer = $elem.find('.dropdown-layer');
        if (data.length === 0) return;
        for (var i = 0; i < data.length; i++) {
            html += '<dl class="category-detail cf"><dt class="category-detail-title fl"><a href="###" target="_blank" class="category-detail-title-link">'
                + data[i].title + '</a></dt><dd class="category-detail-item fl">';
            for (var j = 0; j < data[i].items.length; j++) {
                html += '   <a href="###" target="_blank" class="link">' + data[i].items[j] + '</a>';
            }
            html += "</dd></dl>";
        }

        $layer.html(html);
        $layer.height("auto").height($layer.height());
    }
    //判断是否加载
    dropdown.loadOnce = function ($elem, success) {
        var dataLoad = $elem.data('load'),
            dataHtml = $elem.data('html');
        if (!dataLoad) return;

        if (!$elem.data('loaded')) {
            $elem.data('loaded', true);
            $.getJSON(dataLoad)
                .done(function (data) {
                    if (typeof success === 'function') {
                        setTimeout(function () {
                            success($elem, data);
                        }, 1000);
                    }
                    console.log(data);
                })
                .fail(function () {
                    // setTimeout(function () {
                    //     if (dataHtml) {
                    //         var functionName = 'fail' + dataHtml + 'Html';
                    //         html = window[functionName]();
                    //     }
                    //     $layer.html(html);

                    $elem.data('loaded', false)
                    // updatelayer(); 

                    //初始化函数，设置元素的高
                    // $layer.height('auto').height($layer.height());
                    // console.log('html ' + $layer.height());

                    // }, 3000)

                })
        }
    }

    // function loadOnce($elem, success) {
    //     var dataLoad = $elem.data('load'),
    //         dataHtml = $elem.data('html');
    //     if (!dataLoad) return;

    //     if (!$this.data('loaded')) {
    //             $elem.data('loaded', true);
    //         $.getJSON(dataLoad)
    //             .done(function (data) {
    //                 setTimeout(function () {
    //                     if (dataHtml) {
    //                         var functionName = 'create' + dataHtml + 'Html';
    //                         html = window[functionName](data);
    //                     } else {
    //                         for (var i = 0; i < data.length; i++) {
    //                             html += ' <li><a href="' + data[i].url + '" target="_blank" class="menu-item">' + data[i].name + '</a></li>'
    //                         }
    //                     }

    //                     $layer.html(html);

    //                     $this.data('loaded', true)
    //                     updatelayer(); //初始化函数，设置元素的高
    //                     // $layer.height('auto').height($layer.height());
    //                     // console.log('html ' + $layer.height());
    //                 }, 1000);
    //             })
    //             .fail(function () {
    //                 setTimeout(function () {
    //                     if (dataHtml) {
    //                         var functionName = 'fail' + dataHtml + 'Html';
    //                         html = window[functionName]();
    //                     }
    //                     $layer.html(html);

    //                     $this.data('loaded', false)
    //                     updatelayer(); //初始化函数，设置元素的高
    //                     // $layer.height('auto').height($layer.height());
    //                     // console.log('html ' + $layer.height());
    //                 }, 3000)

    //             })
    //     }
    // } 

    // lazyLoad
    var lazyLoad = {};
    lazyLoad.loadUntil = function (options) {
        var items = {},
            loadedItemNum = 0,
            loadItemFn = null,
            // totalItemN   floor.$floor.length;
            $elem = options.$container,
            id = options.id;
        $elem.on(options.triggerEvent, loadItemFn = function (e, index, elem) {
            if (items[index] !== 'loaded') {
                $elem.trigger(id + '-loadItems', [index, elem, function () {
                    //按需加载
                    items[index] = 'loaded';
                    loadedItemNum++;
                    console.log(index + ':loaded');
                    if (loadedItemNum === options.totalItemNum) {
                        //全部加载完成
                        $elem.trigger(id + '-itemsLoaded');
                    }
                }]);
            }
        })
        // $elem.on(id + '-loadItems', function (e, index, elem) {
        //     //按需加载

        //     items[index] = 'loaded';
        //     loadedItemNum++;
        //     console.log(index + ':loaded');
        //     if (loadedItemNum === options.totalItemNum) {
        //         //全部加载完成
        //         $elem.trigger(id + '-itemsLoaded');
        //     }

        // })
        $elem.on(id + '-itemsLoaded', function (e) {
            //清除事件
            console.log(id + '-itemsLoaded');
            $elem.off(id + '-show', loadItemFn);
            // $win.off('scroll resize', lazy.timeToShow)
        })
    }
    lazyLoad.isVisable = function (floorData) {
        var $win = browser.$win;
        return ($win.height() + $win.scrollTop() > floorData.offsetTop) && ($win.scrollTop() < floorData.height + floorData.offsetTop)
    }
    lazyLoad.timeToShow = function () {
        console.log('timetoshow');
        floor.$floor.each(function (index, elem) {
            if (lazyLoad.isVisable(floor.floorData[index])) {
                browser.$doc.trigger('floor-show', [index, elem])
            }
        })
    }
    // imgLoader
    var imgLoader = {};
    imgLoader.loadImg = function (url, imgLoaded, imgFailed) {
        var image = new Image();
        image.onerror = function () {
            if (typeof imgFailed === 'function') imgFailed(url);
        }
        image.onload = function () {
            if (typeof imgLoaded === 'function') imgLoaded(url);
        }
        // image.src = url;
        setTimeout(function () {
            image.src = url;
        }, 1000)

    }
    imgLoader.loadImgs = function ($imgs, success, fail) {

        $imgs.each(function (_, el) {
            var $img = $(el);
            imgLoader.loadImg($img.data('src'), function (url) {
                $img.attr('src', url);
                success();
            }, function (url) {
                console.log('从' + url + '加载图片失败');
                //显示备用图片
                fail($img, url)
            })
        })
    }
    //focus-slider
    var slider = {};
    slider.$focusSlider = $("#focus-slider");
    lazyLoad.loadUntil({
        $container: slider.$focusSlider,
        totalItemNum: slider.$focusSlider.find('.slider-img').length,
        triggerEvent: 'slider-show',
        id: 'focus'
    });
    slider.$focusSlider.on('focus-loadItems', function (e, index, elem, success) {
        imgLoader.loadImgs($(elem).find('.slider-img'), success, function ($img, url) {
            $img.attr('src', 'img/focus-slider/placeholder.png');
        })
    })
    slider.$focusSlider.slider({
        css3: true,
        js: true,
        animation: "fade",//slide
        activeIndex: 0,
        interval: 0
    })

    //todays-slider
    slider.$todaysSlider = $("#todays-slider");
    lazyLoad.loadUntil({
        $container: slider.$todaysSlider,
        totalItemNum: slider.$todaysSlider.find('.slider-img').length,
        triggerEvent: 'slider-show',
        id: 'todays'
    });
    slider.$todaysSlider.on('todays-loadItems', function (e, index, elem, success) {
        imgLoader.loadImgs($(elem).find('.slider-img'), success, function ($img, url) {
            $img.attr('src', 'img/todys-slider/placeholder.png');
        })
    })
    slider.$todaysSlider.slider({
        css3: true,
        js: true,
        animation: "slide",//slide
        activeIndex: 0,
        interval: 0
    })

    //floor
    var floor = {}
    floor.$floor = $('.floor');

    // function lazyLoadFloorImgs($elem) {
    //     var items = {},
    //         loadedItemNum = 0,
    //         loadItemFn = null,
    //         totalItemNum = $elem.find('.floor-img').length;

    //     $elem.on('tab-show', loadItemFn = function (e, index, elem) {
    //         if (items[index] !== 'loaded') {
    //             $elem.trigger('tab-loadItem', [index, elem]);
    //         }
    //     })
    //     $elem.on('tab-loadItem', function (e, index, elem) {
    //         //按需加载
    //         var $imgs = $(elem).find('.floor-img');
    //         $imgs.each(function (_, el) {
    //             var $img = $(el);
    //             slider.loadImg($img.data('src'), function (url) {
    //                 $img.attr('src', url);
    //                 items[index] = 'loaded';
    //                 loadedItemNum++;
    //                 console.log(index + ':loaded');
    //                 if (loadedItemNum === totalItemNum) {
    //                     //全部加载完成
    //                     $elem.trigger('tab-itemsLoaded');
    //                 }
    //             }, function (url) {
    //                 console.log('从' + url + '加载图片失败');
    //                 //显示备用图片
    //                 $img.attr('src', 'img/floor/placeholder.png');
    //             })
    //         })
    //     })
    //     $elem.on('tab-itemsLoaded', function (e) {
    //         //清除事件
    //         console.log('itemsLoaded');
    //         $elem.off('tab-show', loadItemFn);
    //     })
    // }


    floor.floorData = [{
        num: '1',
        text: '服装鞋包',
        tabs: ['大牌', '男装', '女装'],
        offsetTop: floor.$floor.eq(0).offset().top,
        height: floor.$floor.eq(0).height(),
        items: [
            [{
                name: '匡威男棒球开衫外套2015',
                price: 479
            }, {
                name: 'adidas 阿迪达斯 训练 男子',
                price: 335
            }, {
                name: '必迈BMAI一体织跑步短袖T恤',
                price: 159
            }, {
                name: 'NBA袜子半毛圈运动高邦棉袜',
                price: 65
            }, {
                name: '特步官方运动帽男女帽子2016',
                price: 69
            }, {
                name: 'KELME足球训练防寒防风手套',
                price: 4999
            }, {
                name: '战地吉普三合一冲锋衣',
                price: 289
            }, {
                name: '探路者户外男士徒步鞋',
                price: 369
            }, {
                name: '羽绒服2015秋冬新款轻薄男士',
                price: 399
            }, {
                name: '溯溪鞋涉水鞋户外鞋',
                price: 689
            }, {
                name: '旅行背包多功能双肩背包',
                price: 269
            }, {
                name: '户外旅行双肩背包OS0099',
                price: 99
            }],
            [{
                name: '匡威男棒球开衫外套2015',
                price: 479
            }, {
                name: 'adidas 阿迪达斯 训练 男子',
                price: 335
            }, {
                name: '必迈BMAI一体织跑步短袖T恤',
                price: 159
            }, {
                name: 'NBA袜子半毛圈运动高邦棉袜',
                price: 65
            }, {
                name: '特步官方运动帽男女帽子2016',
                price: 69
            }, {
                name: 'KELME足球训练防寒防风手套',
                price: 4999
            }, {
                name: '战地吉普三合一冲锋衣',
                price: 289
            }, {
                name: '探路者户外男士徒步鞋',
                price: 369
            }, {
                name: '羽绒服2015秋冬新款轻薄男士',
                price: 399
            }, {
                name: '溯溪鞋涉水鞋户外鞋',
                price: 689
            }, {
                name: '旅行背包多功能双肩背包',
                price: 269
            }, {
                name: '户外旅行双肩背包OS0099',
                price: 99
            }],
            [{
                name: '匡威男棒球开衫外套2015',
                price: 479
            }, {
                name: 'adidas 阿迪达斯 训练 男子',
                price: 335
            }, {
                name: '必迈BMAI一体织跑步短袖T恤',
                price: 159
            }, {
                name: 'NBA袜子半毛圈运动高邦棉袜',
                price: 65
            }, {
                name: '特步官方运动帽男女帽子2016',
                price: 69
            }, {
                name: 'KELME足球训练防寒防风手套',
                price: 4999
            }, {
                name: '战地吉普三合一冲锋衣',
                price: 289
            }, {
                name: '探路者户外男士徒步鞋',
                price: 369
            }, {
                name: '羽绒服2015秋冬新款轻薄男士',
                price: 399
            }, {
                name: '溯溪鞋涉水鞋户外鞋',
                price: 689
            }, {
                name: '旅行背包多功能双肩背包',
                price: 269
            }, {
                name: '户外旅行双肩背包OS0099',
                price: 99
            }]
        ]
    }, {
        num: '2',
        text: '个护美妆',
        tabs: ['热门', '国际大牌', '国际名品'],
        offsetTop: floor.$floor.eq(1).offset().top,
        height: floor.$floor.eq(1).height(),
        items: [
            [{
                name: '韩束红石榴鲜活水盈七件套装',
                price: 169
            }, {
                name: '温碧泉八杯水亲亲水润五件套装',
                price: 198
            }, {
                name: '御泥坊红酒透亮矿物蚕丝面膜贴',
                price: 79.9
            }, {
                name: '吉列手动剃须刀锋隐致护',
                price: 228
            }, {
                name: 'Mediheal水润保湿面膜',
                price: 119
            }, {
                name: '纳益其尔芦荟舒缓保湿凝胶',
                price: 39
            }, {
                name: '宝拉珍选基础护肤旅行四件套',
                price: 299
            }, {
                name: '温碧泉透芯润五件套装',
                price: 257
            }, {
                name: '玉兰油多效修护三部曲套装',
                price: 199
            }, {
                name: 'LOREAL火山岩控油清痘洁面膏',
                price: 36
            }, {
                name: '百雀羚水嫩倍现盈透精华水',
                price: 139
            }, {
                name: '珀莱雅新柔皙莹润三件套',
                price: 99
            }],
            [{
                name: '韩束红石榴鲜活水盈七件套装',
                price: 169
            }, {
                name: '温碧泉八杯水亲亲水润五件套装',
                price: 198
            }, {
                name: '御泥坊红酒透亮矿物蚕丝面膜贴',
                price: 79.9
            }, {
                name: '吉列手动剃须刀锋隐致护',
                price: 228
            }, {
                name: 'Mediheal水润保湿面膜',
                price: 119
            }, {
                name: '纳益其尔芦荟舒缓保湿凝胶',
                price: 39
            }, {
                name: '宝拉珍选基础护肤旅行四件套',
                price: 299
            }, {
                name: '温碧泉透芯润五件套装',
                price: 257
            }, {
                name: '玉兰油多效修护三部曲套装',
                price: 199
            }, {
                name: 'LOREAL火山岩控油清痘洁面膏',
                price: 36
            }, {
                name: '百雀羚水嫩倍现盈透精华水',
                price: 139
            }, {
                name: '珀莱雅新柔皙莹润三件套',
                price: 99
            }],
            [{
                name: '韩束红石榴鲜活水盈七件套装',
                price: 169
            }, {
                name: '温碧泉八杯水亲亲水润五件套装',
                price: 198
            }, {
                name: '御泥坊红酒透亮矿物蚕丝面膜贴',
                price: 79.9
            }, {
                name: '吉列手动剃须刀锋隐致护',
                price: 228
            }, {
                name: 'Mediheal水润保湿面膜',
                price: 119
            }, {
                name: '纳益其尔芦荟舒缓保湿凝胶',
                price: 39
            }, {
                name: '宝拉珍选基础护肤旅行四件套',
                price: 299
            }, {
                name: '温碧泉透芯润五件套装',
                price: 257
            }, {
                name: '玉兰油多效修护三部曲套装',
                price: 199
            }, {
                name: 'LOREAL火山岩控油清痘洁面膏',
                price: 36
            }, {
                name: '百雀羚水嫩倍现盈透精华水',
                price: 139
            }, {
                name: '珀莱雅新柔皙莹润三件套',
                price: 99
            }]
        ]
    }, {
        num: '3',
        text: '手机通讯',
        tabs: ['热门', '品质优选', '新机尝鲜'],
        offsetTop: floor.$floor.eq(2).offset().top,
        height: floor.$floor.eq(2).height(),
        items: [
            [{
                name: '摩托罗拉 Moto Z Play',
                price: 3999
            }, {
                name: 'Apple iPhone 7 (A1660)',
                price: 6188
            }, {
                name: '小米 Note 全网通 白色',
                price: 999
            }, {
                name: '小米5 全网通 标准版 3GB内存',
                price: 1999
            }, {
                name: '荣耀7i 海岛蓝 移动联通4G手机',
                price: 1099
            }, {
                name: '乐视（Le）乐2（X620）32GB',
                price: 1099
            }, {
                name: 'OPPO R9 4GB+64GB内存版',
                price: 2499
            }, {
                name: '魅蓝note3 全网通公开版',
                price: 899
            }, {
                name: '飞利浦 X818 香槟金 全网通4G',
                price: 1998
            }, {
                name: '三星 Galaxy S7（G9300）',
                price: 4088
            }, {
                name: '华为 荣耀7 双卡双待双通',
                price: 1128
            }, {
                name: '努比亚(nubia)Z7Max(NX505J)',
                price: 728
            }],
            [{
                name: '摩托罗拉 Moto Z Play',
                price: 3999
            }, {
                name: 'Apple iPhone 7 (A1660)',
                price: 6188
            }, {
                name: '小米 Note 全网通 白色',
                price: 999
            }, {
                name: '小米5 全网通 标准版 3GB内存',
                price: 1999
            }, {
                name: '荣耀7i 海岛蓝 移动联通4G手机',
                price: 1099
            }, {
                name: '乐视（Le）乐2（X620）32GB',
                price: 1099
            }, {
                name: 'OPPO R9 4GB+64GB内存版',
                price: 2499
            }, {
                name: '魅蓝note3 全网通公开版',
                price: 899
            }, {
                name: '飞利浦 X818 香槟金 全网通4G',
                price: 1998
            }, {
                name: '三星 Galaxy S7（G9300）',
                price: 4088
            }, {
                name: '华为 荣耀7 双卡双待双通',
                price: 1128
            }, {
                name: '努比亚(nubia)Z7Max(NX505J)',
                price: 728
            }],
            [{
                name: '摩托罗拉 Moto Z Play',
                price: 3999
            }, {
                name: 'Apple iPhone 7 (A1660)',
                price: 6188
            }, {
                name: '小米 Note 全网通 白色',
                price: 999
            }, {
                name: '小米5 全网通 标准版 3GB内存',
                price: 1999
            }, {
                name: '荣耀7i 海岛蓝 移动联通4G手机',
                price: 1099
            }, {
                name: '乐视（Le）乐2（X620）32GB',
                price: 1099
            }, {
                name: 'OPPO R9 4GB+64GB内存版',
                price: 2499
            }, {
                name: '魅蓝note3 全网通公开版',
                price: 899
            }, {
                name: '飞利浦 X818 香槟金 全网通4G',
                price: 1998
            }, {
                name: '三星 Galaxy S7（G9300）',
                price: 4088
            }, {
                name: '华为 荣耀7 双卡双待双通',
                price: 1128
            }, {
                name: '努比亚(nubia)Z7Max(NX505J)',
                price: 728
            }]
        ]
    }, {
        num: '4',
        text: '家用电器',
        tabs: ['热门', '大家电', '生活电器'],
        offsetTop: floor.$floor.eq(3).offset().top,
        height: floor.$floor.eq(3).height(),
        items: [
            [{
                name: '暴风TV 超体电视 40X 40英寸',
                price: 1299
            }, {
                name: '小米（MI）L55M5-AA 55英寸',
                price: 3699
            }, {
                name: '飞利浦HTD5580/93 音响',
                price: 2999
            }, {
                name: '金门子H108 5.1套装音响组合',
                price: 1198
            }, {
                name: '方太ENJOY云魔方抽油烟机',
                price: 4390
            }, {
                name: '美的60升预约洗浴电热水器',
                price: 1099
            }, {
                name: '九阳电饭煲多功能智能电饭锅',
                price: 159
            }, {
                name: '美的电烤箱家用大容量',
                price: 329
            }, {
                name: '奥克斯(AUX)936破壁料理机',
                price: 1599
            }, {
                name: '飞利浦面条机 HR2356/31',
                price: 665
            }, {
                name: '松下NU-JA100W 家用蒸烤箱',
                price: 1799
            }, {
                name: '飞利浦咖啡机 HD7751/00',
                price: 1299
            }],
            [{
                name: '暴风TV 超体电视 40X 40英寸',
                price: 1299
            }, {
                name: '小米（MI）L55M5-AA 55英寸',
                price: 3699
            }, {
                name: '飞利浦HTD5580/93 音响',
                price: 2999
            }, {
                name: '金门子H108 5.1套装音响组合',
                price: 1198
            }, {
                name: '方太ENJOY云魔方抽油烟机',
                price: 4390
            }, {
                name: '美的60升预约洗浴电热水器',
                price: 1099
            }, {
                name: '九阳电饭煲多功能智能电饭锅',
                price: 159
            }, {
                name: '美的电烤箱家用大容量',
                price: 329
            }, {
                name: '奥克斯(AUX)936破壁料理机',
                price: 1599
            }, {
                name: '飞利浦面条机 HR2356/31',
                price: 665
            }, {
                name: '松下NU-JA100W 家用蒸烤箱',
                price: 1799
            }, {
                name: '飞利浦咖啡机 HD7751/00',
                price: 1299
            }],
            [{
                name: '暴风TV 超体电视 40X 40英寸',
                price: 1299
            }, {
                name: '小米（MI）L55M5-AA 55英寸',
                price: 3699
            }, {
                name: '飞利浦HTD5580/93 音响',
                price: 2999
            }, {
                name: '金门子H108 5.1套装音响组合',
                price: 1198
            }, {
                name: '方太ENJOY云魔方抽油烟机',
                price: 4390
            }, {
                name: '美的60升预约洗浴电热水器',
                price: 1099
            }, {
                name: '九阳电饭煲多功能智能电饭锅',
                price: 159
            }, {
                name: '美的电烤箱家用大容量',
                price: 329
            }, {
                name: '奥克斯(AUX)936破壁料理机',
                price: 1599
            }, {
                name: '飞利浦面条机 HR2356/31',
                price: 665
            }, {
                name: '松下NU-JA100W 家用蒸烤箱',
                price: 1799
            }, {
                name: '飞利浦咖啡机 HD7751/00',
                price: 1299
            }]
        ]
    }, {
        num: '5',
        text: '电脑数码',
        tabs: ['热门', '电脑/平板', '潮流影音'],
        offsetTop: floor.$floor.eq(4).offset().top,
        height: floor.$floor.eq(4).height(),
        items: [
            [{
                name: '戴尔成就Vostro 3800-R6308',
                price: 2999
            }, {
                name: '联想IdeaCentre C560',
                price: 5399
            }, {
                name: '惠普260-p039cn台式电脑',
                price: 3099
            }, {
                name: '华硕飞行堡垒旗舰版FX-PRO',
                price: 6599
            }, {
                name: '惠普(HP)暗影精灵II代PLUS',
                price: 12999
            }, {
                name: '联想(Lenovo)小新700电竞版',
                price: 5999
            }, {
                name: '游戏背光牧马人机械手感键盘',
                price: 499
            }, {
                name: '罗技iK1200背光键盘保护套',
                price: 799
            }, {
                name: '西部数据2.5英寸移动硬盘1TB',
                price: 419
            }, {
                name: '新睿翼3TB 2.5英寸 移动硬盘',
                price: 849
            }, {
                name: 'Rii mini i28无线迷你键盘鼠标',
                price: 349
            }, {
                name: '罗技G29 力反馈游戏方向盘',
                price: 2999
            }],
            [{
                name: '戴尔成就Vostro 3800-R6308',
                price: 2999
            }, {
                name: '联想IdeaCentre C560',
                price: 5399
            }, {
                name: '惠普260-p039cn台式电脑',
                price: 3099
            }, {
                name: '华硕飞行堡垒旗舰版FX-PRO',
                price: 6599
            }, {
                name: '惠普(HP)暗影精灵II代PLUS',
                price: 12999
            }, {
                name: '联想(Lenovo)小新700电竞版',
                price: 5999
            }, {
                name: '游戏背光牧马人机械手感键盘',
                price: 499
            }, {
                name: '罗技iK1200背光键盘保护套',
                price: 799
            }, {
                name: '西部数据2.5英寸移动硬盘1TB',
                price: 419
            }, {
                name: '新睿翼3TB 2.5英寸 移动硬盘',
                price: 849
            }, {
                name: 'Rii mini i28无线迷你键盘鼠标',
                price: 349
            }, {
                name: '罗技G29 力反馈游戏方向盘',
                price: 2999
            }],
            [{
                name: '戴尔成就Vostro 3800-R6308',
                price: 2999
            }, {
                name: '联想IdeaCentre C560',
                price: 5399
            }, {
                name: '惠普260-p039cn台式电脑',
                price: 3099
            }, {
                name: '华硕飞行堡垒旗舰版FX-PRO',
                price: 6599
            }, {
                name: '惠普(HP)暗影精灵II代PLUS',
                price: 12999
            }, {
                name: '联想(Lenovo)小新700电竞版',
                price: 5999
            }, {
                name: '游戏背光牧马人机械手感键盘',
                price: 499
            }, {
                name: '罗技iK1200背光键盘保护套',
                price: 799
            }, {
                name: '西部数据2.5英寸移动硬盘1TB',
                price: 419
            }, {
                name: '新睿翼3TB 2.5英寸 移动硬盘',
                price: 849
            }, {
                name: 'Rii mini i28无线迷你键盘鼠标',
                price: 349
            }, {
                name: '罗技G29 力反馈游戏方向盘',
                price: 2999
            }]
        ]
    }];

    // function lazyLoadFloor() {
    //     var items = {},
    //         loadedItemNum = 0,
    //         loadItemFn = null,
    //         totalItemN   floor.$floor.length;

    //     $doc.on('floor-show', loadItemFn = function (e, index, elem) {
    //         if (items[index] !== 'loaded') {
    //             $doc.trigger('floor-loadItem', [index, elem]);
    //         }
    //     })
    //     $doc.on('floor-loadItem', function (e, index, elem) {
    //         //按需加载
    //         var html = buildFloor(floor.floorData[index]),
    //             $elem = $(elem);
    //         items[index] = 'loaded';
    //         loadedItemNum++;
    //         console.log(index + ':loaded');
    //         if (loadedItemNum === totalItemNum) {
    //             //全部加载完成
    //             $doc.trigger('floor-itemsLoaded');
    //         }
    //         setTimeout(function () {
    //             $elem.html(html);
    //             lazyLoadFloorImgs($elem)
    //             $elem.tab({
    //                 event: 'mouseenter',
    //                 css3: false,
    //                 js: false,
    //                 animation: 'fade',
    //                 activeIndex: 0,
    //                 interval: 0,
    //                 delay: 0
    //             })
    //         }, 1000)

    //     })
    //     $doc.on('floor-itemsLoaded', function (e) {
    //         //清除事件
    //         console.log('floors-itemsLoaded');
    //         $doc.off('floor-show', loadItemFn);
    //         $win.off('scroll resize', lazy.timeToShow)
    //     })
    // }
    floor.buildFloor = function (floorData) {
        var html = '';
        html += '<div class="container">';
        html += floor.buildFloorHead(floorData);
        html += floor.buildFloorBody(floorData);
        html += ' </div>';
        return html;
    }
    floor.buildFloorHead = function (floorData) {
        var html = '';
        html += '<div class="floor-head">';
        html += '<h2 class="floor-tilte fl"><span class="floor-title-num">' + floorData.num + 'F</span><span class="floor-title-text">' + floorData.text + '</span></h2> <ul class="tab-item-wrap fr">';
        for (var i = 0; i < floorData.tabs.length; i++) {
            html += '<li class="fl"><a href="javascript:;" class="tab-item link">' + floorData.tabs[i] + '</a></li>'
            if (i !== floorData.tabs.length) {
                html += '<li class="floor-divider fl text-hidden">分割线</li>';
            }
        }
        html += '</ul></div>';
        return html;
    }
    floor.buildFloorBody = function (floorData) {
        // console.log(floor.floorData);
        var html = '';
        html += '<div class="floor-body">';

        for (var i = 0; i < floorData.items.length; i++) {
            html += '<ul class="tab-panel">';
            for (var j = 0; j < floorData.items[i].length; j++) {
                // console.log(floor.floorData.items[i][j]);
                html += '  <li class="floor-item fl">'
                html += '<p class="floor-item-pic"><a href="###" target="_blank" rel="noopener noreferrer"><img src="img/floor/loading.gif"  data-src="img/floor/' + floorData.num + '/' + (i + 1) + '/' + (j + 1) + '.png" alt="衣服" class="floor-img"></a></p>'
                html += '<p class="floor-item-name"><a href="###" target="_blank" rel="noopener noreferrer" class="link">' + floorData.items[i][j].name + '</a></p>'
                html += '<p class="floor-item-price">' + floorData.items[i][j].price + '</p>'
                html += '</li>';
            }
            html += '</ul>';
        }
        html += '</div>'
        return html;
    }
    var browser = {};
    browser.$win = $(window);
    browser.$doc = $(document);
    browser.$win.on('scroll resize', floor.showFloor = function () {
        clearTimeout(floor.timer);
        floor.timer = setTimeout(lazyLoad.timeToShow, 250)
    });
    floor.$floor.on('floor-loadItems', function (e, index, elem, success) {
        imgLoader.loadImgs($(elem).find('.floor-img'), success, function ($img, url) {
            $img.attr('src', 'img/floor/placeholder.png');
        })
    })
    browser.$doc.on('floors-itemsLoaded', function () {
        browser.$win.off('scroll resize', floor.showFloor);
    });
    browser.$doc.on('floors-loadItems', function (e, index, elem, success) {
        //按需加载
        var html = floor.buildFloor(floor.floorData[index]),
            $elem = $(elem);
        success();
        setTimeout(function () {
            $elem.html(html);
            lazyLoad.loadUntil({
                $container: $elem,
                totalItemNum: $elem.find('.floor-img').length,
                triggerEvent: 'tab-show',
                id: 'floor'
            });
            $elem.tab({
                event: 'mouseenter',
                css3: false,
                js: false,
                animation: 'fade',
                activeIndex: 0,
                interval: 0,
                delay: 0
            })
        }, 1000)

    })
    lazyLoad.loadUntil({
        $container: browser.$doc,
        totalItemNum: floor.$floor.length,
        triggerEvent: 'floor-show',
        id: 'floors'
    });
    lazyLoad.timeToShow();
    // elevator
    floor.whichFloor = function () {
        var num = -1;
        floor.$floor.each(function (index, elem) {
            num = index;
            if (browser.$win.scrollTop() + browser.$win.height() / 2 < floor.floorData[index].offsetTop) {
                num = index - 1;
                return false;
            }
        })
        return num;
    }
    floor.$elevator = $('#elevator');
    floor.$elevator.$items = floor.$elevator.find('.elevator-item');
    floor.setElevator = function () {
        var num = floor.whichFloor();
        if (num === -1) {//fadeOut
            floor.$elevator.fadeOut();
        } else {//fadeIn
            floor.$elevator.fadeIn();
            floor.$elevator.$items.removeClass('elevator-active');
            floor.$elevator.$items.eq(num).addClass('elevator-active');
        }
    }
    floor.setElevator();
    browser.$win.on('scroll resize', function () {
        clearTimeout(floor.elevatorTimer);
        floor.elevatorTimer = setTimeout(floor.setElevator, 250)
    });
    floor.$elevator.on('click', '.elevator-item', function () {
        $('html, body').animate({
            scrollTop: floor.floorData[$(this).index()].offsetTop
        })
    })
    //底部站点
  
    var foot = {};
    foot.helperData = [
        {
            title: '消费者保障',
            text: ['保证范围', '退货退款流程', '服务中心', '更多特色服务']
        },
        {
            title: '新手上路',
            text: ['新手专区', '消费警示', '安全警示', '更多特色服务']
        },
        {
            title: '付款方式',
            text: ['快捷付款', '信用卡', '余额包', '蜜蜂花啊', '货到付款']
        },
        {
            title: '慕淘特色',
            text: ['手机慕淘', '慕淘', '大众评审', 'B格指南']
        }
    ];
    foot.footerData = {
        links:['关于慕淘', '合作伙伴', '营销中心', '廉政举报', '联系客服', '开放平台', '诚征英才', '联系我们', '网站地图', '法律声明', '知识产权'],
        copyright: '© 2017 imooc.com All Rights Reserved'
    }
    foot.buildHelper = function (helperData) {
        var html = '';
        html += '<div class="container">';
        for (var i = 0; i < foot.helperData.length; i++) {
            html += '<div class="helper-item  fl"><dl><dt>' + foot.helperData[i].title + '</dt><dd>'
            for (var j = 0; j < foot.helperData[i].text.length; j++) {
                html += '<a href="###" class="link">' + foot.helperData[i].text[j] + '</a>';
            }
            html += '</dd></dl></div>'
        }
        html += '</div>';
        return html;
    }
    foot.buildFooter = function (footerData) {
        var html ='';
        html = '<div" class="container"><p class="links">';
        for(var i= 0; i < foot.footerData.links.length; i++) {
            html += '<a href="###" class="link">'+foot.footerData.links[i]+'</a>';
        }
        html +='</p><p class = "copyright">'+foot.footerData.copyright+'</p>'
        html += '</div">';
        return html;
    }
foot.$helper = $('.helper');
foot.$footer = $('.footer');
    foot.isVisable = function ($elem) {
        return (browser.$win.scrollTop()+ browser.$win.height() > $elem.offset().top) && (browser.$win.scrollTop() < $elem.height() + $elem.offset().top);
    }
    foot.timeToshow = function () {
        console.log('foot-timeToshow');
        if(foot.isVisable(foot.$helper) || foot.isVisable(foot.$footer)) {
            browser.$doc.trigger('foot-show', [0, foot.$helper[0]]);
        }
    }
    browser.$win.on('scroll resize', foot.showFoot=function() {
        clearTimeout(foot.timer);
        foot.timer = setTimeout(function () {
             foot.timeToshow(foot.$helper)
         }, 250);
     })
    browser.$doc.on('foot-loadItems', function (e,index,elem,success) {
        var helperHtml = foot.buildHelper(foot.helperData),
        footerHtml = foot.buildFooter(foot.footerData)
        success();
        setTimeout(function () {
            foot.$helper.html(helperHtml);
            foot.$footer.html(footerHtml);
        }, 1000)
       
    })
    browser.$doc.on('foot-itemsLoaded', function() {
        browser.$win.off('scroll resize', foot.showFoot);
    })
    lazyLoad.loadUntil({
        $container: browser.$doc,
        totalItemNum: 1,
        triggerEvent: 'foot-show',
        id: 'foot'
    })
    foot.timeToshow(foot.$helper);

    //toolbar
    $('#backToTop').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        })
    });
})(jQuery);