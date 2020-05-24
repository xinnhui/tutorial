// 自动识别各浏览器的transition
(function() {
    var transitionEndEventName = {
        transition: 'transitionend',
        MozTransition: 'transitionennd',
        WebkitTransition: 'webkitTransitionEnd',
        OTransition: 'oTransitionEnd otransitionend'
    }
    var tranistionEnd = '',
        isSupport = false;
    for (var name in transitionEndEventName) {
        if (document.body.style[name] !== undefined) {

            tranistionEnd = transitionEndEventName[name];
            isSupport = true;
            break;
        }
    }
    window.mt = window.mt || {};
    window.mt.transition = {
        end: tranistionEnd,
        isSupport: isSupport
    };
})()