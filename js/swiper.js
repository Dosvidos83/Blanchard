// gallery
const gallerySwiper = new Swiper('.gallery__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 50,

  pagination: {
    el: '.gallery__swiper-pagination',
    type: 'fraction',
  },

  navigation: {
    nextEl: '.gallery__swiper-next',
    prevEl: '.gallery__swiper-prev',
  },

  breakpoints: {

    1150: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },

    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    460: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 38,
    },

    220: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
    },

  }
});

// projects {
const projectsSwiper = new Swiper('.projects__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 50,
  navigation: {
    nextEl: '.projects__swiper-next',
    prevEl: '.projects__swiper-prev',
  },
  breakpoints: {

    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },

    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 31,
    },

    1024: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50,
    },

    1500: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  }
});

// swiper events
const EventsSwiper = new Swiper('.events__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 50,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: '.events__swiper-next',
    prevEl: '.events__swiper-prev',
  },

  breakpoints: {

    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
    },

    420: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 5,
    },

    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 35,
    },

    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27,
    },

    1500: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  }
});
