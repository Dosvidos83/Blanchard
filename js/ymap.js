ymaps.ready(init);
function init() {
  let myMap = new ymaps.Map("myMap", {
    center: [55.758468, 37.601088],
    zoom: 13.5,
    controls: [],
    scroll: false,
  });

  const myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../images/map-mark.svg',
    iconImageSize: [20, 20],
  });

  const zoomControl = new ymaps.control.ZoomControl({
    options: {
      size: "small",
      position: {
        bottom: '350px',
        right: '20px'
      }
    }
  });

  const geolocationControl = new ymaps.control.GeolocationControl({
    options: {
      size: "small",
      position: {
        bottom: '305px',
        right: '20px'
      }
    }
  });

  myMap.behaviors.disable('scrollZoom');
  myMap.controls.add(zoomControl);
  myMap.controls.add(geolocationControl);
  myMap.geoObjects.add(myPlacemark);

  // отключаем элемменты управления при ширине экрана <= 1024 (если не планшет)
  const windowWidth = document.documentElement.clientWidth;
  if (windowWidth <= 1024) {
    // для планшетов отключаем drag элементы управления оставляем
    if (device.tablet()) {
      myMap.behaviors.disable('drag');
    }
    else {
      myMap.controls.remove(zoomControl);
      myMap.controls.remove(geolocationControl);
    }
  }
}
