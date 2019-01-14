(function ($) {
  $(function () {
    Barba.Pjax.init();
    Barba.Prefetch.init();

    $.scrollify({
      section: '.scrollify-section',
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
        console.log($('.pagination').find('a[href=\'#' + ref + '\']'),ref)
      }
    });

    // var fixedContent = {
    //   init: function () {
    //     var self = this;

    //     this.setParameters();

    //     $(window).scroll(function(){
    //       self.toggleClass($(this).scrollTop());
    //     });
    //   },
    //   setParameters: function () {
    //     this.content = $('.content');
    //     this.contentTopPosition = this.content.offset().top;
    //   },
    //   toggleClass: function (value) {
    //     if (value )
    //   }
    // };
  });
})(jQuery);