// бургер
const burgerMenu = document.querySelector('.header__nav');
const burgerBtn = document.querySelector('.header__burger-btn');
const closeBtn = burgerMenu.querySelector('.header__close-btn');
const headerLink = burgerMenu.querySelectorAll('.header__nav-link');
const signInLink = burgerMenu.querySelector('.header__sign-in-link');

burgerBtn.addEventListener('click', () => {
  burgerMenu.classList.toggle('header__nav_shown');
  document.body.classList.add('body_no-scroll');
  closeBtn.focus();
  trapFocus(burgerMenu);
});

function trapFocus(element) {
  // выбираем все интерактивные элементы бургер меню
  const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]');
  // определяем первый и последний элемент
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

  element.addEventListener('keydown', (e) => {
    const isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}

closeBtn.addEventListener('click', () => {
  burgerMenu.classList.remove('header__nav_shown');
  document.body.classList.remove('body_no-scroll');
  burgerBtn.focus();
})

// закрытие бургера после клика по кнопке навигации
burgerMenu.childNodes.forEach(headerLink => {
  headerLink.addEventListener('click', () => {
    burgerMenu.classList.remove('header__nav_shown');
    document.body.classList.remove('body_no-scroll');
  });
});

// открытие дропдауна
const dropdownBtn = document.querySelectorAll('.hero__dropdown-btn');
dropdownBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const selectList = btn.parentElement;
    const openedSelect = document.querySelector('.dropdown-show');
    selectList.classList.toggle('dropdown-show');
    if (openedSelect) {
      openedSelect.classList.remove('dropdown-show');
    }
  });
});

// закрытие дропдауна если клик вне
document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.closest('.hero__nav-item')) {
    return;
  }
  const openedSelect = document.querySelector('.dropdown-show');
  if (openedSelect) {
    openedSelect.classList.remove('dropdown-show');
  }
});

// закрытие дропдауна после клика на ссылку
document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('hero__dropdown-link')) {
    target.closest('.dropdown-show').classList.remove('dropdown-show');
  }
});

// поиск
const searchForm = document.querySelector('.hero__top-container');
const showSearchBtn = document.querySelector('.header__show-search-btn');
showSearchBtn.addEventListener('click', () => {
  console.log('123')
  searchForm.style.display = 'flex';
  setTimeout(() => {
    searchForm.classList.add('search-form_show');
  }, 150);
  showSearchBtn.classList.add('show-search-btn_hidden');

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-form__close-btn')
      && e.target.closest('.hero__top-container')
      || e.target.closest('.header__show-search-btn')) {
      return;
    }
    searchForm.classList.remove('search-form_show');
    setTimeout(() => {
      searchForm.style.display = 'none';
    }, 150);
    showSearchBtn.classList.remove('show-search-btn_hidden');
  });
});

const selector = document.querySelector(".contacts__form-phone-input");
const im = new Inputmask("+7(999) 999-99-99");
im.mask(selector);

// валидация форм
const feedbackForm = document.querySelector('.contacts__form');

validate(feedbackForm);

function inputValidation(input) {
  const nameRegExp = /[^А-яёЁ\s-]/;

  let result;
  const inputName = input.getAttribute('name');
  if (inputName === 'name') {
    result = !nameRegExp.test(input.value);
  }

  else if (inputName === 'phone') {
    const phone = selector.inputmask.unmaskedvalue();
    result = phone.length === 10;
  }

  return result;
}

function createFeedback(input, feedbackText, color) {
  // получаем параметры инпута
  const inputPaddingLeft = window.getComputedStyle(input, null).paddingLeft;
  const inputFont = window.getComputedStyle(input, null).fontFamily;
  const margin = window.getComputedStyle(input, null).margin;
  const width = window.getComputedStyle(input, null).width;
  const height = window.getComputedStyle(input, null).height;
  // создаем feedback
  const feedback = document.createElement('span');
  feedback.classList.add('input-feedback');
  feedback.style.position = 'absolute';
  feedback.style.top = `-16px`;
  feedback.style.fontSize = '12px';
  feedback.style.left = inputPaddingLeft;
  feedback.style.fontFamily = inputFont;
  feedback.style.color = color;
  feedback.innerHTML = feedbackText;
  input.style.border = `1px solid ${color}`;

  let inputWrapper;
  // проверяем наличие wrapper у поля ввода,
  // если первая валидация
  if (!input.parentNode.classList.contains('input-wrapper')) {
    inputWrapper = document.createElement('div');
    inputWrapper.classList.add('input-wrapper');
    inputWrapper.style.display = 'inline-block';
    inputWrapper.style.position = 'relative';
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.margin = '0';
    inputWrapper.style.margin = margin;
    inputWrapper.style.width = width;
    inputWrapper.style.height = height;
    feedback.style.position = 'absolute';
    input.parentNode.insertBefore(inputWrapper, input);
    inputWrapper.appendChild(input);
  }
  // если повторная валидация
  else {
    inputWrapper = input.parentElement;
  }
  inputWrapper.appendChild(feedback);
}

