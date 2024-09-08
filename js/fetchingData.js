export async function fetchHomeData() {
  const resInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  const res = await resInfo.json();
  return res.meals;
}

export async function fetchCategoryData() {
  const resInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const res = await resInfo.json();
  return res.categories;
}

export async function fetchAreaData() {
  const resInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const res = await resInfo.json();
  return res.meals;
}

export async function fetchIngredientsData() {
  const resInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const res = await resInfo.json();
  return res.meals;
}

export async function fetchMealByName(name) {
  const resInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const res = await resInfo.json();
  return res.meals;
}

export async function fetchMealByLetter(letter) {
  const resInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  const res = await resInfo.json();
  return res.meals;
}

export async function fetchMealDetail(id) {
  const resInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const res = await resInfo.json();
  return res.meals;
}

export async function fetchMealByCategory(name) {
  const resInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
  );
  const res = await resInfo.json();
  return res.meals;
}

export async function fetchMealByArea(name) {
  const resInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
  );
  const res = await resInfo.json();
  return res.meals;
}

export async function fetchMealByIngredient(name) {
  const resInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
  );
  const res = await resInfo.json();
  return res.meals;
}
