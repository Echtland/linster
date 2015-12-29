function toggleBurger(ev) {
  var trigger = $(this);

  if (isClosed(trigger)) {
    trigger.removeClass('is-closed');
    trigger.addClass('is-open');
  } else {
    trigger.removeClass('is-open');
    trigger.addClass('is-closed');
  }
}

function toggleMenu(ev) {
  var $this = $(this),
      offcanvas = $('.offcanvas'),
      page = $('.page');

  if (offcanvas.hasClass('offcanvas--open')) {
    offcanvas.removeClass('offcanvas--open');
    page.removeClass('page--blurry');
  } else {
    offcanvas.addClass('offcanvas--open');
    page.addClass('page--blurry');
  }
}

function isClosed(burger) {
  return burger.hasClass('is-closed');
}



$.fn.burgerTime = function () {
  return init(this);
};

export default function init(element) {
  var $element = $(element);
  $element.click(toggleBurger)
          .click(toggleMenu);

  return $element;
}
