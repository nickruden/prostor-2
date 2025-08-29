document.querySelectorAll(".my-range-input").forEach((slider) => {
  const fill = slider.querySelector(".my-range-input__fill");
  const thumb = slider.querySelector(".my-range-input__thumb");
  const thumbValue = slider.querySelector(".my-range-input__thumb-value");
  const labelMin = slider.querySelector(".label-min");
  const labelMax = slider.querySelector(".label-max");
  const output = slider.querySelector(".my-range-input-value");

  const min = parseFloat(slider.getAttribute("min")) || 0;
  const max = parseFloat(slider.getAttribute("max")) || 100;
  const step = parseFloat(slider.getAttribute("step")) || 1;
  let value = parseFloat(slider.getAttribute("value"));
  if (!isFinite(value)) value = min;

  if (labelMin) labelMin.textContent = min;
  if (labelMax) labelMax.textContent = max;

  function snapToStep(val) {
    const steps = Math.round((val - min) / step);
    return Math.min(Math.max(min + steps * step, min), max);
  }

  function updateVisual(val) {
    val = snapToStep(val);
    value = val;
    slider.setAttribute("value", val);

    if (output) {
      output.value = val;
      output.dispatchEvent(new Event("input", { bubbles: true }));
    }

    const sliderWidth = slider.clientWidth;
    const thumbWidth = thumb.offsetWidth;
    const available = Math.max(sliderWidth - thumbWidth, 0);

    const percent = (val - min) / (max - min);
    const thumbLeft = Math.round(percent * available);
    const fillPx = Math.round(thumbLeft + thumbWidth / 2);

    thumb.style.left = `${thumbLeft}px`;
    fill.style.width = `${fillPx}px`;

    if (thumbValue) {
      if (val !== min && val !== max) {
        thumbValue.style.display = "block";
        thumbValue.textContent = val;
        thumbValue.style.left = `${thumbLeft + thumbWidth / 2}px`;
      } else {
        thumbValue.style.display = "none";
      }
    }
  }

  function updateFromPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    const sliderWidth = slider.clientWidth;
    const thumbWidth = thumb.offsetWidth;
    const available = Math.max(sliderWidth - thumbWidth, 0);

    let center = clientX - rect.left;
    center = Math.min(Math.max(center, 0), sliderWidth);

    let rawThumbLeft = center - thumbWidth / 2;
    rawThumbLeft = Math.min(Math.max(rawThumbLeft, 0), available);

    const percent = available === 0 ? 0 : rawThumbLeft / available;
    let newVal = min + percent * (max - min);
    newVal = snapToStep(newVal);

    updateVisual(newVal);
  }

  function startDrag(e) {
    e.preventDefault();
    const move = (ev) => {
      updateFromPosition(ev.clientX);
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  function startTouch(e) {
    e.preventDefault();
    const move = (ev) => {
      if (ev.touches.length > 0) {
        updateFromPosition(ev.touches[0].clientX);
      }
    };
    const up = () => {
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", up);
      document.removeEventListener("touchcancel", up);
    };
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", up);
    document.addEventListener("touchcancel", up);
  }

  thumb.addEventListener("mousedown", startDrag);
  thumb.addEventListener("touchstart", startTouch, { passive: false });

  slider.addEventListener("mousedown", (e) => {
    if (e.target !== thumb) updateFromPosition(e.clientX);
  });
  slider.addEventListener(
    "touchstart",
    (e) => {
      if (e.target !== thumb && e.touches.length > 0) {
        updateFromPosition(e.touches[0].clientX);
      }
    },
    { passive: false }
  );

  window.addEventListener("resize", () => updateVisual(value));

  updateVisual(value);
});
