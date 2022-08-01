let slideIndex = 1;
showSlides(slideIndex);

// controls
function plusSlides(quantity) {
  showSlides((slideIndex += quantity));
}

//  image controls
function currentSlide(quantity) {
  showSlides((slideIndex = quantity));
}

function showSlides(quantity) {
  let i;
  let slides = document.querySelectorAll(".slides-wine");
  let dots = document.querySelectorAll(".dot");
  if (quantity > slides.length) {
    slideIndex = 1;
  }
  if (quantity < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active-dot";
}
setInterval(function () {
  plusSlides(1);
}, 5000);

let arrowPrev = document.querySelector(".prev");
arrowPrev.addEventListener("click", () => {
  plusSlides(-1);
});

let arrowNext = document.querySelector(".next");
arrowNext.addEventListener("click", () => {
  plusSlides(1);
});
