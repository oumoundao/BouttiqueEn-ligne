document.querySelector("input[list]").addEventListener("input", function (e) {
  let input = e.target;
  const list = input.getAttribute("list");
  let options = document.querySelectorAll("#" + list + " option");
  let hiddenInput = document.getElementById("items-hidden");
  let inputValue = input.value;

  hiddenInput.value = inputValue;

  for (let i = 0; i < options.length; i++) {
    let option = options[i];

    if (option.innerText === inputValue) {
      hiddenInput.value = option.getAttribute("data-value");
      break;
    }
  }
});
