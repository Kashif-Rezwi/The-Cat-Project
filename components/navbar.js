const navbar = () => {
  return `
        <div>
            <a href="/">Home</a>
        </div>
        <div>
            <a href="cat.html">Cat</a>
            <a href="favourites.html">Favourites</a>
        </div>
    `;
};

const nav = document.querySelector("nav");
nav.innerHTML = navbar();
