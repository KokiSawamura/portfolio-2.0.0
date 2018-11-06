(function ($) {
  $(function () {
    /* Barba.Pjax.init(); */

    $.scrollify({
      section : ".scrollify-section",
      interstitialSection: 'header, footer',
      scrollbars: false,
      updateHash: false
    });
  });
})(jQuery);