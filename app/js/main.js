const cssGap = 32;
const cssGapMd = 24;
const cssGapSm = 16;

const cssBreakpointsGapMd = 1400;
const cssBreakpointsGapSm = 768;


let setSwiperTabIndex = function (event) {
    if (event) {
        var currentSwiper = $(event.currentTarget).parents('.promo');
    } else {
        var currentSwiper = $('.promo');
    }
    let slides = currentSwiper.find('.promo__carousel-item');

    slides.each(function () {
        let value = $(this).hasClass('swiper-slide-visible') ? 0 : -1;
        $(this).find('.card__btn-nav:not(.swiper-button-disabled)').attr('tabindex', value);
        $(this).find('a').attr('tabindex', value);
        $(this).find('select').attr('tabindex', value);
    })
};



const promoProductSwiper = new Swiper('.promo-product', {
    slidesPerView: 1.4,
    watchSlidesVisibility: true,
    spaceBetween: cssGapSm,
    navigation: {
        nextEl: '.promo__btn-nav-next',
        prevEl: '.promo__btn-nav-prev',
    },
    breakpoints: {
        376: {
            slidesPerView: 2.2,
            spaceBetween: cssGapSm,
            allowTouchMove: true,
        },
        [cssBreakpointsGapSm + 1]: {
            slidesPerView: 3,
            spaceBetween: cssGapMd,
            allowTouchMove: false,
        },
        1201: {
            slidesPerView: 4,
            spaceBetween: cssGapMd,
            allowTouchMove: false,
        },
        [cssBreakpointsGapMd + 1]: {
            slidesPerView: 4,
            spaceBetween: cssGap,
            allowTouchMove: false,
        },

    },

    on: {
        slideChange: function () {
            setSwiperTabIndex(event);
        },
    },
});


const promoBlogSwiper = new Swiper('.promo-blog', {
    slidesPerView: 1.3,
    watchSlidesVisibility: true,
    spaceBetween: cssGapSm,
    navigation: {
        nextEl: '.promo__btn-nav-next',
        prevEl: '.promo__btn-nav-prev',
    },
    breakpoints: {
        [cssBreakpointsGapSm + 1]: {
            slidesPerView: 2,
            spaceBetween: cssGapMd,
            allowTouchMove: false,
        },
        1201: {
            slidesPerView: 3,
            spaceBetween: cssGapMd,
            allowTouchMove: false,
        },
        [cssBreakpointsGapMd + 1]: {
            slidesPerView: 3,
            spaceBetween: cssGap,
            allowTouchMove: false,
        },
    },
    on: {
        slideChange: function () {
            setSwiperTabIndex(event);
        },
    },
});

const cardSwiper = new Swiper('.card__swiper', {
    watchOverflow: true,
    slidesPerView: 1,
    effect: 'fade',
    allowTouchMove: false,
    preloadImages: false,
    lazy: true,
    navigation: {
        nextEl: '.card__btn-nav-next',
        prevEl: '.card__btn-nav-prev',
    },

});


const galleryThumbs = new Swiper('.gallery__thumbs', {
    spaceBetween: cssGapSm,
    slidesPerView: 4,
    // freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
        [cssBreakpointsGapSm + 1]: {
            spaceBetween: cssGapMd,
        },
        [cssBreakpointsGapMd + 1]: {
            spaceBetween: cssGap,
        },
    },
});

const galleryTop = new Swiper('.gallery__top', {
    watchOverflow: true,
    navigation: {
        nextEl: '.gallery__btn-nav-next',
        prevEl: '.gallery__btn-nav-prev',
    },
    thumbs: {
        swiper: galleryThumbs
    },
});


setSwiperTabIndex();


const da = new DynamicAdapt("max");
da.init();


