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
      closeAllMenus();

      if (!isMenuOpen) {
        document.body.style.overflow = "hidden";
        header.classList.add("menu-open");
        targetMenu.classList.add("opened");
        overlay.classList.add("active");
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
