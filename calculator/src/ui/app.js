import { CalculatorTwin } from "../twin/calculatorTwin.js";

const twin = new CalculatorTwin();

const displayEl = document.getElementById("display");
const statusEl = document.getElementById("status");
const keyButtons = document.querySelectorAll("[data-key]");

function render(snapshot) {
  displayEl.textContent = snapshot.display;

  if (snapshot.error) {
    statusEl.textContent = snapshot.error;
    statusEl.classList.add("error");
    return;
  }

  const status = snapshot.operator
    ? `Operator: ${snapshot.operator}`
    : "Ready";

  statusEl.textContent = status;
  statusEl.classList.remove("error");
}

for (const button of keyButtons) {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");
    const snapshot = twin.input(key);
    render(snapshot);
  });
}

window.addEventListener("keydown", (event) => {
  const key = event.key;
  const allowed = /[0-9]|\.|\+|\-|\*|\/|=|Enter|Backspace|Escape/.test(key);
  if (!allowed) {
    return;
  }

  event.preventDefault();
  const mappedKey =
    key === "Enter"
      ? "="
      : key === "Backspace"
        ? "DEL"
        : key === "Escape"
          ? "C"
          : key;

  render(twin.input(mappedKey));
});

render(twin.getSnapshot());