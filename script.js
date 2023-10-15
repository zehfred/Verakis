$(document).ready(function () {
  // Check the data-page-slug attribute and update the body class accordingly
  var pageSlug = $("body").attr("data-page-slug");
  var hostname = window.location.pathname;

  // Check for the special case first
  if (pageSlug === "a-comida-na-boca-do-povo") {
    $('[data-menu-link="comunicacao"]').addClass("w--current");
    $("body").removeClass("page-training").addClass("page-communication");
  } else {
    // Check hostname and set the appropriate class
    if (hostname.includes("formacao")) {
      $('[data-menu-link="formacao"]').addClass("w--current");
    } else if (hostname.includes("negocios")) {
      $('[data-menu-link="negocios"]').addClass("w--current");
    } else if (hostname.includes("comunicacao")) {
      $('[data-menu-link="comunicacao"]').addClass("w--current");
    } else if (hostname.includes("artigo")) {
      $('[data-menu-link="artigos"]').addClass("w--current");
    }
  }

  // Check for the existence of the Splide slider and its required child element
  var $slider = $(".testimonials-slider");
  if ($slider.length && $slider.find(".splide__list").length) {
    var splide = new Splide(".testimonials-slider", {
      type: "loop",
      perPage: 2,
      perMove: 1,
      gap: "2rem",
      pagination: false,
    });
    splide.mount();
  } else {
    // Remove the section_testimonials from the DOM if there's no splide__list
    $(".section_testimonials").remove();
  }

  // Check and sort modules-grid
  var $grid = $(".modules-grid");
  if ($grid.length) {
    sortModulesGrid($grid);
  }

  $(".tabs-menu .tab-link").on("click", function () {
    var $thisTab = $(this);
    var $parentMenu = $thisTab.closest(".tabs-menu");

    var position = $thisTab.position().left;
    var tabWidth = $thisTab.outerWidth();
    var menuWidth = $parentMenu.width();
    var currentScrollLeft = $parentMenu.scrollLeft();

    // Adjust position for items that won't be fully visible
    if (position + tabWidth > menuWidth + currentScrollLeft) {
      position = position - menuWidth + tabWidth;
    }

    // Smoothly animate the scrollLeft property of the tabs-menu to the clicked tab-link
    $parentMenu.animate({ scrollLeft: position }, 200);
  });

  $(".main-menu_button").on("click", function () {
    $("body").toggleClass("no-scroll");
  });
});

function sortModulesGrid($grid) {
  var $items = $grid.find(".modules-grid_item");

  $items
    .sort(function (a, b) {
      var dateAString = $(a).attr("data-module-date");
      var dateBString = $(b).attr("data-module-date");

      // Convert the date strings into actual Date objects
      var dateA = new Date(dateAString);
      var dateB = new Date(dateBString);

      // Compare the Date objects
      return dateA - dateB;
    })
    .appendTo($grid);
}
