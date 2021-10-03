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

<!-- Render Notebook Frames on Button Click -->
document.addEventListener('DOMContentLoaded', () => {
    var myBtns = document.getElementsByTagName("input")
    buttons = new Array();

    for (var i = 0; i < myBtns.length; i++) {
        buttons.push(document.getElementById(myBtns[i].id));
    };
});

$(document).ready(function() {
    $("input").click(function() {
        $(this).toggleClass("active");

        var iframe_divs = document.getElementsByClassName('render-notebook');
        var iframes = new Array();

        for (var i = 0; i < iframe_divs.length; i++) {
            iframes.push(document.getElementById(iframe_divs[i].children[1].id));
        };

        var frame_buttons = iframes.map(function(e, i) {
            return [iframes[i], buttons[i]];
        });

        for (var i = 0; i < frame_buttons.length; i++) {
            if (frame_buttons[i][0].style.display === "none" && frame_buttons[i][1].classList[0] === "active") {
                frame_buttons[i][0].style.display = "block";
            }
            if (frame_buttons[i][1].classList[0] != "active") {
                frame_buttons[i][0].style.display = "none";
            }
        }
    });
});