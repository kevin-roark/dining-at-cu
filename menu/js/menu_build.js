(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* export something */
module.exports = new Kutility;

/* constructor does nothing at this point */
function Kutility() {

}

/**
 * get a random object from the array arr
 *
 * @api public
 */
 
Kutility.prototype.choice = function(arr) {
    var i = Math.floor(Math.random() * arr.length);
    return arr[i];
}

/**
 * returns a random color as an 'rgb(x, y, z)' string
 *
 * @api public
 */
Kutility.prototype.randColor = function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

},{}],2:[function(require,module,exports){
$(function() {
    var CONTENT_LOAD_LENGTH = 3000;
    var AD_DELAY_LENGTH = 10000;
    var BETWEEN_AD_LENGTH = 1500;

    var kutility = require('../../js/lib/kutility');

    var date = window.location.hash.substring(1);
    var title = "Dining @ Cu Menu for " + date;
    document.title = title;

    var loadingColors = [
        'rgba(30, 225, 30, 1)',
        'rgba(30, 30, 225, 1)',
        'rgba(225, 225, 30, 1)',
        'rgba(225, 30, 225, 1)',
        'rgba(0, 200, 200, 1)',
        'rgba(225, 30, 30, 1)'
    ];

    var adPrefix = '../images/ads/';
    var ads = [
        adPrefix + '1.jpg'
    ];

    var loading = $('.loading');
    var menuSplash = $('.menu-splash-container');
    var colorIndex = 0;

    function getDateLink(date) {
      var day = ''  + date.getDate();
      if (day.length <= 1) {
        day = '0' + day;
      }
      var month = '' + (date.getMonth() + 1);
      if (month.length <= 1) {
        month = '0' + month;
      }
      var year = ('' + date.getFullYear()).substring(2);

      var formattedDate = month + '-' + day + '-' + year;
      return '/menu/#' + formattedDate;
    }

    /* start the loading animation */
    var loadingTimer = setInterval(function() {
        var periods = loading.html();
        if (periods.length < 3) {
            periods += '.';
        }
        else {
            periods = '';
        }
        loading.html(periods);

        if (colorIndex >= loadingColors.length)
            colorIndex = 0;
        menuSplash.css('background-color', loadingColors[colorIndex++])
    }, 500);

    /* end the loading animation and fade content in */
    setTimeout(function() {
        var menuSplashHead = $('.menu-splash-head');

        clearTimeout(loadingTimer);
        loading.html('...');
        menuSplash.css('background-color', '#eee');
        menuSplashHead.css('color', '#222');
        menuSplashHead.css('background-color', 'transparent');

        menuSplash.animate({
            'height': '36%'
        }, 1000, function() {
            /* fade in the content */
            menuSplashHead.css('text-align', 'center');
            menuSplashHead.html('Time to eat!');

            $('.menu-content-wrapper').fadeIn(1000);
        });
    }, CONTENT_LOAD_LENGTH);

    /* start putting ads in */
    setTimeout(function() {
        function putAd() {
            var ad = kutility.choice(ads);
            var el = $('<div>');
            el.addClass('menu-ad');

            var x = Math.floor(Math.random() * ($(window).width() - 225)) + 25;
            var y = Math.floor(Math.random() * ($(window).height() - 150)) + 25;
            el.css('left', x);
            el.css('top', y);

            var im = '<img src="' + ad + '" alt="sick ad"></img>';
            el.html(im);

            $('body').append(el);
        }
        setInterval(putAd, BETWEEN_AD_LENGTH);
        putAd();

    }, AD_DELAY_LENGTH)

    $('#dining-text').html($('#dining-text').html() + ' ' + date.replace(/-/g, ' / '));

    $('.tomorrow-link').attr('href', getDateLink(new Date(new Date(date).getTime() + 24 * 3600 * 1000)));

});

},{"../../js/lib/kutility":1}]},{},[2])