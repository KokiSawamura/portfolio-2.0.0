(function ($) {
  $(function () {
    /* Barba.Pjax.init();
    Barba.Prefetch.init(); */

    $.scrollify({
      section: '.scrollify-section',
      scrollbars: false,
      before: function (i, panels) {
        var ref = panels[i].attr('data-section-name');

        $('.pagination .active').removeClass('active');

        $('.pagination').find('a[href=\'#' + ref + '\']').addClass('active');
      },
      afterRender: function () {
        var ref = $.scrollify.current().attr('id');

        $('.pagination .active').removeClass('active');
        $('.pagination').find('a[href=\'#' + ref + '\']').addClass('active');

        $('.pagination a').on('click', $.scrollify.move);
      }
    });

    var fullPage = function () {
      init: function () {
        var self = this;

        this.applyStyle();

        $(window).on('resize', function(){
          self.applyStyle();
        });
      },
      setParameters: function () {
        this.$target = $('.hero');
      },
      applyStyle: function () {
        this.$target.css('height', $(window).outerHeight());
      }
    };

    fullPage.init();



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