/// <reference types="../@types/jquery" />

const search = document.getElementById("search");
const category = document.getElementById("category");
const area = document.getElementById("area");
const ingredients = document.getElementById("ingredients");
const contact = document.getElementById("contact");
const content = document.querySelector(".content");

const animation = function () {
  $(".menu")
    .animate({ width: "toggle", padding: "toggle" }, 1000)
    .css("display", "flex");
  $(".open-close-icon").toggleClass("fa-x").toggleClass("fa-align-justify");
  $(".toggle-menu").toggleClass("animate");
};

$(".open-close-icon").on("click", animation);

const details = function(meal){
  const mealId = document.querySelector(".meal");
  mealId.addEventListener("click", async function () {
    serachDiv.classList.add("d-none")
    content.innerHTML = "";
    $(".lds-ring").removeClass("d-none");
    try {
      const mealResponse = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const mealRes = await mealResponse.json();
      const meals = mealRes.meals
      const html = `
   <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src=${meals[0].strMealThumb} alt="">
                    <h2>${meals[0].strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meals[0].strInstructions}
</p>
                <h3><span class="fw-bolder">Area : </span>${meals[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${
                  meals[0].strCategory
                }</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1 ${meals[0].strIngredient1? "" : "d-none"}">${
                      meals[0].strMeasure1
                    } ${meals[0].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1 ${meals[0].strIngredient2? "" : "d-none"}">${
                      meals[0].strMeasure2
                    } ${meals[0].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1 ${meals[0].strIngredient3? "" : "d-none"}">${
                      meals[0].strMeasure3
                    } ${meals[0].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1 ${meals[0].strIngredient4? "" : "d-none"}">${
                      meals[0].strMeasure4
                    } ${meals[0].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1 ${meals[0].strIngredient5? "" : "d-none"}">${
                      meals[0].strMeasure5
                    } ${meals[0].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1 ${meals[0].strIngredient6? "" : "d-none"}">${
                      meals[0].strMeasure6
                    } ${meals[0].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1 ${meals[0].strIngredient7? "" : "d-none"}">${
                      meals[0].strMeasure7
                    } ${meals[0].strIngredient7}</li>
                    <li class="alert alert-info m-2 p-1 ${meals[0].strIngredient8? "" : "d-none"}">${
                      meals[0].strMeasure8
                    } ${meals[0].strIngredient8}</li>
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                     <li class="alert alert-danger m-2 p-1 px-2">${
                       meals[0].strTags ? meals[0].strTags : "No Tags"
                     }</li>


                </ul>

                <a target="_blank" href=${
                  meals[0].strSource
                } class="btn btn-success">Source</a>
                <a target="_blank" href=${
                  meals[0].strYoutube
                } class="btn btn-danger">Youtube</a>
            </div>
            </div>
            `;
      content.insertAdjacentHTML("afterbegin", html);
    } catch {
      throw Error("the api is incorrect");
    } finally {
      $(".lds-ring").addClass("d-none");
    }
  });
}


async function fetchData() {
  content.innerHTML = "";
  try {
    $(".lds-ring").removeClass("d-none");
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const res = await response.json();
    const meals = res.meals;
    meals.reverse();
    display(meals);
  } catch {
    throw Error("the api is incorrect");
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
    const rowData = document.getElementById("rowData");

 
    details(meal);
  });
};

fetchData();

// Search Section

