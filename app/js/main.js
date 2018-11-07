(function ($) {
  $(function () {
    /* Barba.Pjax.init(); */

    $.scrollify({
      section : ".scrollify-section",
      interstitialSection: 'header, footer',
      scrollbars: false,
      updateHash: false,
      before: function(i,arr) {
        var ref = panels[i].attr("href");

        $(".pagination .active").removeClass("active");

        $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
      }
    });
  });
})(jQuery);