$(function() {
    var CONTENT_LOAD_LENGTH = 3000;
    var AD_DELAY_LENGTH = 12000;
    var BETWEEN_AD_LENGTH = 4000;
    var BETWEEN_AD_LENGTH_MIN = 500;
    var BETWEEN_AD_DECREMENT = 250;

    var kutility = require('../../js/lib/kutility');

    var date = window.location.hash.substring(1);
    var title = "Dining @ Cu Menu for " + date;
    document.title = title;

    var loadingColors = [
        'rgba(5, 133, 41, 1)',
        'rgba(5, 52, 133, 1)',
        'rgba(241, 183, 9, 1)',
        'rgba(187, 7, 121, 1)',
        'rgba(5, 134, 143, 1)'
    ];

    var adPrefix = '../images/ads/';
    var ads = [
        adPrefix + '1.jpg',
        adPrefix + '2.jpg',
        adPrefix + '3.jpg',
        adPrefix + '4.jpg',
        adPrefix + '5.jpg',
        adPrefix + '6.jpg',
        adPrefix + '7.jpg',
        adPrefix + '8.jpg',
        adPrefix + '9.jpg',
        adPrefix + '10.jpg',
        adPrefix + '11.jpg',
        adPrefix + '12.jpg',
        adPrefix + '13.jpg',
        adPrefix + '14.jpg',
        adPrefix + '15.jpg',
        adPrefix + '16.jpg',
        adPrefix + '17.jpg',
        adPrefix + '18.jpg',
        adPrefix + '19.jpg',
        adPrefix + '20.jpg'
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
      return './#' + formattedDate;
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

            var x = Math.floor(Math.random() * ($(window).width() - 225)) + 0;
            var y = Math.floor(Math.random() * ($(window).height() - 150)) + 25;
            el.css('left', x);
            el.css('top', y);

            var im = '<img src="' + ad + '" alt="sick ad"></img>';
            el.html(im);

            $('body').append(el);

            BETWEEN_AD_LENGTH = Math.max(BETWEEN_AD_LENGTH - BETWEEN_AD_DECREMENT, BETWEEN_AD_LENGTH_MIN);

            setTimeout(putAd, BETWEEN_AD_LENGTH);
        }
        putAd();

    }, AD_DELAY_LENGTH)

    $('#dining-text').html($('#dining-text').html() + ' ' + date.replace(/-/g, ' / '));

    $('.tomorrow-link').attr('href', getDateLink(new Date(new Date(date).getTime() + 24 * 3600 * 1000)));
    $('.tomorrow-link').click(function(ev) {
      location.assign($(ev.target).attr('href'));
      location.reload();
    });

});
