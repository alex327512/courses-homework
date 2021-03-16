/** @format */

$(document).ready(function () {
  $('.portfolio-slider').owlCarousel({
    items: 1,
    loop: true,
    autoplayTimeout: 5000,
    nav: true,
    dotsEach: true,

    autoplay: true,
  });
  $('.reviews-slider').owlCarousel({
    items: 1,
    loop: true,
    autoplayTimeout: 5000,
    nav: true,
    dotsEach: true,

    autoplay: true,
  });
});

window.addEventListener('load', function () {
  $(document).scroll(function () {
    checkOffset();
  });

  function checkOffset() {
    if (
      $('#topNubex').offset().top + $('#topNubex').height() >=
      $('.footer').offset().top - 10
    )
      $('#topNubex').addClass('top-arrow');

    if (
      $(document).scrollTop() + window.innerHeight <
      $('.footer').offset().top
    )
      $('#topNubex').removeClass('top-arrow');
  }

  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() != 0) {
        $('#topNubex').fadeIn();
      } else {
        $('#topNubex').fadeOut();
      }
    });
    $('#topNubex').click(function () {
      $('body,html').animate(
        {
          scrollTop: 0,
        },
        700
      );
    });
  });

  let myTabs = document.querySelectorAll('ul.nav-tabs > li');

  function myTabClicks(tabClickEvent) {
    let clickedTab = tabClickEvent.currentTarget;
    let anchorReference = tabClickEvent.target;
    let activePaneId = anchorReference.getAttribute('href');
    let activePane = document.querySelector(activePaneId);

    clickedTab.classList.toggle('active');
    tabClickEvent.preventDefault();
    activePane.classList.toggle('active');
  }
  for (i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener('click', myTabClicks);
  }

  if (location.pathname == '/services.html') {
    let hash = location.hash.substr(1);
    let myTabsLinks = document.querySelectorAll('ul.nav-tabs > li > a');
    let myTabs = document.querySelectorAll('ul.nav-tabs > li');
    let myContentPanes = document.querySelectorAll('.tab-pane');

    myTabsLinks.forEach(tab => {
      if (tab.href.includes(`#${hash}`) && hash != '') {
        for (var i = 0; i < myTabs.length; i++) {
          myTabs[i].classList.remove('active');
          myContentPanes[i].classList.remove('active');
        }
        let tabItem = tab.parentElement;
        tabItem.classList.add('active');
        $(function () {
          $(window).scrollTop(0);
        });
      }
    });
    hash && document.getElementById(hash).classList.add('active');
  }
});
