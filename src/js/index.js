$(document).ready(function() {
    
    (function($) {
        $.fn.hasScrollbar = function() {
            return this.get(0).scrollHeight > this.height();
        }
    })(jQuery);

    updatePage();

    $(window).on('hashchange',function() { 
        updatePage();
    });

    $(".navigation a").click(function() {
        window.location.hash = $(this).attr("href");
        updatePage();
    });

    function updatePage() {
        var getPage = window.location.hash ? window.location.hash.substr(1) : "welcome";
        $("a.active").removeClass("active");

        if (getPage == "welcome") $('a[href=""]').addClass("active");
        else $('a[href="#' + getPage + '"]').addClass("active");
        
        $("section.active").removeClass("active"); 
        $("section." + getPage).addClass("active");

        $("body").css("background-image", 
                    "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" + 
                        getBackground(getPage) + ")");

        window.scrollTo(0, 0);

        if($("body").hasScrollbar()) {
            $(".navigation.tilt:not(top-left)").css("transform", "rotateZ(-45deg) translate(-50.4vw, 10.705vh)");
            $(".navigation.tilt.top-left").css("transform", "rotateZ(45deg) translate(50.5vw, 10.705vh)");
        }
        else {
            $(".navigation.tilt").css("transform", "");
            $(".navigation.tilt.top-left").css("transform", "");
        }
    }

    function reAnimate(element, animation, removeAnimation) {
        var newElement;
        element.removeClass(removeAnimation);

        /*Clones the current element and removes the old element from the DOM tree*/
        element.before(element.clone(true));
        newElement = element.prev();
        element.remove();

        newElement.addClass(animation);
    }

    function getBackground(page) {
        var background = "./res/images/";
        switch(page) {
            case "welcome":
                background += "Sidebar.jpg";
                break;
            case "story":
                background += "Rocher.jpg";
                break;
            case "team-waffle":
                background += "Sidebar.jpg";
                break;
            case "menu":
                background += "Sidebar.jpg";
                break;
            case "catering":
                background += "CateringBG.jpg";
                break;
            case "deals":
                background += "Meal-Deals.jpg";
                break;
            case "gallery":
                background += "GalleryBG.jpg";
                break;
            case "enquiries":
                background += "Storefront.jpg";
                break;
        }
        return background;
    }
});