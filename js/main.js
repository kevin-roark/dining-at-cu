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

    function updateStateDate(date) {
      var title = "Dining @ Cu Menu for " + date;
      document.title = title;
      //window.history.pushState(date, title, "#menus/" + date);
      window.location.pathname = '/menu/#' + date;
    }

    var pizzaBg = $('.splash-background-container');

    $(document).scroll(function() {
      var scrollTop = $(document).scrollTop();
      var blurAmt = scrollTop * 0.02;
      blurElement(pizzaBg, blurAmt);

      if (scrollTop > 400) {
        $('.menu-date-input').focus();
      }
    });

    $('.menu-form').submit(function(ev) {
      var dateStr = $('.menu-date-input').val();
      var date = chrono.parseDate(dateStr);
      if (!date) {
        // handle problem
      }
      else {
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
        updateStateDate(formattedDate);
      }

      return false;
    });
});