let borderColor;
function validate(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  const formBtn = form.querySelector('button');
  formBtn.addEventListener('click', () => {
    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
      // получаем изначальное значение цвета бордера
      if (!borderColor) {
        borderColor = window.getComputedStyle(input, null).borderColor;
      }
      // убираем предыдущую валидацию
      removeValidationStylesAndFeedback(input, borderColor);
      // проводим валидацию и при отрицательном результате создаем feedback и меняем цвет бордера
      if (!inputValidation(input) || input.value.trim() === '') {
        createFeedback(input, 'Недопустимый формат', '#D11616');
        isValid = false;
      }
    });
    if (!isValid) {
      return;
    }
    form.submit();
  });
}

function removeValidationStylesAndFeedback(input, primaryBorderColor) {
  input.style.borderColor = primaryBorderColor;
  if (input.nextElementSibling && input.nextElementSibling.classList.contains('input-feedback')) {
    input.nextElementSibling.remove();
  }

  return input;
}

// селект
const select = document.querySelector('.gallery__select');
makeFunctionalityForSelect(select);

function makeUnselectable(select) {
  const options = select.querySelectorAll('li');
  options.forEach(option => {
    option.setAttribute('tabIndex', '-1');
    triggerСlick(option);
  })
}

function makeFunctionalityForSelect(select) {
  const selectBtn = select.querySelector('button');
  const selectList = select.querySelector('ul');
  // выбранным по дефолту значением принимается первая опция
  if (!selectBtn.textcontent) {
    selectBtn.innerHTML = selectList.children[0].textContent;
    selectList.children[0].style.display = 'none';
    selectList.children[0].classList.add('selected');
    selectBtn.setAttribute('aria-label', `фильтр вида искусства выбрано ${selectList.children[0].textContent}`);
    makeUnselectable(select);
  }
  // при открытии селекта делаем опции доступными для выбора через клавиатуру
  selectBtn.addEventListener('click', () => {
    const options = select.querySelectorAll('li');
    options.forEach(option => {
      if (option.classList.contains('selected')) {
        option.setAttribute('tabIndex', '-1');
        return;
      }
      option.setAttribute('tabIndex', '0');
    })
    //открываем / закрываем селектлист
    select.classList.toggle('select-active');
  })
  // закрытие селекта при выборе опции
  const options = select.querySelectorAll('li');
  options.forEach(option => {
    option.addEventListener('click', () => {
      // находим ранее выбранную опцию и делаем ее доступной в списке
      const selectedItem = selectList.querySelector('.selected');
      selectedItem.classList.remove('selected');
      selectedItem.style.display = 'block';
      selectedItem.setAttribute('tabIndex', '0');
      // передаем значение выбранной опции в кнопку и убираем ее из списка
      selectBtn.textContent = option.textContent;
      option.style.display = 'none';
      select.classList.remove('select-active');
      option.classList.add('selected');
      // при закрытии селекта делаем опции недоступными для выбора через клавиатуру
      makeUnselectable(select);
      // и фокусируем кнопку селекта
      selectBtn.focus();
      selectBtn.setAttribute('aria-label', `фильтр вид искусства выбрано ${option.textContent}`);
    })
  })
  // закрытие селекта при клике вне
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target !== selectBtn) {
      select.classList.remove('select-active');
    }
  })

  return select;
}

// tabs
const tabsWrapper = document.querySelector('#tabs');
const tabLinks = tabsWrapper.querySelectorAll('.catalog__tab-link');
const tabs = tabsWrapper.querySelectorAll('.catalog__tab');
let activeTab;
let activeTabLink = tabsWrapper.querySelector('.active-tab-link');
const activeTabId = activeTabLink.href.split('#')[1];

tabs.forEach(tab => {
  if (tab.id === activeTabId) {
    activeTab = tab;
    return;
  }
  tab.style.display = 'none';
})

tabLinks.forEach(tabLink => {
  tabLink.addEventListener('click', (e) => {
    e.preventDefault();
    const id = tabLink.href.split('#')[1];
    activeTabLink.classList.remove('active-tab-link');
    activeTabLink = tabLink;
    tabLink.classList.add('active-tab-link');
    tabs.forEach(tab => {
      if (tab.id === id) {
        if (activeTab) {
          activeTab.style.display = 'none';
        }
        tab.style.display = 'block';
        activeTab = tab;
        const windowWidth = document.documentElement.clientWidth;
        if (windowWidth <= 768) {
          tab.scrollIntoView();
        }
      }
    })
  })
})

