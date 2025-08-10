document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const overlay = document.querySelector(".my-overlay");

  const burgerButtons = header.querySelectorAll("[data-open-menu]");
  const closeDesctopMenu = header.querySelector(".button-close-desctop-menu");

  burgerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const menuType = this.getAttribute("data-open-menu");
      const targetMenu = document.querySelector(`[data-id-menu="${menuType}"]`);

      const isMenuOpen = targetMenu.classList.contains("opened");
      const isMobileMenuGreen = targetMenu.classList.contains("green-bg");

      closeAllMenus();

      if (!isMenuOpen) {
        document.body.style.overflow = "hidden";
        header.classList.add("menu-open");
        targetMenu.classList.add("opened");
        overlay.classList.add("active");

        if (menuType == "mobile") {
          overlay.style.backgroundColor = isMobileMenuGreen
            ? "var(--color-darkGreen)"
            : "var(--color-white)";
        }

        if (!this.hasAttribute("no-change")) {
          this.classList.add("active");
        }
      }
    });
  });

  closeDesctopMenu.addEventListener("click", () => {
    closeAllMenus();
  });

  function closeAllMenus() {
    document.body.style.overflow = "";
    overlay.classList.remove("active");
    document.querySelectorAll("[data-id-menu]").forEach((menu) => {
      menu.classList.remove("opened");
    });
    burgerButtons.forEach((button) => {
      button.classList.remove("active");
    });
    if (!document.querySelector("[data-id-menu].opened")) {
      header.classList.remove("menu-open");
    }
  }

  document.addEventListener("click", function (e) {
    if (
      !e.target.closest("[data-open-menu]") &&
      !e.target.closest("[data-id-menu]")
    ) {
      closeAllMenus();
    }
  });
});

// ВЫБОР ГОРОДА
document.addEventListener("DOMContentLoaded", function () {
  const citySelects = document.querySelectorAll(".city-select");

  citySelects.forEach((citySelect) => {
    const currentBtn = citySelect.querySelector(".city-select__current");
    const body = citySelect.querySelector(".city-select__body");
    const searchInput = body?.querySelector("input");
    const cityItems = body?.querySelectorAll(".city-select__item");

    currentBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      document.querySelectorAll(".city-select__body").forEach((el) => {
        if (el !== body) {
          el.classList.remove("active");
          el.previousElementSibling.classList.remove("open");
        }
      });

      body.classList.toggle("active");
      currentBtn.classList.toggle("open");

      if (body.classList.contains("active") && searchInput) {
        searchInput.focus();
      }
    });

    // ВЫБОР ГОРОДА (можете убрать, если реализуете самостоятельно)
    if (cityItems) {
      cityItems.forEach((item) => {
        item.addEventListener("click", function () {
          currentBtn.textContent = this.textContent;
          body.classList.remove("active");
          currentBtn.classList.remove("open");
        });
      });
    }

    // ПОИСК (можете убрать, если реализуете самостоятельно)
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const searchText = this.value.toLowerCase();

        cityItems.forEach((item) => {
          const cityName = item.textContent.toLowerCase();
          if (cityName.includes(searchText)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    }
  });

  document.addEventListener("click", function () {
    document.querySelectorAll(".city-select__body").forEach((body) => {
      body.classList.remove("active");
      body.previousElementSibling.classList.remove("open");
    });
  });

  document.querySelectorAll(".city-select__body").forEach((body) => {
    body.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
});
