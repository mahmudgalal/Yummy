/// <reference types="../@types/jquery" />

const search = document.getElementById("search");
const category = document.getElementById("category");
const area = document.getElementById("area");
const ingredientes = document.getElementById("ingredientes");
const contact = document.getElementById("contact");

$(".open-close-icon").on("click", function () {
  $(".menu")
    .animate({ width: "toggle", padding: "toggle" }, 1000)
    .css("display", "flex");
  $(".open-close-icon").toggleClass("fa-x").toggleClass("fa-align-justify");
  $(".toggle-menu").toggleClass("animate");
});

const content = document.querySelector(".content");

async function fetchData() {
  content.innerHTML = "";
  try {
    $(".lds-ring").removeClass("d-none");
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const res = await response.json();
    const meals = res.meals;
    display(meals);
  } catch {
    throw (Error = console.log("the api is incorrect"));
  } finally {
    $(".lds-ring").addClass("d-none");
  }
}
const display = async function (meals) {
  meals.forEach((meal) => {
    const html = `
           <div class="col-md-6 col-lg-4 col-xl-3 main position-relative">
   <div class="position-relative h-100 overflow-hidden rounded-2 meal">
         <img src=${meal.strMealThumb} width = "100%" height = "100%" alt="logo" />
         <div
           class="text w-100 h-100 d-flex align-items-center ps-3 fs-3 fw-bold"
         >
           ${meal.strMeal}
         </div>
       </div>
       </div>
  `;
    content.insertAdjacentHTML("afterbegin", html);
    const mealId = document.querySelector(".meal");
    const rowData = document.getElementById("rowData");

    mealId.addEventListener("click", async function () {
      content.innerHTML = "";
      $(".details").removeClass("d-none");
      $(".lds-ring").removeClass("d-none");
      try {
        const mealResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const mealRes = await mealResponse.json();
        const html = `
     <div class="col-md-4 text-white">
                  <img class="w-100 rounded-3" src=${meal.strMealThumb} alt="">
                      <h2>${meal.strMeal}</h2>
              </div>
              <div class="col-md-8">
                  <h2>Instructions</h2>
                  <p>${meal.strInstructions}
  </p>
                  <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                  <h3><span class="fw-bolder">Category : </span>${
                    meal.strCategory
                  }</h3>
                  <h3>Recipes :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      <li class="alert alert-info m-2 p-1">${
                        meal.strMeasure1
                      } ${meal.strIngredient1}</li>
                      <li class="alert alert-info m-2 p-1">${
                        meal.strMeasure2
                      } ${meal.strIngredient2}</li>
                      <li class="alert alert-info m-2 p-1">${
                        meal.strMeasure3
                      } ${meal.strIngredient3}</li>
                      <li class="alert alert-info m-2 p-1">${
                        meal.strMeasure4
                      } ${meal.strIngredient4}</li>
                      <li class="alert alert-info m-2 p-1">${
                        meal.strMeasure5
                      } ${meal.strIngredient5}</li>
                      <li class="alert alert-info m-2 p-1">${
                        meal.strMeasure6
                      } ${meal.strIngredient6}</li>
                      <li class="alert alert-info m-2 p-1">${
                        meal.strMeasure7
                      } ${meal.strIngredient7}</li>
                      <li class="alert alert-info m-2 p-1">${
                        meal.strMeasure8
                      } ${meal.strIngredient8}</li>
                  </ul>
  
                  <h3>Tags :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                       <li class="alert alert-danger m-2 p-1 px-2">${
                         meal.strTags ? meal.strTags : "No Tags"
                       }</li>


                  </ul>
  
                  <a target="_blank" href=${
                    meal.strSource
                  } class="btn btn-success">Source</a>
                  <a target="_blank" href=${
                    meal.strYoutube
                  } class="btn btn-danger">Youtube</a>
              </div>
              </div>
              `;
        rowData.insertAdjacentHTML("afterbegin", html);
      } catch {
        throw (Error = console.log("the api is incorrect"));
      } finally {
        $(".lds-ring").addClass("d-none");
      }
    });
  });
};

fetchData();




// Search Section

const serachDiv = document.querySelector(".searchDiv");
const searchFunction = function () {
  content.innerHTML = "";
  serachDiv.classList.remove("d-none");
  $(".details").addClass("d-none");
  serachDiv.innerHTML = `<div class="container w-75" id="searchContainer">
  <div class="row py-4 ">
  <div class="col-md-6 ">
  <input class="form-control bg-transparent text-white name mb-3" type="text" placeholder="Search By Name">
  </div>
  <div class="col-md-6">
  <input maxlength="1" class="form-control bg-transparent text-white letter" type="text" placeholder="Search By First Letter">
  </div>
  </div></div>`;
  const name = document.querySelector(".name");
  const letter = document.querySelector(".letter");
  name.addEventListener("keyup", async function () {
    content.innerHTML = "";
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name.value}`
      );
      const res = await response.json();
      const meals = res.meals;
      meals.splice(20);
      display(meals);
      $(".invalid").addClass("d-none");
    } catch {
      errorSearch();
    }
  });
  letter.addEventListener("keyup", async function () {
    content.innerHTML = "";
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter.value}`);
      const res = await response.json();
      const meals = res.meals;
      meals.splice(20);
      display(meals);
      $(".invalid").addClass("d-none");
    } catch {
      errorSearch();
    }
  });
};
const errorSearch = function(){
  content.innerHTML = `
  <div class="border border-danger border-2 py-5 px-3 w-50 text-center mx-auto invalid">
  <h1 class= "text-white">Your input is invalid</h1>
  </div>
  `;
}
search.addEventListener("click", searchFunction);




// Category Section
const categoryFunction = function(){
  serachDiv.classList.add("d-none");
  content.innerHTML = "";
  
}


category.addEventListener("click" , categoryFunction)