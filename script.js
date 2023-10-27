"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const cookie = document.querySelector(".cookie button");

// cookie
cookie.addEventListener("click", () => {
  document.querySelector(".cookie").remove();
});

// for Modal
const ModalOpen = function () {
  modal.classList.remove("hidden");
  modal.classList.remove("hiddenMedia");
  overlay.classList.remove("hidden");
  overlay.classList.remove("hiddenMedia");
};
const ModalCloe = function () {
  overlay.classList.add("hidden");
  overlay.classList.add("hiddenMedia");
  modal.classList.add("hidden");
  modal.classList.add("hiddenMedia");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", ModalOpen));
btnCloseModal.addEventListener("click", ModalCloe);

overlay.addEventListener("click", ()=>{
  ModalCloe();
  navLinkUl.classList.add("hiddenMedia")
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    ModalCloe();
  }
});

// for tab
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", (e) => {
  let active = e.target.closest(".operations__tab");
  if (active) {
    var date = active.dataset.tab;
    tabs.forEach((element) => {
      element.classList.remove("operations__tab--active");
      active.classList.add("operations__tab--active");
    });
    tabsContent.forEach((e) => {
      e.classList.remove("operations__content--active");
    });
    tabsContent[date - 1].classList.add("operations__content--active");
  }
});

// for navbar sitiky
let header = document.querySelector("header");
let stiky = (entries, observe /*, observer*/) => {
  console.log();
  let arrayObs = entries[0];
  if (!arrayObs.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.14,
};
let fixed = new IntersectionObserver(stiky, options);
fixed.observe(header);

// for animate sections
const allSections = document.querySelectorAll(".section, footer");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// for burger
const burger = document.querySelector(".logo_svg");
const navLink = document.querySelector(".nav__links");
const navLinkUl = document.querySelector("ul");
console.log(burger.style.zIndex);
burger.addEventListener("click", () => {
  navLinkUl.classList.remove("hiddenMedia");
  overlay.classList.remove("hiddenMedia");
  overlay.classList.remove("hiddenMedia");
});
navLinkUl.addEventListener("click", () => {
  navLinkUl.classList.add("hiddenMedia");
  overlay.classList.add("hiddenMedia");
  overlay.classList.add("hiddenMedia");
});















////////////////////////////////////////////////////////////////////////
// slides
const slides = document.querySelectorAll(".slide");
const slideBtnRight = document.querySelector(".slider__btn--right");
const slideBtnLeft = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");
let currentSlide = 0;
const maxSlide = slides.length;
let touchStartX = 0;
let touchEndX = 0;

// create slyde
const goToSlide = function (slayd) {
  slides.forEach(
    (slite, i) => (slite.style.transform = `translateX(${100 * (i - slayd)}%)`)
  );
};

// create dots
const dotContainer = document.querySelector(".dots");
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
//Next Slide
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};
//Previous Slide
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};
// event
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});
// listenerlar
slideBtnLeft.addEventListener("click", nextSlide);
slideBtnRight.addEventListener("click", prevSlide);
setInterval(nextSlide, 3000);
// Keyboard control
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});
const begin = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};
begin();

// touched
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};
const handleTouchMove = (e) => {
  touchEndX = e.touches[0].clientX;
};
const handleTouchEnd = () => {
  const touchDiff = touchStartX - touchEndX;
  if (touchDiff > 50) {
    nextSlide();
  } else if (touchDiff < -50) {
    prevSlide();
  }
};
// touch eventListener
slides.forEach((slide) => {
  slide.addEventListener("touchstart", handleTouchStart);
  slide.addEventListener("touchmove", handleTouchMove);
  slide.addEventListener("touchend", handleTouchEnd);
});