$(function () {

    $('.modification__select-control, .filter__checkbox').styler();

    $('.card__favorite').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('card__favorite--active');
    });



    function toggleMobileMenu(boolean) {
        $('.header__top').toggleClass('header__top--menu-active', boolean);
        $('body').toggleClass('menu-outside-overflow', boolean);
        boolean ? $('body').append('<div class="menu-outside-close"></div>') : $('.menu-outside-close').remove();
    }

    $('.header__menu-btn-link').on('click', () => toggleMobileMenu(true));
    $('.header__menu-close-btn-link').on('click', () => toggleMobileMenu(false));
    $('body').on('click', '.menu-outside-close', () => toggleMobileMenu(false));


    function mediaQuery(query, callback) {
        const mql = window.matchMedia(query);

        mql.addEventListener("change", (event) => {
            callback(event.matches);
        });

        callback(mql.matches);
    }

    mediaQuery("(max-width: 650px)", dropdownFooterItem);
    mediaQuery("(max-width: 992px)", dropdownCatalogFilters);


    function dropdownFooterItem(isMedia) {
        let itemDropdown = $('.footer__item-dropdown .footer__title');

        itemDropdown.siblings('.footer__dropdown').toggle(!isMedia);

        if (isMedia) {
            itemDropdown.on('click', function () {
                $(this).siblings('.footer__dropdown').slideToggle();
                $(this).toggleClass('footer__dropdown--active');
            });
        } else {
            itemDropdown.off('click').removeClass('footer__dropdown--active');
        }
    }

    function dropdownCatalogFilters(isMedia) {
        let btnSort = $('.catalog__mob-btn-sort'),
            btnFilter = $('.catalog__mob-btn-filter'),
            sort = $('.catalog__sort'),
            filter = $('.filter');

        sort.toggle(!isMedia);
        filter.toggle(!isMedia);

        if (isMedia) {
            btnSort.on('click', function () {
                btnFilter.removeClass('catalog__mob-btn--active');
                filter.slideUp();
                $(this).toggleClass('catalog__mob-btn--active');
                sort.slideToggle();
            });
            btnFilter.on('click', function () {
                btnSort.removeClass('catalog__mob-btn--active');
                sort.slideUp();
                $(this).toggleClass('catalog__mob-btn--active');
                filter.slideToggle();
            });
        } else {
            btnSort.off('click').removeClass('catalog__mob-btn--active');
            btnFilter.off('click').removeClass('catalog__mob-btn--active');
        }
    }



    //// range-slider
    let $ranges = $(".filter__range");

    $ranges.each(function () {
        var $range = $(this).find(".js-range-slider"),
            $inputFrom = $(this).find(".js-input-from"),
            $inputTo = $(this).find(".js-input-to"),
            instance,
            min = $range.data('min'),
            max = $range.data('max'),
            from = $range.data('from'),
            to = $range.data('to');

        $range.ionRangeSlider({
            skin: "round",
            hide_min_max: true,
            hide_from_to: true,
            type: "double",
            min: min,
            max: max,
            from: from,
            to: to,
            onStart: updateInputs,
            onChange: updateInputs,
            onFinish: updateInputs,
            onFinish: function (data) {
                $('body').removeClass('cursor-grabbing')
            },

        });
        instance = $range.data("ionRangeSlider");

        function updateInputs(data) {
            from = data.from;
            to = data.to;

            $inputFrom.prop("value", from);
            $inputTo.prop("value", to);
        }

        $inputFrom.on("change", function () {
            var val = $(this).prop("value");

            // validate
            if (val < min) {
                val = min;
            } else if (val > to) {
                val = to;
            }

            instance.update({
                from: val
            });

            $(this).prop("value", val);

        });

        $inputTo.on("change", function () {
            var val = $(this).prop("value");

            // validate
            if (val < from) {
                val = from;
            } else if (val > max) {
                val = max;
            }

            instance.update({
                to: val
            });

            $(this).prop("value", val);
        });
    });


    $('.irs-handle').on('mousedown', function () {
        $('body').addClass('cursor-grabbing');
    });
    //// end range-slider
});