const serachDiv = document.querySelector(".searchDiv");
const searchFunction = function () {
  content.innerHTML = "";
  serachDiv.classList.remove("d-none");
  animation();
  serachDiv.innerHTML = `<div class="container w-75" id="searchContainer">
  <div class="row py-4 ms-5">
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
      $(".lds-ring").removeClass("d-none");
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name.value}`
      );
      const res = await response.json();
      const meals = res.meals;
      meals.splice(20);
      meals.reverse();
      display(meals);
      $(".invalid").addClass("d-none");
    } catch {
      errorSearch();
    } finally {
      $(".lds-ring").addClass("d-none");
    }
  });
  letter.addEventListener("keyup", async function () {
    content.innerHTML = "";
    try {
      $(".lds-ring").removeClass("d-none");
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter.value}`
      );
      const res = await response.json();
      const meals = res.meals;
      meals.splice(20);
      display(meals);
      $(".invalid").addClass("d-none");
    } catch {
      errorSearch();
    } finally {
      $(".lds-ring").addClass("d-none");
    }
  });
};
const errorSearch = function () {
  content.innerHTML = `
  <div class="border border-danger border-2 py-5 px-3 w-50 text-center mx-auto invalid">
  <h1 class= "text-white">Your input is invalid</h1>
  </div>
  `;
};
search.addEventListener("click", searchFunction);

// Category Section
const categoryFunction = async function () {
  serachDiv.classList.add("d-none");
  content.innerHTML = "";
  animation();

  try {
    $(".lds-ring").removeClass("d-none");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    const res = await response.json();
    const categories = res.categories;
    categories.reverse();
    categories.forEach((category) => {
      const html = `
             <div class="col-md-6 col-lg-4 col-xl-3 main position-relative">
     <div class="position-relative h-100 overflow-hidden rounded-2 meal">
           <img src=${category.strCategoryThumb} width = "100%" height = "100%" alt="logo" />
           <div
             class="text w-100 h-100 ps-3 text-center"
           >
             <h2 class = "pt-2">${category.strCategory}</h2>
             <p>${category.strCategoryDescription}</p>
           </div>
         </div>
         </div>
    `;
      content.insertAdjacentHTML("afterbegin", html);
      $(".invalid").addClass("d-none");
      try {
        const main = document.querySelector(".main");
        main.addEventListener("click", async function () {
          content.innerHTML = "";
          $(".lds-ring").removeClass("d-none");
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
          );
          const res = await response.json();
          $(".lds-ring").addClass("d-none");
          const meals = res.meals;
          meals.splice(20);
          meals.forEach((meal) => {
            const html = `
                   <div class="col-md-6 col-lg-4 col-xl-3 main position-relative">
           <div class="position-relative h-100 overflow-hidden rounded-2 meal">
                 <img src=${meal.strMealThumb} width = "100%" height = "100%" alt="logo" />
                 <div
                   class="text w-100 h-100 d-flex align-items-center fs-3 fw-bold text-center"
                 >
                   ${meal.strMeal}
                 </div>
               </div>
               </div>
          `;
            content.insertAdjacentHTML("afterbegin", html);

           details(meal);
          });
        });
      } catch {
        throw Error("The API is Invalid");
      } finally {
        $(".lds-ring").addClass("d-none");
      }
    });
  } catch {
    throw Error("The API is Invalid");
  } finally {
    $(".lds-ring").addClass("d-none");
  }
};
category.addEventListener("click", categoryFunction);

// Area Section
const areaFunction = async function () {
  serachDiv.classList.add("d-none");
  content.innerHTML = "";
  animation();
  $(".lds-ring").removeClass("d-none");

  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const res = await response.json();
  const areas = res.meals;
  areas.reverse();
  $(".lds-ring").addClass("d-none");
  areas.forEach((area) => {
    const html = `
        <div class="col-6 col-md-4 col-lg-3">
                <div class="rounded-2 text-center area text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area.strArea}</h3>
                </div>
    `;

    content.insertAdjacentHTML("afterbegin", html);
    const location = document.querySelector(".area");

    location.addEventListener("click", async function () {
      content.innerHTML = "";
      $(".lds-ring").removeClass("d-none");
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area.strArea}`
      );
      const res = await response.json();
      const meals = res.meals;
      $(".lds-ring").addClass("d-none");
      meals.splice(20);
      meals.forEach((meal) => {
        const html = `
               <div class="col-md-6 col-lg-4 col-xl-3 main position-relative">
       <div class="position-relative h-100 overflow-hidden rounded-2 meal">
             <img src=${meal.strMealThumb} width = "100%" height = "100%" alt="logo" />
             <div
               class="text w-100 h-100 ps-3 text-center d-flex align-items-center"
             >
               <h2 class = "pt-2">${meal.strMeal}</h2>
             </div>
           </div>
           </div>
      `;
        content.insertAdjacentHTML("afterbegin", html);
        $(".invalid").addClass("d-none");
        details(meal);
      });
    });
  });
};

area.addEventListener("click", areaFunction);

