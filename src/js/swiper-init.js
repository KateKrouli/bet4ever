// Инициализация Swiper для players-list
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

document.addEventListener('DOMContentLoaded', function() {
  const el = document.querySelector('.players-slider');
  if (!el) return;
  new Swiper(el, {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    centeredSlides: true,
    speed: 500,
    // Можно добавить другие параметры по желанию
  });
});
