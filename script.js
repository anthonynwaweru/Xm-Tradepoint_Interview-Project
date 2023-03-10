"use strict";

// DOM elements selection
const passwordInput = document.getElementById("password");
const formSubmit = document.getElementById("form");
const length = document.querySelector(".char-length");
const digits = document.querySelector(".char-numbers");
const lowercase = document.querySelector(".char-lowercase");
const uppercase = document.querySelector(".char-uppercase");
const special = document.querySelector(".char-special");
const successMessage = document.querySelector(".success-message");

// function for getting prices, price names and percemtage changes for the price grid items
const getCurrentPrices = async () => {
  try {
    const response = await fetch("https://api.coinlore.net/api/tickers/");
    const { data } = await response.json();
    const coinsToUpdate = [
      "Bitcoin",
      "Ethereum",
      "XRP",
      "Litecoin",
      "Bitcoin Cash",
    ];
    const filteredCoinsData = data.filter((coin) =>
      coinsToUpdate.includes(coin.name)
    );
    // console.log(filteredCoinsData);
    const coinsData = filteredCoinsData.map((coin) => {
      return {
        price: coin.price_usd,
        percent_change: coin.percent_change_24h,
        symbol: coin.symbol,
        name: coin.name,
        nameid: coin.nameid,
      };
    });
    // console.log(coinsData);
    // appending the prices, symbols, name, percentages before appending to it's main div
    const gridToAppend = `<div class="pricing-grid">
    <div class="pricing-grid--row">
      <div class="coin-desc">
        <p class="coin-desc--icon">
          <img src="/assets/icons/bitcoin.png" alt="Bitcoin" />
        </p>
        <p class="coin-desc--symbol">${coinsData[0].symbol}</p>
        <p class="coin-desc--name">${coinsData[0].name}</p>
      </div>
      <div class="line"></div>
      <div id="bitcoin" class="coin-price">
        <p class="coin-price--usd">$${coinsData[0].price}</p>
        <p class="coin-price--change">
          <span class="coin-price--change--icon ${
            coinsData[0].percent_change < 0 ? "price-down" : "price-up"
          }"
            ><i class="fa-solid fa-circle-chevron-${
              coinsData[0].percent_change < 0 ? "down" : "up"
            }"></i
          ></span>
          ${coinsData[0].percent_change}
        </p>
      </div>
    </div>
    <div class="pricing-grid--row">
      <div class="coin-desc">
        <p class="coin-desc--icon">
          <img src="/assets/icons/eth.png" alt="Ethereum" />
        </p>
        <p class="coin-desc--symbol">${coinsData[1].symbol}</p>
        <p class="coin-desc--name">${coinsData[1].name}</p>
      </div>
      <div class="line"></div>
      <div class="coin-price">
        <p class="coin-price--usd">$${coinsData[1].price}</p>
        <p class="coin-price--change">
          <span class="coin-price--change--icon ${
            coinsData[1].percent_change < 0 ? "price-down" : "price-up"
          }"
            ><i class="fa-solid fa-circle-chevron-${
              coinsData[1].percent_change < 0 ? "down" : "up"
            }"></i
          ></span>
          ${coinsData[1].percent_change}
        </p>
      </div>
    </div>
    <div class="pricing-grid--row">
      <div class="coin-desc">
        <p class="coin-desc--icon">
          <img src="/assets/icons/xrp.png" alt="Ripple" />
        </p>
        <p class="coin-desc--symbol">${coinsData[2].name}</p>
        <p class="coin-desc--name">${coinsData[2].nameid.toUpperCase()}</p>
      </div>
      <div class="line"></div>
      <div class="coin-price">
        <p class="coin-price--usd">$${coinsData[2].price}</p>
        <p class="coin-price--change">
          <span class="coin-price--change--icon ${
            coinsData[2].percent_change < 0 ? "price-down" : "price-up"
          }"
            ><i class="fa-solid fa-circle-chevron-${
              coinsData[2].percent_change < 0 ? "down" : "up"
            }"></i
          ></span>
          ${coinsData[2].percent_change}
        </p>
      </div>
    </div>
    <div class="pricing-grid--row">
      <div class="coin-desc">
        <p class="coin-desc--icon">
          <img src="/assets/icons/litecoin.png" alt="Litecoin" />
        </p>
        <p class="coin-desc--symbol">${coinsData[3].symbol}</p>
        <p class="coin-desc--name">${coinsData[3].name}</p>
      </div>
      <div class="line"></div>
      <div class="coin-price">
        <p class="coin-price--usd">$${coinsData[3].price}</p>
        <p class="coin-price--change">
          <span class="coin-price--change--icon ${
            coinsData[3].percent_change < 0 ? "price-down" : "price-up"
          }"
            ><i class="fa-solid fa-circle-chevron-${
              coinsData[3].percent_change < 0 ? "down" : "up"
            }"></i
          ></span>
          ${coinsData[3].percent_change}
        </p>
      </div>
    </div>
    <div class="pricing-grid--row">
      <div class="coin-desc">
        <p class="coin-desc--icon">
          <img
            src="/assets/icons/bitcoin-cash.png"
            alt="Bitcoin-cash"
          />
        </p>
        <p class="coin-desc--symbol">${coinsData[4].symbol}</p>
        <p class="coin-desc--name">${coinsData[4].name}</p>
      </div>
      <div class="line"></div>
      <div class="coin-price">
        <p class="coin-price--usd">$${coinsData[4].price}</p>
        <p class="coin-price--change">
          <span class="coin-price--change--icon ${
            coinsData[4].percent_change < 0 ? "price-down" : "price-up"
          }"
            ><i class="fa-solid fa-circle-chevron-${
              coinsData[4].percent_change < 0 ? "down" : "up"
            }"></i
          ></span>
          ${coinsData[4].percent_change}
        </p>
      </div>
    </div>
    </div>`;
    document.querySelector(".pricing").innerHTML = gridToAppend;
  } catch (error) {
    console.log(error);
  }
};
getCurrentPrices();

