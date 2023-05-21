let FavImages = JSON.parse(localStorage.getItem("favourites")) || [];

const appendData = (DATA) => {
  let Fav = document.querySelector(".favourites");
  Fav.innerHTML = null;

  DATA.forEach((el, i) => {
    let box = document.createElement("div");
    let image = document.createElement("img");
    image.src = el;
    let fav = document.createElement("button");
    fav.innerText = "REMOVE FROM FAVOURITES";
    fav.addEventListener("click", () => {
      removeCat(i);
    });

    box.append(image, fav);

    Fav.append(box);
  });
};

appendData(FavImages);

const removeCat = (i) => {
  FavImages.splice(i, 1);
  alert("Image removed from Favourites");
  appendData(FavImages);
  localStorage.setItem("favourites", JSON.stringify(FavImages));
};