// ingredients Section
const ingFunction = async function () {
  serachDiv.classList.add("d-none");
  content.innerHTML = "";
  animation();
  $(".lds-ring").removeClass("d-none");

  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const res = await response.json();
  const ings = res.meals;
  ings.splice(20);
  ings.reverse();
  $(".lds-ring").addClass("d-none");
  ings.forEach((ing) => {
    const html = `
        <div class="col-md-3 ing">
                <div class="rounded-2 text-center area text-white">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ing.strIngredient}</h3>
                        <p class = "overflow-hidden ingDes">${ing.strDescription}</p>
                </div>
    `;

    content.insertAdjacentHTML("afterbegin", html);
    const ingred = document.querySelector(".ing");

    ingred.addEventListener("click", async function () {
      content.innerHTML = "";
      $(".lds-ring").removeClass("d-none");
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing.strIngredient}`
      );
      const res = await response.json();
      console.log(res);
      const meals = res.meals;
      $(".lds-ring").addClass("d-none");
      meals.splice(20);
      meals.forEach((meal) => {
        const html = `
               <div class="col-md-6 col-lg-4 col-xl-3 main position-relative">
       <div class="position-relative h-100 overflow-hidden rounded-2 meal">
             <img src=${meal.strMealThumb} width = "100%" height = "100%" alt="logo" />
             <div
               class="text w-100 h-100 ps-3 text-center d-flex align-items-center"
             >
               <h2 class = "pt-2">${meal.strMeal}</h2>
             </div>
           </div>
           </div>
      `;
        content.insertAdjacentHTML("afterbegin", html);
        $(".invalid").addClass("d-none");
        const mealId = document.querySelector(".meal");
        details(meal);

      });
    });
  });
};

ingredients.addEventListener("click", ingFunction);

// Contact Section
const contactFunction = function () {
  serachDiv.classList.add("d-none");
  content.innerHTML = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@gmail.co
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Egyptian Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" class="btn btn-outline-danger disabled px-2 mt-3">Submit</button>
    </div>
</div>`;
  animation();

  const name = document.getElementById("nameInput");
  const email = document.getElementById("emailInput");
  const phone = document.getElementById("phoneInput");
  const age = document.getElementById("ageInput");
  const password = document.getElementById("passwordInput");
  const repassword = document.getElementById("repasswordInput");
  const repasswordAlert = document.getElementById("repasswordAlert");
  const submit = document.getElementById("submitBtn");
  const inputs = document.querySelectorAll(".contact input");

  function Validation(el, msg) {
    let text = el.value;
    const regex = {
      nameInput: /^[A-Za-z ]+$/,
      emailInput: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      phoneInput: /^01[0125][0-9]{8}$/gm,
      ageInput: /^\d{1,3}$/,
      passwordInput: /^[a-zA-Z0-9!@#$%^&*]{8,32}$/,
      repasswordInput: /^[a-zA-Z0-9!@#$%^&*]{8,32}$/,
    };
    let message = document.getElementById(msg);

    if (regex[el.id].test(text) == true) {
      el.classList.add("is-valid");
      el.classList.remove("is-invalid");
      message.classList.add("d-none");
      el.classList.add("ok");
    } else {
      el.classList.remove("is-valid");
      el.classList.add("is-invalid");
      message.classList.remove("d-none");
      el.classList.remove("ok");
    }
    inputs.forEach((input) => {
      if (
        inputs[0].classList.contains("ok") &&
        inputs[1].classList.contains("ok") &&
        inputs[2].classList.contains("ok") &&
        inputs[3].classList.contains("ok") &&
        inputs[4].classList.contains("ok") &&
        inputs[5].classList.contains("ok") &&
        repassword.value == password.value
      ) {
        submit.classList.remove("disabled");
        submit.addEventListener("click" , function(){
          input.value = null;
          submit.classList.add("disabled");
          input.classList.remove("is-valid");
        })
      } else {
        submit.classList.add("disabled");
      }
    }
  );
  }

  name.addEventListener("input", function () {
    Validation(name, "nameAlert");
  });
  email.addEventListener("input", function () {
    Validation(email, "emailAlert");
  });
  phone.addEventListener("input", function () {
    Validation(phone, "phoneAlert");
  });
  age.addEventListener("input", function () {
    Validation(age, "ageAlert");
  });
  password.addEventListener("input", function () {
    Validation(password, "passwordAlert");
  });
  repassword.addEventListener("input", function () {
    Validation(repassword, "repasswordAlert");
    if (repassword.value == password.value) {
      repassword.classList.add("is-valid");
      repassword.classList.remove("is-invalid");
      repasswordAlert.classList.add("d-none");
      return true;
    } else {
      repassword.classList.remove("is-valid");
      repassword.classList.add("is-invalid");
      repasswordAlert.classList.remove("d-none");
      return false;
    }
  })


   
};

contact.addEventListener("click", contactFunction);
