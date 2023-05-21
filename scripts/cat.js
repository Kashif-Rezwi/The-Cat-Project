import { getApiKey } from "../components/getApiKey.js";
import { getCatImages } from "../components/getCatImages.js";

(async function getImages() {
  let BREED_ID = JSON.parse(localStorage.getItem("breed_id"));
  console.log(BREED_ID);
  try {
    let data = await getCatImages(BREED_ID, getApiKey);
    appendData(data);
  } catch (err) {
    console.log(err.message);
  }
})();

let IMG = JSON.parse(localStorage.getItem("favourites")) || [];

const appendData = (DATA) => {
  let Images = document.querySelector(".breedImages");
  Images.innerHTML = null;

  DATA.forEach((el) => {
    let box = document.createElement("div");
    let image = document.createElement("img");
    image.src = el.url;
    let fav = document.createElement("button");
    fav.innerText = "ADD TO FAVOURITES";
    fav.addEventListener("click", () => {
      IMG.push(el.url);
      alert("Image added to Favourites");
      localStorage.setItem("favourites", JSON.stringify(IMG));
    });

    box.append(image, fav);

    Images.append(box);
  });
};
