document.addEventListener("DOMContentLoaded", function () {
  // Координаты адресов
  const addresses = [
    { name: "ул. Самойловой, 5П", coords: [59.90177, 30.37451] },
  ];

  const mapContainer = document.querySelector(".our-contacts__map-wrap");
  mapContainer.innerHTML = '<div id="yandex-map"></div>';

  ymaps.ready(init);

  function init() {
    const map = new ymaps.Map("yandex-map", {
      center: addresses[0].coords,
      zoom: 16,
      controls: ["zoomControl"],
    });

    // Добавляем метки
    addresses.forEach((addr) => {
      const placemark = new ymaps.Placemark(
        addr.coords,
        { balloonContent: addr.name },
        {
          preset: "islands#redPocketIcon",
          iconColor: "red",
        }
      );
      map.geoObjects.add(placemark);
    });

    if (addresses.length > 1) {
      map.setBounds(map.geoObjects.getBounds(), {
        checkZoomRange: true,
      });
    }
  }
});
