import {
  fetchAreaData,
  fetchCategoryData,
  fetchMealDetail,
  fetchHomeData,
  fetchIngredientsData,
  fetchMealByLetter,
  fetchMealByName,
  fetchMealByCategory,
  fetchMealByArea,
  fetchMealByIngredient,
} from "./fetchingData.js";

// loading icon

const loadingSection = $(".loading");

// open and close nav bar

const navbar = $("nav");
const navbarLeftsideWidth = $(".navLeftSide").outerWidth(true);
const navbarBurger = $(".navRightSide .fa-bars");
const navbarLeftSideLinks = $(".navLeftSide ul.navTop li");
const navbarRightsideWidth = $(".navRightSide").outerWidth(true);
console.log("🚀 ~ navbarRightsideWidth:", navbarRightsideWidth);

navbarBurger.click(() => {
  if (navbar.offset().left == 0) {
    navbarLeftSideLinks.removeClass("hh");

    navbar.animate({ left: -navbarLeftsideWidth }, 500);
    navbarBurger.removeClass("fa-xmark").addClass("fa-bars");
  } else {
    navbar.animate({ left: 0 }, 500);
    navbarBurger.removeClass("fa-bars").addClass("fa-xmark");
    navbarLeftSideLinks.addClass("hh");
  }
});

// display homeSection when click on logo

const logoImage = $(".navRightSide img");

logoImage.click(()=>{
  homeSection.siblings().not("nav,div").addClass("d-none");
  homeSection.removeClass("d-none");
})

// display home cards

const homeCardsSection = $(`.homeSection .row`);
const homeSection = $(`.homeSection`);

function getMainMealCards(data) {
  let cartoona = "";

  for (let i = 0; i < data.length; i++) {
    cartoona += `
        <div class="col-md-3">
            <figure class="position-relative mb-0 rounded overflow-hidden" onclick="displayMealDetail(${data[i].idMeal})">
                <img src= ${data[i].strMealThumb} class="w-100" alt="" >
                <figcaption class="position-absolute top-0 start-0 bottom-0 end-0 bg-white bg-opacity-75 d-flex align-items-center rounded">
                    <h3 class="ms-2">${data[i].strMeal}</h3>
                </figcaption>
            </figure>
        </div>
    `;
  }

  return cartoona;
}

const homeData = await fetchHomeData();
const homeCards = getMainMealCards(homeData);
homeSection.removeClass("d-none");
homeCardsSection.html(homeCards);
loadingSection.fadeOut(1000);

// display categories cards

const categoryCards = $(`.categorySection .row`);
const categoriesButton = $(".navLeftSide .link2");
const categoriesSection = $(".categorySection");

categoriesButton.click(async () => {
  navbar.animate({ left: -navbarLeftsideWidth }, 500);
  navbarBurger.removeClass("fa-xmark").addClass("fa-bars");
  loadingSection.fadeIn();
  const categoryArr = await fetchCategoryData();

  let cartoona = "";

  for (let i = 0; i < categoryArr.length; i++) {
    cartoona += `
            <div class="col-md-3">
                <figure class="position-relative mb-0 rounded overflow-hidden" onclick="getMealsByCategory('${categoryArr[i].strCategory}')">
                    <img src=${categoryArr[i].strCategoryThumb} class="w-100" alt="">
                    <figcaption class="position-absolute top-0 start-0 bottom-0 end-0 bg-white bg-opacity-75 text-center pt-2 rounded">
                        <h3>${categoryArr[i].strCategory}</h3>
                        <p class="mb-0">${categoryArr[i].strCategoryDescription}</p>
                    </figcaption>
                </figure>
            </div>
        `;
  }

  categoriesSection.siblings().not("nav,div").addClass("d-none");
  categoriesSection.removeClass("d-none");
  categoryCards.html(cartoona);
  loadingSection.fadeOut(1000);
});

window.getMealsByCategory = async function (category) {
  loadingSection.fadeIn();
  const meals = await fetchMealByCategory(category);
  const cartoona = getMainMealCards(meals);
  categoryCards.html(cartoona);
  loadingSection.fadeOut(1000);
};

// display area cards

const areaCards = $(`.areaSection .row`);
const areaButton = $(".navLeftSide .link3");
const areaSection = $(".areaSection");

areaButton.click(async () => {
  navbar.animate({ left: -navbarLeftsideWidth }, 500);
  navbarBurger.removeClass("fa-xmark").addClass("fa-bars");
  loadingSection.fadeIn();
  const areaArr = await fetchAreaData();

  let cartoona = "";

  for (let i = 0; i < areaArr.length; i++) {
    cartoona += `
            <div class="col-md-3">
                <figure class="text-white text-center mb-0" onclick="getMealsByArea('${areaArr[i].strArea}')">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <figcaption>
                        <h3>${areaArr[i].strArea}</h3>
                    </figcaption>
                </figure>
            </div>
        `;
  }

  areaSection.siblings().not("nav,div").addClass("d-none");
  areaSection.removeClass("d-none");
  areaCards.html(cartoona);
  loadingSection.fadeOut(1000);
});

window.getMealsByArea = async function (area) {
  loadingSection.fadeIn();
  const meals = await fetchMealByArea(area);
  const cartoona = getMainMealCards(meals);
  homeCardsSection.html(cartoona);
  areaSection.addClass("d-none");
  homeSection.removeClass("d-none");
  loadingSection.fadeOut(1000);
};

