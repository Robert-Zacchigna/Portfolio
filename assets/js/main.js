<!-- Nav Bar Scroll Padding to Page Anchors -->
$(window).bind('load resize', function(event) {
  document.styleSheets[2].cssRules[0].style.setProperty("--nav-height", document.getElementById("nav-head").offsetHeight + 'px');
});

<!-- Nav Bar Page Highlighting -->
$(function(){
    $('a').each(function(){
        if ($(this).prop('href') == window.location.href) {
            $(this).parent('div').addClass('active');
        }
    });
});
