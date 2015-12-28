import * as Mailchimp from './mailchimp';

$('.myform').submit(function(e) {
  e.preventDefault();
  Mailchimp.sendForm(this);
});

$(document).ready(function() {
  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });




  var offcanvasToggle = $('.offcanvas-toggle');
  offcanvasToggle.on('click', function(ev) {
    var $this = $(this),
        offcanvas = $('.offcanvas'),
        page = $('.page');
    ev.preventDefault();

    $this.hide();
    offcanvas.addClass('offcanvas--open');
    page.addClass('page--blurry');

    offcanvas.before().on('click', (ev) => {
      offcanvas.removeClass('offcanvas--open');
      page.removeClass('page--blurry');
      $this.fadeIn();
    });
  });
});