// display ingredients cards

const ingredientsCards = $(`.ingredientsSection .row`);
const ingredientsButton = $(".navLeftSide .link4");
const ingredientsSection = $(".ingredientsSection");

ingredientsButton.click(async () => {
  navbar.animate({ left: -navbarLeftsideWidth }, 500);
  navbarBurger.removeClass("fa-xmark").addClass("fa-bars");
  loadingSection.fadeIn();
  const ingredientsArr = await fetchIngredientsData();

  let cartoona = "";

  for (let i = 0; i < ingredientsArr.length; i++) {
    if (ingredientsArr[i].strDescription) {
      cartoona += `
                <div class="col-md-3">
                    <figure class="text-white text-center mb-0" onclick="getMealsByIngredient('${ingredientsArr[i].strIngredient}')">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <figcaption class="text-center">
                            <h3>${ingredientsArr[i].strIngredient}</h3>
                            <p class="mb-0">${ingredientsArr[i].strDescription}</p>
                        </figcaption>
                    </figure>
                </div>
            `;
    }
  }

  ingredientsSection.siblings().not("nav,div").addClass("d-none");
  ingredientsSection.removeClass("d-none");
  ingredientsCards.html(cartoona);
  loadingSection.fadeOut(1000);
});

window.getMealsByIngredient = async function (ingredient) {
  loadingSection.fadeIn();
  const meals = await fetchMealByIngredient(ingredient);
  const cartoona = getMainMealCards(meals);
  homeCardsSection.html(cartoona);
  ingredientsSection.addClass("d-none");
  homeSection.removeClass("d-none");
  loadingSection.fadeOut(1000);
};

// display search cards by name

const searchCards = $(`.searchSection .row.gy-4`);
const searchButton = $(".navLeftSide .link1");
const searchSection = $(".searchSection");
const searchInputName = $(".searchSection #input1");
const searchInputLetter = $(".searchSection #input2");

searchButton.click(async () => {
  navbar.animate({ left: -navbarLeftsideWidth }, 500);
  navbarBurger.removeClass("fa-xmark").addClass("fa-bars");
  searchSection.siblings().not("nav,div").addClass("d-none");
  searchSection.removeClass("d-none");
});

document
  .querySelector(".searchSection #input1")
  .addEventListener("input", async () => {
    if (searchInputName.val() != "") {
      if (searchCards.has("d-none")) {
        searchCards.removeClass("d-none");
      }

      const searchData = await fetchMealByName(searchInputName.val());
      const cards = getMainMealCards(searchData);
      searchCards.html(cards);
    } else {
      searchCards.addClass("d-none");
    }
  });

document
  .querySelector(".searchSection #input2")
  .addEventListener("input", async () => {
    if (searchInputLetter.val() != "") {
      if (searchCards.has("d-none")) {
        searchCards.removeClass("d-none");
      }

      const searchData = await fetchMealByLetter(searchInputLetter.val());
      const cards = getMainMealCards(searchData);
      searchCards.html(cards);
    } else {
      searchCards.addClass("d-none");
    }
  });

// display contact section

const contactButton = $(".navLeftSide .link5");
const conatctSection = $(".contactSection");

contactButton.click(async () => {
  navbar.animate({ left: -navbarLeftsideWidth }, 500);
  navbarBurger.removeClass("fa-xmark").addClass("fa-bars");
  conatctSection.siblings().not("nav,div").addClass("d-none");
  conatctSection.removeClass("d-none");
});

// display detail section

window.displayMealDetail = async function (mealId) {
  loadingSection.fadeIn();
  const detailArr = await fetchMealDetail(mealId);
  if (!detailArr.length) {
    return;
  }

  const displayLeftSide = $(`.detailSection .detailSectionLeftSide`);
  const displayRightSide = $(".detailSection .detailSectionRightSide");
  const detailSection = $(".detailSection");

  detailSection.siblings().not("nav,div").addClass("d-none");
  detailSection.removeClass("d-none");

  displayLeftSide.html(`
        <figure>
            <img src=${detailArr[0].strMealThumb}/preview class="w-100 rounded" alt="">
            <figcaption>
                <h2 class="text-white">${detailArr[0].strMeal}</h2>
            </figcaption>
        </figure>
    `);

  let recipes = "";
  for (let i = 0; i < 20; i++) {
    const measure = detailArr[0][`strMeasure${i + 1}`];
    const ingredient = detailArr[0][`strIngredient${i + 1}`];
    if (measure && ingredient) {
      recipes += `<li>${measure} ${ingredient}</li>`;
    }
  }

  let tags = "";
  detailArr[0].strTags?.split(",").forEach((tag) => {
    tags += `<li>${tag.trim()}</li>`;
  });

  displayRightSide.html(`
        <h2>Instructions</h2>
        <p>${detailArr[0].strInstructions}</p>
        <h3>Area : ${detailArr[0].strArea}</h3>
        <h3>Category : ${detailArr[0].strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex flex-wrap recipes">
            ${recipes}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled mt-3 d-flex flex-wrap tags">
            ${tags}
        </ul>
        <a href="${detailArr[0].strSource}" target='_blank' class="btn bg-success text-white">Source</a>
        <a href="${detailArr[0].strYoutube}" target='_blank' class="btn bg-danger text-white">Youtube</a>
  `);
  loadingSection.fadeOut(1000);
};

// check signup form to open the buuton

import { validateInputs } from "./regex.js";

validateInputs();