// functions for validating email, password and register button
const registerBtn = document.querySelector(".cta-btn");
const email = document.getElementById("email");
const inValidEMail = document.querySelector(".validate-email");
// const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// email
const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value) || email.value.trim() === "") {
    email.style.outline = "0.5px solid #D51820";
    registerBtn.disabled = true;
    inValidEMail.style.visibility = "visible";
  } else {
    email.style.outline = "0.5px solid #29A643";
    registerBtn.disabled = false;
    inValidEMail.style.visibility = "hidden";
  }
};
email.addEventListener("input", validateEmail);

// password
const validatePassword = () => {
  const password = passwordInput.value;

  // using regular expressions for each password requirement
  const regexLength = /^.{8,15}$/;
  const regexNumber = /\d+/;
  const regexLowercase = /[a-z]+/;
  const regexUppercase = /[A-Z]+/;
  const regexSpecial = /[#\[\]()@$&*!?|,.^/\+\-_]+/;

  // Check if password valid and matches all requirements and Add error or success class to each span based on validation result
  // valid
  const isValid =
    regexLength.test(password) &&
    regexNumber.test(password) &&
    regexLowercase.test(password) &&
    regexUppercase.test(password) &&
    regexSpecial.test(password);
  registerBtn.disabled = !isValid;
  passwordInput.style.outline = `${
    !isValid ? "0.5px solid #D51820" : "0.5px solid #29A643"
  }`;

  // error
  length.classList.toggle("error", !regexLength.test(password));
  digits.classList.toggle("error", !regexNumber.test(password));
  lowercase.classList.toggle("error", !regexLowercase.test(password));
  uppercase.classList.toggle("error", !regexUppercase.test(password));
  special.classList.toggle("error", !regexSpecial.test(password));
  // success
  length.classList.toggle("success", regexLength.test(password));
  digits.classList.toggle("success", regexNumber.test(password));
  lowercase.classList.toggle("success", regexLowercase.test(password));
  uppercase.classList.toggle("success", regexUppercase.test(password));
  special.classList.toggle("success", regexSpecial.test(password));

  // passwordInput.style.outline = "0.5px solid #29A643";
};
passwordInput.addEventListener("input", validatePassword);

// Handle form submission and success message then reload 2secs after submission
formSubmit.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = passwordInput.value.trim();

  // Check if inputs are empty and add outline and error message if they are
  if (emailValue === "") {
    email.style.outline = "0.5px solid #D51820";
    inValidEMail.style.visibility = "visible";
  } else {
    email.style.outline = "0.5px solid #29A643";
    inValidEMail.style.visibility = "hidden";
  }

  if (passwordValue === "") {
    passwordInput.style.outline = "0.5px solid #D51820";
    length.classList.toggle("error", true);
  } else {
    validatePassword();
  }

  // Submit form if both inputs are not empty and valid
  if (
    emailValue !== "" &&
    passwordValue !== "" &&
    registerBtn.disabled !== true
  ) {
    successMessage.style.display = "flex";
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }
});
// carousel slider scripts for scrolling through the slides and adjusting the number of slides based on screen size
// Dom Elements
const prevBtn = document.querySelector(".prev-button");
const nextBtn = document.querySelector(".next-button");

const slider = document.querySelector(".slider");
const sliderItems = document.querySelector(".slider-items");
const slides = document.querySelectorAll(".slider-item");

let slideIndex = 0;
let slideWidth = 174;
let slidesPerView = 5;

// functions for showing slides, adjusting slides and scrolling through the slides
const showSlides = () => {
  // console.log("showslides: slide-index", slideIndex, "slidewidth", slideWidth);
  sliderItems.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
};

const adjustSlidesPerView = () => {
  const containerWidth = slider.clientWidth;
  if (containerWidth <= 450) {
    slidesPerView = 2;
  } else if (containerWidth <= 576) {
    slidesPerView = 2;
  } else if (containerWidth <= 768) {
    slidesPerView = 3;
  } else if (containerWidth <= 992) {
    slidesPerView = 4;
  } else if (containerWidth <= 1200) {
    slidesPerView = 5;
  } else {
    slidesPerView = 5;
  }
  slideWidth = (containerWidth - (slidesPerView - 1) * 10) / slidesPerView;
  showSlides();
};

const nextSlide = () => {
  slideIndex++;
  if (slideIndex > slides.length - 1) {
    slideIndex = 0;
  }
  const translateX = -slideIndex * slideWidth;
  sliderItems.style.transform = `translateX(${translateX}px)`;
  showSlides();
};

const prevSlide = () => {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  const translateX = -slideIndex * slideWidth;
  sliderItems.style.transform = `translateX(${translateX}px)`;
  showSlides();
};

window.addEventListener("resize", adjustSlidesPerView);
adjustSlidesPerView();
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
