export default function loadAccordion() {
  const allAccordionsItems = document.querySelectorAll(".accordion__item");

  allAccordionsItems.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("accordion__item--opened");
      console.log("tes")
    })
  })
}