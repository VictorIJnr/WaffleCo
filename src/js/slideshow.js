$(document).ready(function() {
    var slideIndex = 0, prevIndex = 0;
    var initial = true;
    var currSlide, prevSlide;
    var timer;

    showSlides();

    $(".slide-nav li img").click(function() {
        var newIndex = $(this).parent().index();
        prevIndex = $(".slide-container").children(".slide.fade").index();
        if (newIndex != prevIndex) {
            clearTimeout(timer);
            showSlides(newIndex);
        }
    });

    function showSlides(index) {
        if (index != undefined) slideIndex = index;

        var slides = $(".slide");

        prevSlide = (index != undefined) 
            ? slides.eq(prevIndex)
            : slides.eq((slideIndex - 1 < 0) ? slides.length - 1 : slideIndex - 1);
        currSlide = slides.eq(slideIndex);

        if(!initial) {
            prevSlide.css("display", "block");
            reAnimate(prevSlide, "fade-out", "fade");
        }

        slides.css("display", "none");

        currSlide.css("display", "block");

        reAnimate(currSlide, "fade", "fade-out");

        slideIndex += (slideIndex + 1 == slides.length) ? 1 - slides.length : 1;

        initial = false;
        timer = setTimeout(showSlides, 5000);
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

    $(".slide").on("animationend", function(animation) {
        if (animation.originalEvent.animationName == "fade-out") {
            $(this).css("display", "none");
        }
    });
});