document.addEventListener("DOMContentLoaded", function () {
  function initAccordion(accordionElement) {
    const headers = accordionElement.querySelectorAll(".my-accordion-header");

    headers.forEach((header) => {
      const item = header.closest(".my-accordion__item");

      if (header.classList.contains("active")) {
        const content = header.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + "px";
        item.classList.add("open");
      } else {
        item.classList.remove("open");
      }

      header.addEventListener("click", function () {
        headers.forEach((h) => {
          if (h !== header) {
            h.classList.remove("active");
            const c = h.nextElementSibling;
            c.style.maxHeight = null;
            h.closest(".my-accordion__item").classList.remove("open");
          }
        });

        this.classList.toggle("active");
        const currentContent = this.nextElementSibling;

        if (this.classList.contains("active")) {
          currentContent.style.maxHeight = currentContent.scrollHeight + "px";
          item.classList.add("open");
        } else {
          currentContent.style.maxHeight = null;
          item.classList.remove("open");
        }
      });
    });
  }

  const accordions = document.querySelectorAll(".my-accordion");
  accordions.forEach((accordion) => {
    initAccordion(accordion);
  });
});
