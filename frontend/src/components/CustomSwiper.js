// import Swiper core and required modules
import { Keyboard, Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import '../assets/global.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const pagination = {
  clickable: true,
  renderBullet: function (index, className) {
    return `<span class=${className}>  ${[index + 1]} </span>`;
  },
};

const CustomSwiper = ({ children }) => {
  const params = {
    breakpoints: {
      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
      },
      1400: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
      },
    },
    watchOverflow: true,
  };

  return (
    <div className='swiper-container'>
      <Swiper
        {...params}
        // install Swiper modules
        modules={[Keyboard, Navigation, Pagination, Scrollbar, A11y]}
        keyboard={{
          enabled: true,
        }}
        slidesPerView={1}
        navigation={true}
        pagination={pagination}
        style={{
          '--swiper-navigation-color': 'var(--primary-text)',
          '--swiper-navigation-size': '24px',
          caretColor: 'transparent',
          cursor: '',
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
