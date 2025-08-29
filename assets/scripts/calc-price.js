document.addEventListener("DOMContentLoaded", function () {
  const pricePerM2 = 1550; // цена за м² (МОЖЕШЬ МЕНЯТЬ КАК ХОЧЕШЬ НИЧЕГО НЕ СЛОМАЕТСЯ)

  const heightInputs = document.querySelectorAll("input[name='heightRoll']");
  const lengthInput = document.querySelector(".my-range-input-value");
  const countInput = document.querySelector("input[name='countRolls']");
  const priceElem = document.querySelector(".price-calc__price span");

  function calcPrice() {
    const height = parseFloat(
      document.querySelector("input[name='heightRoll']:checked")?.value || 0
    );
    const length = parseFloat(lengthInput.value || 0);
    const count = parseInt(countInput.value || 0);

    if (!height || !length || !count) {
      priceElem.textContent = "0";
      return;
    }

    const total = height * length * pricePerM2 * count;
    priceElem.textContent = total.toLocaleString("ru-RU");
  }

  heightInputs.forEach((radio) => radio.addEventListener("change", calcPrice));
  lengthInput.addEventListener("input", calcPrice);
  countInput.addEventListener("input", calcPrice);

  calcPrice();
});
