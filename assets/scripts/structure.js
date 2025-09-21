document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".structure__image-wrap img");
    const descs = document.querySelectorAll(".structure__image-desc");
    let index = 0;

    function changeSlide() {
      images.forEach(img => img.classList.remove("active"));
      descs.forEach(desc => desc.classList.remove("active"));

      images[index].classList.add("active");
      descs[index].classList.add("active");

      index = (index + 1) % images.length;
    }

    changeSlide();
    setInterval(changeSlide, 2000);
  });