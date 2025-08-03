document.addEventListener("DOMContentLoaded", function () {
  // Координаты всех адресов
  const addresses = [
    { name: "ул. Алмазная, 5 (м-н Первомайский)", coords: [52.260190, 104.234981] },
  ];

  const mapContainer = document.querySelector(".our-contacts__map-wrap");
  mapContainer.innerHTML = '<div id="yandex-map"></div>';

  ymaps.ready(init);

  function init() {
    const map = new ymaps.Map("yandex-map", {
      center: [52.276655, 104.285330],
      zoom: 25,
      controls: ["zoomControl"],
    });

    // Добавляем метки для каждого адреса
    addresses.forEach((addr) => {
      const placemark = new ymaps.Placemark(
        addr.coords,
        {
          balloonContent: addr.name,
        },
        {
          preset: "islands#redDotIcon",
        }
      );

      map.geoObjects.add(placemark);
    });

    // Убедимся, что все метки видны на карте
    map.setBounds(map.geoObjects.getBounds(), {
      checkZoomRange: true,
    });
  }
});
