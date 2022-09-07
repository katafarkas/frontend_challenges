function selectionChange(element) {
  resetSelected();
  element.classList.add("selected");
  document.getElementById("rate-selected").innerText = element.innerText;
}

function resetSelected() {
  let buttons = document.getElementsByClassName("inner-button");

  for (let i = 0; i <= buttons.length - 1; i++) {
    buttons[i].classList.remove("selected");
  }
}
function changeSide() {
  document.getElementById("thank-you-side").style.display = "block";
  document.getElementById("rate-side").style.display = "none";
}
