function toggleDropdown() {
  const element = document.querySelector(".my-select__element");
  const options = document.getElementById("dropdownOptions");
  const arrow = document.querySelector(".my-select-arrow");

  element.classList.toggle("active");
  options.style.display = options.style.display === "block" ? "none" : "block";
  arrow.classList.toggle("open");
}

document.querySelectorAll(".my-select__option").forEach((option) => {
  option.addEventListener("click", function () {
    const selectedText = this.textContent;
    const selectedValue = this.getAttribute("data-value");

    document.getElementById("selectedValue").textContent = selectedText;
    document.getElementById("hiddenInput").value = selectedValue;

    document.querySelector(".my-select__element").classList.remove("active");
    document.getElementById("dropdownOptions").style.display = "none";
    document.querySelector(".my-select-arrow").classList.remove("open");
  });
});

document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".my-select");
  if (!dropdown.contains(event.target)) {
    document.querySelector(".my-select__element").classList.remove("active");
    document.getElementById("dropdownOptions").style.display = "none";
    document.querySelector(".my-select-arrow").classList.remove("open");
  }
});
