document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".input-wrapper input").forEach((input) => {
    const placeholder = input.parentElement.querySelector(".label-text");

    const mask = input.type === "tel" ? "+7 (" : "";

    function togglePlaceholder() {
      if (placeholder) {
        placeholder.style.opacity = input.value ? "0" : "1";
      }

      if (input.value.trim() !== "" && input.value !== mask) {
        input.style.backgroundColor = "rgba(237, 247, 217, 0.4)";
      } else {
        input.style.backgroundColor = "";
      }
    }

    input.addEventListener("input", togglePlaceholder);
    input.addEventListener("focus", togglePlaceholder);
    input.addEventListener("blur", togglePlaceholder);

    togglePlaceholder();
  });

  document.querySelectorAll(".my-textarea").forEach((textarea) => {
    function toggleBackground() {
      if (textarea.value.trim() !== "") {
        textarea.style.backgroundColor = "rgba(237, 247, 217, 0.4)";
      } else {
        textarea.style.backgroundColor = "";
      }
    }

    textarea.addEventListener("input", toggleBackground);
    textarea.addEventListener("focus", toggleBackground);
    textarea.addEventListener("blur", toggleBackground);

    toggleBackground();
  });

  // Маска для телефонов
  const phoneInputs = document.querySelectorAll('.my-input[type="tel"]');

  phoneInputs.forEach((phoneInput) => {
    const initialMask = "+7 (";

    phoneInput.addEventListener("focus", () => {
      if (phoneInput.value === initialMask) {
        phoneInput.value = "";
      }
      if (phoneInput.value === "") {
        phoneInput.value = initialMask;
      }
    });

    phoneInput.addEventListener("blur", () => {
      if (phoneInput.value.trim() === "" || phoneInput.value === initialMask) {
        phoneInput.value = "";
      }
    });

    phoneInput.addEventListener("input", (event) => {
      let value = event.target.value.replace(/\D/g, "");
      let formattedValue = "";

      if (value.length > 0) {
        formattedValue = "+7 (" + value.substring(1, 4);
      }
      if (value.length > 4) {
        formattedValue += ") " + value.substring(4, 7);
      }
      if (value.length > 7) {
        formattedValue += "-" + value.substring(7, 9);
      }
      if (value.length > 9) {
        formattedValue += "-" + value.substring(9, 11);
      }

      event.target.value = formattedValue;
    });
  });
});
