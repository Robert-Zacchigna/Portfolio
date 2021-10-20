<!-- Nav Bar Scroll Padding to Page Anchors -->
$(window).bind('load resize', function(event) {
  document.styleSheets[2].cssRules[0].style.setProperty("--nav-height", document.getElementById("nav-head").offsetHeight + 'px');
});

<!-- Nav Bar Page Highlighting -->
$(function(){
    $('a').each(function(){
        var win_href = window.location.href;

        if ($(this).prop('href') == win_href) {
            $(this).parent('div').addClass('active');
        } else if ($(this).prop('href') == win_href.slice(0, -1)) {
            $(this).parent('div').addClass('active');
        } else {
            $(this).parent('div').removeClass('active');
        }
    });
});
