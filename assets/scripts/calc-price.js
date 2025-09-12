// СТАРЫЙ КОД
// document.addEventListener("DOMContentLoaded", function () {
//   const pricePerM2 = 1550; // цена за м² (МОЖЕШЬ МЕНЯТЬ КАК ХОЧЕШЬ НИЧЕГО НЕ СЛОМАЕТСЯ)

//   const heightInputs = document.querySelectorAll("input[name='heightRoll']");
//   const lengthInput = document.querySelector(".my-range-input-value");
//   const countInput = document.querySelector("input[name='countRolls']");
//   const priceElem = document.querySelector(".price-calc__price span");

//   function calcPrice() {
//     const height = parseFloat(
//       document.querySelector("input[name='heightRoll']:checked")?.value || 0
//     );
//     const length = parseFloat(lengthInput.value || 0);
//     const count = parseInt(countInput.value || 0);

//     if (!height || !length || !count) {
//       priceElem.textContent = "0";
//       return;
//     }

//     const total = height * length * pricePerM2 * count;
//     priceElem.textContent = total.toLocaleString("ru-RU");
//   }

//   heightInputs.forEach((radio) => radio.addEventListener("change", calcPrice));
//   lengthInput.addEventListener("input", calcPrice);
//   countInput.addEventListener("input", calcPrice);

//   calcPrice();
// });

document.addEventListener("DOMContentLoaded", function () {
    const grassTypes = document.querySelectorAll(".price-calc__type-grass");
    const widthRollInputs = document.querySelectorAll('input[name="widthRoll"]');
    const countRollsInput = document.querySelector('input[name="countRolls"]');

    const priceElement = document.querySelector(".price-calc__price span");

    const orderLink = document.querySelector(".price-calc__button");


    // ПОЛУЧЕНИЕ ТИПА ГАЗОНА
    function getActiveGrass() {
        const active = document.querySelector(".price-calc__type-grass.active span");
        return active ? active.textContent.trim() : "";
    }

    
    // ПОЛУЧЕНИЕ ШИРИНЫ
    function getSelectedWidth() {
        const checked = document.querySelector('input[name="widthRoll"]:checked');
        return {
            width: checked ? checked.value : "",
            price: checked ? parseFloat(checked.dataset.price) : 0
        };
    }


    // КАЛЬКУЛЯТОР
    function calculatePrice() {
        const { price } = getSelectedWidth();
        const count = parseInt(countRollsInput.value) || 0;
        const total = price * count;
        priceElement.textContent = total;
        return total;
    }


    // СЫЛКА С СООБЩЕНИЕМ НА WA
    function updateOrderLink() {
        const grass = getActiveGrass();
        const { width } = getSelectedWidth();
        const count = countRollsInput.value;
        const message = `Здравствуйте! Хочу заказать рулон ${grass} - ${count} шт. Ширина - ${width} м. Ячейка - 40мм. Интересует расчет стоимости.`; // ЗАМЕНИТЕ НА ВАШЕ СООБЩЕНИЕ

        const phone = "79643426890"; // ЗАМЕНИТЕ НА ВАШ АКТУАЛЬНЫЙ НОМЕР
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        orderLink.setAttribute("href", url);
    }


    // НАВЕШАННЫЕ СОБЫТИЯ
    widthRollInputs.forEach(input => input.addEventListener("change", () => {
        calculatePrice();
        updateOrderLink();
    }));

    countRollsInput.addEventListener("input", () => {
        calculatePrice();
        updateOrderLink();
    });

    grassTypes.forEach(type => {
        type.addEventListener("click", function () {
            grassTypes.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            updateOrderLink();
        });
    });

    calculatePrice();
    updateOrderLink();
});
