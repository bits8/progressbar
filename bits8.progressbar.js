 (function ($) {
    $.fn.bits8progressbar = function (options) {
      this.each(function () {
        var that = $(this), settings = $.extend({
          start: that.data('start') || '',
          end: that.data('end') || '',
          value: that.data('value') || 0,
          total: that.data('total') || 100,
          alt: that.data('start') == undefined && that.data('end') == undefined,
          text: that.data('text') == undefined || that.data('text') == 'false'
        }, options), todate = function (dateStr) {
          var parts = dateStr.split(".");
          return new Date(parts[2], parseInt(parts[1]) - 1, parts[0]);
        }, getdiff = function (a, b) {
          var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()),
            utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
          return Math.floor((utc2 - utc1) / 1000 * 60 * 60 * 24);
        },diff = !settings.alt ? getdiff(todate(settings.start), todate(settings.end)) : 0,
          processpercent = !settings.alt ? parseInt(getdiff(todate(settings.start), new Date()) * (settings.total / diff))
            : Math.floor((parseInt(settings.value) / parseInt(settings.total) * 100)),
          parentwidth = that.parent().width(),
          width = Math.floor((parentwidth * processpercent) / 100),
          width = width > parentwidth ? parentwidth : width;
        that.css({width: width + 'px'});
        if(settings.text) that.text(processpercent + '%');
      });
    };
}(jQuery));