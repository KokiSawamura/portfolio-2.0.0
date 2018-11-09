(function ($) {
  $(function () {
    /* Barba.Pjax.init(); */

    $.scrollify({
      section: '.scrollify-section',
      interstitialSection: 'header, footer',
      scrollbars: false,
      updateHash: false,
      before: function (i, panels) {
        var ref = panels[i].attr('id');

        $('.pagination .active').removeClass('active');

        $('.pagination').find('a[href=\'#' + ref + '\']').addClass('active');
      },
      afterRender: function () {
        var ref = $.scrollify.current().attr('id');
        
        $('.pagination .active').removeClass('active');
        $('.pagination').find('a[href=\'#' + ref + '\']').addClass('active');
      }
    });
  });
})(jQuery);