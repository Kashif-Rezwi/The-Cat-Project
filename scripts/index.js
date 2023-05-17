let API_KEY =
  "live_VGhJOyOyF5lOXjAa4Is0WRFsfDCZCvu5p7yg9CHSRbJc9xA0ZbTygQv2Nws5x9H7";
const CATS_BREED_API = "https://api.thecatapi.com/v1/breeds";

(async function getCats(PAGE = 1) {
  try {
    let res = await fetch(`${CATS_BREED_API}?limit=12&page=${PAGE}`);
    let data = await res.json();
    appendData(data);
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
})();

const appendData = (DATA) => {
  const catsContainer = document.querySelector(".catsContainer");
  catsContainer.innerHTML = null;

  DATA.forEach(async (el) => {
    const catBox = document.createElement("div");

    const catImages = await getCatImages(el.id);
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

    el.temperament.split(",").forEach((el) => {
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

const getCatImages = async (BREED_ID) => {
  let IMAGES_BY_BREED = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${BREED_ID}&api_key=${API_KEY}`;
  try {
    let res = await fetch(IMAGES_BY_BREED);
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
