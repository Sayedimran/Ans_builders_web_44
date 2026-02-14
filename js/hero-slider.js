/**
 * ANS Builders - Hero Image Slider
 * Auto-play, fade, pause on hover, draggable/swipeable
 */
document.addEventListener('DOMContentLoaded', function() {
    var el = document.getElementById('heroSwiper');
    if (!el) return;

    new Swiper('#heroSwiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        grabCursor: true,
        allowTouchMove: true,
        keyboard: { enabled: true },
        on: {
            mouseEnter: function() { this.autoplay.stop(); },
            mouseLeave: function() { this.autoplay.start(); }
        }
    });
});
