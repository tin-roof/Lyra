$(document).ready(function () {
    slider();
});

// variables
var $slideWrapper = $('.slider-wrapper');
var $slides = $('.slider-wrapper .slides');
var $bullets;
var slideShow;
var numSlides = $slides.children().length;
var currentSlideId = 1;
var nextSlideId = 2;
var timer = 3000;

// settings
var navigation = true;
var position = true;
var autoPlay = true;
var pauseOnHover = true;

// listeners
$slideWrapper.on('click', '.bullet', function () {
    var slideId = $(this).data('slide-id');
    changeSlide(slideId);
});

$slideWrapper.on('click', '.previous', function () {
    var slideId = currentSlideId - 1;
    if (slideId <= 0) {
        slideId = numSlides;
    }
    changeSlide(slideId);
});

$slideWrapper.on('click', '.next', function () {
    var slideId = currentSlideId + 1;
    if (slideId > numSlides) {
        slideId = 1;
    }
    changeSlide(slideId);
});

if (pauseOnHover) {
    $slideWrapper.on('mouseover', '.slides', pause);
    $slideWrapper.on('mouseout', '.slides', play);
    $slideWrapper.on('mouseover', '.bullet', pause);
    $slideWrapper.on('mouseout', '.bullet', play);
}

// functions
// set slider variables and start the slide show
function slider() {
    if (position) {
        buildSlidePositionHtml(numSlides);
    }

    if (navigation) {
        buildSlideNavHtml();
    }

    if (autoPlay) {
        play();
    }
}

// play the slide show
function play() {
    clearInterval(slideShow);

    slideShow = setInterval(function () {
        setSlide(nextSlideId);

        updateSlideVars(nextSlideId)
    }, timer);
}

// pause the slide show
function pause() {
    clearInterval(slideShow);
}

// change the slide to a given slide id
function changeSlide(slideId) {
    clearInterval(slideShow);

    setSlide(slideId);

    updateSlideVars(slideId);

    if (autoPlay) {
        play()
    }
}

// handle the class switching to change the slide on the screen
function setSlide(newSlideId) {
    $slides.find('[data-slide-id=' + currentSlideId + ']').removeClass('active');
    $slides.find('[data-slide-id=' + newSlideId + ']').addClass('active');

    if (position) {
        $bullets.find('[data-slide-id=' + currentSlideId + ']').removeClass('active');
        $bullets.find('[data-slide-id=' + newSlideId + ']').addClass('active');
    }
}

// update current and next slide vaiables after a rotation
function updateSlideVars(slideId) {
     currentSlideId = slideId;

     if (slideId != numSlides) {
         nextSlideId = slideId + 1;
     } else {
         nextSlideId = 1;
     }
}

// build the slide position bullets and add it to the slide show
function buildSlidePositionHtml(numSlides) {
    var html = "<div class='slide-position'><div class='bullets'>";
    var active = " active";

    for (i = 1; i <= numSlides; i++) {
        html = html + "<div class='bullet" + active + "' data-slide-id='" + i + "'></div>";
        active = "";
    }

    html = html + "</div></div>";

    $('.slider-wrapper').append(html);

    $bullets = $('.slider-wrapper .slide-position .bullets')
}

// add the navigation arrows to the slide show
function buildSlideNavHtml() {
    var previous = "<div class='previous'><</div>";
    var next = "<div class='next'>></div>";
    var slidesHtml = $slides.html();

    $slides.html(previous + slidesHtml + next);
}