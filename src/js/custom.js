import { app } from '../config';
// ISOTOPE FILTER
/* jQuery(document).ready(function($){

  if ( $('.iso-box-wrapper').length > 0 ) {

      var $container  = $('.iso-box-wrapper'),
        $imgs     = $('.iso-box img');

      $container.imagesLoaded(function () {

        $container.isotope({
        layoutMode: 'fitRows',
        itemSelector: '.iso-box'
        });

        $imgs.load(function(){
          $container.isotope('reLayout');
        })

      });

      //filter items on button click

      $('.filter-wrapper li a').click(function(){

          var $this = $(this), filterValue = $this.attr('data-filter');

      $container.isotope({
        filter: filterValue,
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false,
        }
      });

      // don't proceed if already selected

      if ( $this.hasClass('selected') ) {
        return false;
      }

      var filter_wrapper = $this.closest('.filter-wrapper');
      filter_wrapper.find('.selected').removeClass('selected');
      $this.addClass('selected');

        return false;
      });

  }

}); */

// jQuery to collapse the navbar on scroll //
$(window).scroll(function () {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
  } else {
    $(".navbar-fixed-top").removeClass("top-nav-collapse");
  }
});

/* HTML document is loaded. DOM is ready.
-------------------------------------------*/
$(function () {
  // ------- WOW ANIMATED ------ //
  /* const WOW = require("./wow.min.js");
  let wow = new WOW({
    mobile: false,
  });
  wow.init(); */

  // HIDE MOBILE MENU AFTER CLIKING ON A LINK
  $(".navbar-collapse a").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // NIVO LIGHTBOX
  /* $(".iso-box-section a").nivoLightbox({
    effect: "fadeScale",
  }); */
  $("#contact-form input, #contact-form textarea").on("change", function (e) {
    $(this).next('small').html('');
  });

  $("#contact-form").submit(function (e) {
    e.preventDefault();
    $('.success-message').html('');
    $('.success-message').hide();
    let submit = $(this).find("#submit");
    $(submit).attr("disabled", "disabled");

    let data = new FormData(this);

    $.ajax({
      url: app.url + "/api/contact",
      method: 'POST',
      data: data,
      dataType: 'json',
      processData: false,
      contentType: false,
      cache: false,
      enctype: "multipart/form-data",
      success: function (res) {
        console.log(res);
        $('.success-message').html(res.message);
        $('.success-message').show();
        $('#contact-form')[0].reset();
        $(submit).removeAttr("disabled");
      },
      error: function (err) {
        console.log(err.responseJSON);
        if(err.status == 422 && err.responseJSON) {
          let errors = err.responseJSON?.errors;
          for(let [errKey, errValue] of Object.entries(errors)) {
            $('.'+errKey+'-error').html(errValue[0]);
          }
        }
        $(submit).removeAttr("disabled");
      },
    });
  });
});
