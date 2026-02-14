/**
 * ANS Builders - Homepage Services Swiper Slider
 * Auto-scroll, draggable, pause on hover
 */
document.addEventListener('DOMContentLoaded', function() {
    const swiperEl = document.getElementById('servicesSwiper');
    if (!swiperEl) return;

    new Swiper('#servicesSwiper', {
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        speed: 500,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        grabCursor: true,
        allowTouchMove: true,
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 16
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 18
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20
            },
            1280: {
                slidesPerView: 5,
                spaceBetween: 24
            },
            1536: {
                slidesPerView: 6,
                spaceBetween: 24
            }
        },
        on: {
            mouseEnter: function() {
                this.autoplay.stop();
            },
            mouseLeave: function() {
                this.autoplay.start();
            }
        }
    });
});