// сдвиг бабла тултипа от боковых границ параграфа
const tooltips = document.querySelectorAll('.tooltip');
tooltips.forEach(tooltip => {
  tooltip.addEventListener('click', () => {
    // убираем предыдущие сдвиги
    const buble = tooltip.querySelector('.tooltip__buble');
    const triangle = tooltip.querySelector('.tooltip__triangle');
    buble.style.transform = `translateX(0)`;
    triangle.style.transform = `translateX(0)`;
    // в качестве границ инициализации сдвига бабла принимаем границы параграфа
    const paragraph = buble.closest('p');
    // находим расстояние от боковых границ параграфа до краев окна браузера
    const windowWidth = document.documentElement.clientWidth;
    const paragraphIndentLeft = paragraph.getBoundingClientRect().left;
    const paragraphIndentRight = windowWidth - paragraph.getBoundingClientRect().right;
    // находим расстояние от боковых границ бабла до краев окна браузера
    const bubleIndentLeft = buble.getBoundingClientRect().left;
    const bubleIndentRight = windowWidth - buble.getBoundingClientRect().right;
    // находим расстояние от боковых границ бабла до краев параграфа
    const left = bubleIndentLeft - paragraphIndentLeft;
    const right = bubleIndentRight - paragraphIndentRight;
    // при отрицательном значении (слева) сдвигаем бабл
    if (left < 0) {
      buble.style.transform = `translateX(${Math.abs(left)}px)`;
      // и сдвигаем флажок бабла под тултип
      triangle.style.transform = `translateX(${left}px)`;
    }
    //аналогично справа (только отступ уже с отрицательным значением)
    if (right < 0) {
      buble.style.transform = `translateX(${right}px)`;
      triangle.style.transform = `translateX(${Math.abs(right)}px)`;
    }
  })
});

// скрытие хэдера
const header = document.querySelector('.header');
headerShowHideWhenScrolling(header);

function headerShowHideWhenScrolling(header) {
  if (document.documentElement.clientWidth <= 768) {
    let lastScroll = 0;
    let headerHeight = window.getComputedStyle(header, null).height;
    // при ресайзе заново получаем высоту header
    window.addEventListener('resize', () => {
      headerHeight = window.getComputedStyle(header, null).height;
    })
    const defaultOffset = headerHeight.replace('px', '');
    const searchFormWrapper = document.querySelector('.hero__top-container');
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const isHidden = () => header.classList.contains('js-header-hidden');
    window.addEventListener('scroll', () => {
      // прокрутка вниз
      if (scrollPosition() > lastScroll && !isHidden() && scrollPosition() > defaultOffset) {
        // убираем и очищаем открытую форму поиска.
        if (searchFormWrapper.classList.contains('search-form_show')) {
          searchFormWrapper.classList.remove('search-form_show');
          showSearchBtn.classList.remove('show-search-btn_hidden');
          searchFormWrapper.querySelector('form').reset();
          setTimeout(() => {
            searchFormWrapper.style.display = 'none';
          }, 200)
        }
        setTimeout(() => {
          header.classList.add('js-header-hidden');
          header.style.transform = `translateY(-${headerHeight})`;
        }, 70)
      }
      // прокрутка вверхa
      else if (scrollPosition() < lastScroll && isHidden()) {
        header.classList.remove('js-header-hidden');
        header.style.transform = 'translateY(0px)';
      }
      lastScroll = scrollPosition();
    })
  }

  return header;
}

// вызываем клик по элементу при нажатии на Enter или Space (когда он в фокусе)
function triggerСlick(element) {
  element.onfocus = () => {
    element.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        element.click();
      }
    })
  }

  return element;
}

// popup
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');
const closePopupBtn = popup.querySelector('.popup__close-btn');
const popupImgWrapper = popup.querySelector('.popup__img-wrapper');
const imgWrappers = document.querySelectorAll('.gallery__img-wrapper');

imgWrappers.forEach(imgWrapper => {
  imgWrapper.addEventListener('click', (e) => {
    // узнаем на какой слайд произошло нажатие
    const slide = e.target.closest('.gallery__swiper-slide');
    const slideNum = slide.getAttribute('aria-label').split(' /')[0];
    const popupImg = createPicture(slideNum);

    if (popup.querySelector('picture')) {
      popup.querySelector('picture').remove();
    }
    popupImg.classList.add('popup__img');
    popupImgWrapper.append(popupImg);
    popup.classList.add('popup_show');
    popupContent.classList.add('popup__content_show');
    document.body.classList.add('body_no-scroll');
  });
});

popup.addEventListener('click', (e) => {
  if (!e.target.closest('.popup__content') || e.target.closest('.popup__close-btn')) {
    popup.classList.remove('popup_show');
    popupContent.classList.remove('popup__content_show');
    document.body.classList.remove('body_no-scroll');
  }
});

function createPicture(num) {
  const picture = document.createElement('picture');
  const sourceOne = createSource('660', num);
  const sourceTwo = createSource('768', num);
  const sourceThree = createSource('1190', num);
  const sourceFour = createSource('1920', num);
  const img = createDefaultImg(num);
  picture.append(sourceOne);
  picture.append(sourceTwo);
  picture.append(sourceThree);
  picture.append(sourceFour);
  picture.append(img);

  return picture;
}

function createSource(media, imgNum) {
  const source = document.createElement('source');
  source.setAttribute('media', `(max-width: ${media}px)`);
  source.setAttribute('srcset', `./images/popup/${media}-${imgNum}.webp`);

  return source;
}

function createDefaultImg(imgNum) {
  const img = document.createElement('img');
  img.setAttribute('src', `./images/popup/1920-${imgNum}.webp`);
  img.classList.add('popup__img');

  return img;
}
