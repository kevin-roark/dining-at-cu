$(function() {

    function blurElement(el, blur) {
      var filter = 'blur(' + blur + 'px)';
      var $el = $(el);
      $el.css('-webkit-filter', filter);
      $el.css('-moz-filter', filter);
      $el.css('-o-filter', filter);
      $el.css('-ms-filter', filter);
      $el.css('filter', filter);
    }

    function updatePage(date) {
      window.location.replace(getDateLink(date));
    }

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
      return './menu/#' + formattedDate;
    }

    function isScrolledIntoView(elem) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();

      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $('#today-menu-link').attr('href', getDateLink(new Date()));

    var pizzaBg = $('.splash-background-container');

    $(document).scroll(function() {
      var scrollTop = $(document).scrollTop();
      var blurAmt = scrollTop * 0.02;
      blurElement(pizzaBg, blurAmt);

      if (isScrolledIntoView($('.menu-date-input'))) {
        $('.menu-date-input').focus();
      }
    });

    $('.menu-form').submit(function(ev) {
      var dateStr = $('.menu-date-input').val();
      var date = chrono.parseDate(dateStr);
      if (!date) {
        $('.menu-date-input').val('');
        $('.menu-date-input').attr('placeholder', "That's not a date. Try " + '"Monday."');
      }
      else {
        updatePage(date);
      }

      return false;
    });
});