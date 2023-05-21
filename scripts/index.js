import { getCatImages } from "../components/getCatImages.js";

let API_KEY =
  "live_VGhJOyOyF5lOXjAa4Is0WRFsfDCZCvu5p7yg9CHSRbJc9xA0ZbTygQv2Nws5x9H7";
const CATS_BREED_API = "https://api.thecatapi.com/v1/breeds";

const getCats = async (PAGE = 1, LIMIT = 12) => {
  try {
    let res = await fetch(`${CATS_BREED_API}?limit=${LIMIT}&page=${PAGE}`);
    let data = await res.json();

    let resTotalCats = await fetch(`${CATS_BREED_API}`);
    let totalCats = await resTotalCats.json();
    appendData(data);
    Pagination(totalCats.length, PAGE, LIMIT);
  } catch (err) {
    console.log(err.message);
  }
};

getCats();

const appendData = (DATA) => {
  const catsContainer = document.querySelector(".catsContainer");
  catsContainer.innerHTML = null;

  DATA.forEach(async (el) => {
    const catBox = document.createElement("div");

    const catImages = await getCatImages(el.id, API_KEY);
    const catImg = document.createElement("img");
    catImg.src = catImages[0].url;

    const catContentDiv = document.createElement("div");

    const catBreed = document.createElement("h1");
    catBreed.innerText = el.name;

    const catDescription = document.createElement("p");
    catDescription.innerText = el.description;

    const catOrigin = document.createElement("p");
    catOrigin.innerText = "Origin : " + el.origin;

    const catLifeSpan = document.createElement("p");
    catLifeSpan.innerText = "Life Span : " + el.life_span;

    const catTempermentDiv = document.createElement("div");

    el.temperament
      .split(",")
      .sort((a, b) => a.length - b.length)
      .forEach((el) => {
        const catTemperment = document.createElement("p");
        catTemperment.innerText = el;
        catTempermentDiv.append(catTemperment);
      });

    const catReadMoreDiv = document.createElement("div");

    const catReadMoreText = document.createElement("p");
    catReadMoreText.innerText = "Read More :";

    const catReadMoreLink = document.createElement("a");
    catReadMoreLink.href = el.wikipedia_url;
    catReadMoreLink.innerText = "Wikipedia";

    catReadMoreDiv.append(catReadMoreText, catReadMoreLink);

    const catButton = document.createElement("button");
    catButton.innerText = "View Images";
    catButton.addEventListener("click", () => {
      localStorage.setItem("breed_id", JSON.stringify(el.id));
      location.href = "cat.html";
    });

    catContentDiv.append(
      catBreed,
      catDescription,
      catOrigin,
      catLifeSpan,
      catTempermentDiv,
      catReadMoreDiv,
      catButton
    );

    catBox.append(catImg, catContentDiv);

    catsContainer.append(catBox);
  });
};

const Pagination = (totalCats, page, catsPerPage) => {
  const paginate = document.querySelector(".catsPagination");
  paginate.innerHTML = null;
  let totalPages = Math.ceil(totalCats / catsPerPage);
  for (let i = 0; i <= totalPages - 1; i++) {
    let button = document.createElement("button");
    let pageNumber = i + 1;
    button.innerText = pageNumber;

    if (page === pageNumber) {
      button.disabled = true;
      button.style.backgroundColor = "#8d6ae7";
      button.style.color = "white";
    }

    button.onclick = function () {
      getCats(pageNumber);
    };

    paginate.append(button);
  }
};
