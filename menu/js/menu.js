$(function() {
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

    var loading = $('.loading');
    var menuSplash = $('.menu-splash-container');
    var colorIndex = 0;

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

    /* end the loading animation */
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
    }, 3000);

});